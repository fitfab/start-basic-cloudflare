import { createFileRoute } from "@tanstack/solid-router";
import { createServerFn } from "@tanstack/solid-start";
import { env } from "cloudflare:workers";
import { Carousel } from "~/components/carousel/Carousel";

export const Route = createFileRoute("/")({
  loader: () => getData(),
  component: Home,
});

const getData = createServerFn().handler(() => {
  return {
    message: `Running in ${navigator.userAgent}`,
    myVar: env.MY_VAR,
  };
});

function Home() {
  const data = Route.useLoaderData();

  return (
    <div class="p-2">
      <h3>Welcome Home!!!</h3>
      <p>{data().message}</p>
      <p>{data().myVar}</p>

      <Carousel>
        <div class="bg-lime-200 bg-fit w-2xl h-96">
          <h2>image one</h2>
          <img src="/images/uvm5l73_1.jpg" class="w-full" />
        </div>
        <div class="bg-amber-300 bg-cover w-2xl h-24">
          <h2>image 2</h2>
          <img src="/images/uvm5l73_1.jpg" class="w-full" />
        </div>
        <div class="bg-amber-400 bg-cover w-2xl h-24">
          <h2>image 3</h2>
          <img src="/images/uvm5l73_1.jpg" class="w-full" />
        </div>
        <div class="bg-pink-500 bg-cover w-2xl h-24">
          <h2>image 4</h2>
          <img src="/images/uvm5l73_1.jpg" class="w-full" />
        </div>
        <div class="bg-amber-600 bg-cover w-2xl h-24">
          <h2>image 5</h2>
          <img src="/images/uvm5l73_1.jpg" class="w-full" />
        </div>
        <div class="bg-blue-700 bg-cover w-2xl h-24">
          <h2>image 6</h2>
          <img src="/images/uvm5l73_1.jpg" class="w-full" />
        </div>
      </Carousel>
    </div>
  );
}
