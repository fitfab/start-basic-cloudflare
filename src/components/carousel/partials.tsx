import { Component, JSXElement, JSX } from "solid-js";
export interface CarouselProps extends Component {
  children: JSX.Element;
  /**
   * The width of the carousel default to `100%`
   */
  width: string;
  /**
   * The height of the carousel default to `320px`
   */
  height: string;

  /**
   * The space between(aka gutter or gap) each slides and
   * it should be in any we unit (px, %, em, rem, ...)
   * default to `24px`
   */
  gap: string;
}

export const CarouselViewport = ({
  children,
  width,
  height,
  gap,
  ...rest
}: CarouselProps) => {
  const navigationHeight = "48px";
  const dynamicStyles = {
    width,
    height: `calc(${height} + ${navigationHeight})`,
  };
  return (
    <div style={dynamicStyles} class={`relative mx-auto`} {...rest}>
      {children}
    </div>
  );
};

export const Steering = (props: Component) => {
  return <div class="flex justify-end content-center w-full pt-2" {...props} />;
};

export interface ButtonProps extends Component {
  direction: "left" | "right";
}
export const Button = ({ direction, ...rest }: ButtonProps) => {
  return (
    <button
      class="bg-neutral-500 hover:bg-neutral-900 disabled:bg-neutral-300 text-white p-2 rounded-full first:mr-4"
      {...rest}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {direction === "left" ? (
          <path
            stroke-linecap="round"
            stroke-width={1}
            stroke-linejoin="round"
            d="M15 19l-7-7 7-7"
          />
        ) : (
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 5l7 7-7 7"
          />
        )}
      </svg>
    </button>
  );
};
