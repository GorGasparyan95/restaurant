import Homepage from "./Homepage";
import Restaurant from "./Restaurant";

const config = [
  {
    component: Homepage,
    path: "/",
    exact: true,
  },
  {
    component: Restaurant,
    path: "/restaurant",
    exact: true,
  },
];

export default config;
