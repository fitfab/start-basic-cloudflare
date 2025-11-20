import { CarouselViewport, Steering, Button, CarouselProps } from "./partials";
import { createSignal, createEffect, onMount, onCleanup } from "solid-js";

export const Carousel = ({
  children,
  width = "100%",
  height = "320px",
  gap = "24px",
  ...rest
}: CarouselProps) => {
  const [position, setPosition] = createSignal(0);
  const [isBoundary, setIsBoundary] = createSignal(0);
  let carouselContentRef!: HTMLDivElement;
  let scrollAmount = 0;
  let observer!: IntersectionObserver;
  let totalSlides!: Element[];
  let totalWidth = 0;

  function observeBoundary(): void {
    const options = {
      root: carouselContentRef,
      threshold: 0.9,
    };
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setIsBoundary(Number(entry.target.getAttribute("data-slide")));
        } else {
          setIsBoundary(-1);
        }
      });
    }, options);
    // observe the first child
    observer.observe(carouselContentRef?.children[0] as Element);
    // observe the last child
    observer.observe(
      carouselContentRef?.children[
        carouselContentRef?.children.length - 1
      ] as Element,
    );
  }

  onMount(() => {
    // observer
    observeBoundary();
    // calculate scrollAmount
    scrollAmount =
      (carouselContentRef!.parentNode!.clientWidth as number) * 0.8;

    // count the number of slices
    totalSlides = [].slice.call(carouselContentRef?.children) as Element[];
    totalSlides.forEach((item, index) => {
      item.setAttribute("data-slide", index.toString());
      // setIsBoundary((prev) => prev + item.clientWidth);
      totalWidth += item.clientWidth;
      console.info("info: ", item.clientWidth, totalWidth);
    });
    // totalSlides = items.length;
    console.log(
      "--- onMoutn: ",
      "scrollLeft:",
      carouselContentRef.scrollLeft,
      "position:",
      position(),
      "scrollAmount:",
      scrollAmount,
      "totalWidth:",
      totalWidth,
    );
  });

  onCleanup(() => {
    console.info("clean up");
    observer?.disconnect();
  });

  const shift = (e: MouseEvent): void => {
    if (position() === 0 && e.currentTarget!.dataset.direction === "prev") {
      console.log("--- Click: position =", position());
      return;
    }

    let direction = e.currentTarget!.dataset.direction === "prev" ? -1 : 1;
    let newPos = Math.round(
      direction === -1 ? scrollAmount * -1 : scrollAmount,
    );
    setPosition(newPos);

    console.log(
      "--- Click: ",
      e.currentTarget?.dataset!.direction,
      position(),
      newPos,
    );
    carouselContentRef?.scrollBy({
      behavior: "smooth",
      left: position(),
    });
    // console.log("totalWidth =", totalWidth);
  };

  return (
    <CarouselViewport
      width={width}
      {...rest}
      class="bg-black/50 overflow-hidden"
    >
      <div
        tabIndex={0}
        style={{ gap }}
        ref={carouselContentRef}
        class={`flex overflow-x-auto scroll-smooth snap-x snap-mandatory *:flex-none *:snap-start h-[${height}]`}
      >
        {children}
      </div>

      <Steering>
        <Button
          onClick={shift}
          aria-label="previous"
          data-direction="prev"
          // disabled={position() === 0}
          direction="left"
        />
        <Button
          onClick={shift}
          aria-label="next"
          data-direction="next"
          // disabled={position() > isBoundary()}
          direction="right"
        />
      </Steering>
    </CarouselViewport>
  );
};
