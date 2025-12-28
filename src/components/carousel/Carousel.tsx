import { CarouselViewport, Steering, Button, CarouselProps } from "./partials";
import { createSignal, createEffect, onMount, onCleanup, Show } from "solid-js";

export const Carousel = ({
  children,
  width = "100%",
  height = "320px",
  gap = "24px",
  ...rest
}: CarouselProps) => {
  const [position, setPosition] = createSignal(0);
  const [boundary, setBoundary] = createSignal(0);

  let carouselContentRef!: HTMLDivElement;
  let scrollAmount = 0;
  let observer!: IntersectionObserver;

  const [currentSlide, setCurrentSlide] = createSignal(0);

  // function observeBoundary(): void {
  //   const options = {
  //     root: carouselContentRef,
  //     threshold: 0.9,
  //   };
  //   observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry, index) => {
  //       if (entry.isIntersecting) {
  //         setIsBoundary(Number(entry.target.getAttribute("data-slide")));
  //       } else {
  //         setIsBoundary(-1);
  //       }
  //     });
  //   }, options);
  //   // observe the first child
  //   observer.observe(carouselContentRef?.children[0] as Element);
  //   // observe the last child
  //   observer.observe(
  //     carouselContentRef?.children[
  //       carouselContentRef?.children.length - 1
  //     ] as Element,
  //   );
  // }

  onMount(() => {
    let totalSlides!: Element[];
    // calculate scrollAmount
    scrollAmount =
      (carouselContentRef!.parentNode!.clientWidth as number) * 0.7;

    // count the number of slices
    totalSlides = [].slice.call(carouselContentRef?.children) as Element[];
    totalSlides.forEach((item, index) => {
      item.setAttribute("data-slide", index.toString());
    });
    setBoundary(totalSlides.length);
    // observer
    // observeBoundary();
  });

  createEffect(() => {
    console.log("createEffect:", currentSlide(), boundary());
    // console.log(observer.takeRecords());
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
    setCurrentSlide((current) => current + direction);

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
  };

  return (
    <CarouselViewport width={width} {...rest}>
      <div
        tabIndex={0}
        style={{ gap }}
        ref={carouselContentRef}
        class={`flex overflow-x-auto scroll-smooth snap-x snap-mandatory *:flex-none *:snap-start h-[${height}]`}
      >
        {children}
      </div>

      <Steering>
        {/* Left Button*/}
        <Show
          when={currentSlide() !== 0}
          fallback={
            <Button
              disabled
              onClick={shift}
              aria-label="previous"
              data-direction="prev"
              direction="left"
            />
          }
        >
          <Button
            onClick={shift}
            aria-label="previous"
            data-direction="prev"
            direction="left"
          />
        </Show>
        {/* Right Button*/}

        <Show
          when={currentSlide() < boundary()}
          fallback={
            <Button
              onClick={shift}
              aria-label="next"
              data-direction="next"
              disabled
              direction="right"
            />
          }
        >
          <Button
            onClick={shift}
            aria-label="next"
            data-direction="next"
            direction="right"
          />
        </Show>
      </Steering>
    </CarouselViewport>
  );
};
