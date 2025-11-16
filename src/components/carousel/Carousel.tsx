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
    scrollAmount = carouselContentRef!.parentNode!.clientWidth as number;

    // count the number of slices
    totalSlides = [].slice.call(carouselContentRef?.children) as Element[];
    totalSlides.forEach((item, index) => {
      item.setAttribute("data-slide", index.toString());
    });
    // totalSlides = items.length;
    console.log("--- onMoutn: ", carouselContentRef.scrollLeft, position());
    console.log(
      carouselContentRef?.clientWidth,
      carouselContentRef!.parentNode!.clientWidth,
    );
    console.log("_______________________");
    console.log(totalSlides);
  });

  createEffect(() => {
    console.log("--- createEffect");

    console.log(carouselContentRef.scrollLeft, position());

    carouselContentRef?.scrollBy({
      behavior: "smooth",
      left: position(),
    });
  });

  onCleanup(() => {
    console.info("clean up");
    observer?.disconnect();
  });

  const shift = (e: MouseEvent): void => {
    let newPos = Math.round(
      e.currentTarget!.dataset.direction === "prev"
        ? (scrollAmount - position()) * -1
        : scrollAmount + position(),
    );
    console.log(
      "--- Click: ",
      e.currentTarget?.dataset!.direction,
      scrollAmount,
      position(),
      newPos,
    );
    setPosition(newPos);
  };

  return (
    <CarouselViewport
      width={width}
      {...rest}
      class="bg-amber-700 overflow-hidden"
    >
      <div
        tabIndex={0}
        style={{ gap }}
        ref={carouselContentRef}
        class={`bg-pink-700 flex overflow-x-auto scroll-smooth snap-x snap-mandatory *:flex-none *:snap-start h-[${height}]`}
      >
        {children}
      </div>

      <Steering>
        <Button
          onClick={shift}
          aria-label="previous"
          data-direction="prev"
          disabled={isBoundary === 0}
          direction="left"
        />
        <Button
          onClick={shift}
          aria-label="next"
          data-direction="next"
          disabled={isBoundary > 0}
          direction="right"
        />
      </Steering>
    </CarouselViewport>
  );
};
