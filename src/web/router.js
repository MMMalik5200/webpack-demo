import Home from "./pages/Home";
import Me from "./pages/Me";

const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
    name: "home"
  },
  {
    path: "/me",
    exact: true,
    component: Me,
    name: "me"
  }
];

export default routes;
