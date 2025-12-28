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
        <div class="bg-lime-200 w-3xs h-96 relative">
          <h2 class="absolute bg-linear-to-r from-pink-500 to-pink-700/70 bg-clip-text text-9xl font-extrabold text-transparent uppercase">
            ...1
          </h2>
          <img src="/images/uvm5l73_1.jpg" class="size-fit" />
        </div>
        <div class="bg-amber-300 max-h-48 relative">
          <h2 class="absolute bg-linear-to-r from-lime-500 to-white/90 bg-clip-text text-9xl font-extrabold text-transparent uppercase">
            ...2
          </h2>
          <img src="/images/uvm5l73_1.jpg" class="size-fit" />
        </div>
        <div class="bg-amber-400 bg-cover w-2xl h-24 relative">
          <h2 class="absolute bg-linear-to-r from-purple-500 to-white/90 bg-clip-text text-9xl font-extrabold text-transparent uppercase">
            ...3
          </h2>
          <img src="/images/uvm5l73_1.jpg" class="w-full" />
        </div>
        <div class="bg-pink-500 bg-cover w-2xl h-24 relative">
          <h2 class="absolute bg-linear-to-r from-blue-500 to-purple-700/90 bg-clip-text text-9xl font-extrabold text-transparent uppercase">
            ...4
          </h2>
          <img src="/images/uvm5l73_1.jpg" class="w-full" />
        </div>
        <div class="bg-amber-600 bg-cover w-2xl h-24 relative">
          <h2 class="absolute bg-linear-to-r from-purple-800 to-blue-700/90 bg-clip-text text-9xl font-extrabold text-transparent uppercase">
            ...5
          </h2>
          <img src="/images/uvm5l73_1.jpg" class="w-full" />
        </div>
        <div class="bg-blue-700 bg-cover w-2xl h-24 relative">
          <h2 class="absolute bg-linear-to-r from-purple-500 to-pink-700/90 bg-clip-text text-9xl font-extrabold text-transparent uppercase">
            ...6
          </h2>

          <img src="/images/uvm5l73_1.jpg" class="w-full" />
        </div>
      </Carousel>
    </div>
  );
}
