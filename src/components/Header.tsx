import { Link } from "@tanstack/solid-router";

const activeColor = () => ({ class: "bg-orange-600" });
export function Header() {
  return (
    <header class="flex gap-2 text-lg bg-gray-700 text-white absolute top-5 before:content-['*'] before:absolute before:right-full before:bg-gray-600 before:w-full before:p-2">
      <nav class="*:inline-block *:p-2 *:uppercase *:font-light">
        <Link
          to="/"
          activeProps={activeColor()}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>{" "}
        <Link to="/posts" activeProps={activeColor()}>
          Posts
        </Link>{" "}
        <Link to="/users" activeProps={activeColor()}>
          Users
        </Link>{" "}
        <Link to="/route-a" activeProps={activeColor()}>
          Pathless Layout
        </Link>{" "}
        <Link to="/deferred" activeProps={activeColor()}>
          Deferred
        </Link>{" "}
        <Link
          // @ts-expect-error
          to="/this-route-does-not-exist"
          activeProps={activeColor()}
        >
          This Route Does Not Exist
        </Link>
      </nav>
    </header>
  );
}
