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
        <div class="bg-amber-400 bg-cover w-2xl h-24">
          <img src="/images/uvm5l73_1.jpg" class="w-full" />
        </div>
        <div class="bg-amber-400 bg-cover w-2xl h-24">
          <img src="/images/uvm5l73_1.jpg" class="w-full" />
        </div>
        <div class="bg-amber-400 bg-cover w-2xl h-24">
          <img src="/images/uvm5l73_1.jpg" class="w-full" />
        </div>
        <div class="bg-amber-400 bg-cover w-2xl h-24">
          <img src="/images/uvm5l73_1.jpg" class="w-full" />
        </div>
        <div class="bg-amber-400 bg-cover w-2xl h-24">
          <img src="/images/uvm5l73_1.jpg" class="w-full" />
        </div>
        <div class="bg-amber-400 bg-cover w-2xl h-24">
          <img src="/images/uvm5l73_1.jpg" class="w-full" />
        </div>
      </Carousel>

      <div class="bg-pink-400 overflow-clip h-80 w-full">
        {/* slide container*/}
        <div class="flex *:flex-none overflow-x-auto scroll-smooth snap-x snap-mandatory h-full gap-5 *:snap-start">
          <div class="bg-amber-400 bg-cover w-2xl h-24">
            <img src="/images/uvm5l73_1.jpg" class="w-full" />
          </div>
          <div class="bg-amber-400 bg-cover w-2xl h-24">
            <img src="/images/uvm5l73_1.jpg" class="w-full" />
          </div>
          <div class="bg-amber-400 bg-cover w-2xl h-24">
            <img src="/images/uvm5l73_1.jpg" class="w-full" />
          </div>
          <div class="bg-amber-400 bg-cover w-2xl h-24">
            <img src="/images/uvm5l73_1.jpg" class="w-full" />
          </div>
        </div>
        <nav>
          <button>left</button> <button>right</button>
        </nav>
      </div>
    </div>
  );
}
