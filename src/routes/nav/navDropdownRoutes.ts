import { To } from "react-router-dom";

export type NavRoute = {
  label: string;
  routes: {
    label: string;
    link: To;
    redirect?: boolean | false;
  }[];
};

const navDropdownRoutes: NavRoute[] = [
  {
    label: "Routes",
    routes: [
      {
        label: "Home",
        link: "/",
      },
      {
        label: "Home",
        link: "/",
      }, {
        label: "Home",
        link: "/",
      }, {
        label: "Home",
        link: "/",
      }, {
        label: "Home",
        link: "/",
      }, {
        label: "Home",
        link: "/",
      }, {
        label: "Home",
        link: "/",
      }, {
        label: "Home",
        link: "/",
      }, {
        label: "Home",
        link: "/",
      }, {
        label: "Home",
        link: "/",
      }, {
        label: "Home",
        link: "/",
      }, {
        label: "Home",
        link: "/",
      }, {
        label: "Home",
        link: "/",
      }, {
        label: "Home",
        link: "/",
      }, {
        label: "Home",
        link: "/",
      }, {
        label: "Home",
        link: "/",
      }, {
        label: "Home",
        link: "/",
      }, {
        label: "Home",
        link: "/",
      }, {
        label: "Home",
        link: "/",
      }, {
        label: "Home",
        link: "/",
      }, {
        label: "Home",
        link: "/",
      }, {
        label: "Home",
        link: "/",
      }, {
        label: "Home",
        link: "/",
      },
    ],
  },
  {
    label: "Tools",
    routes: [
      {
        label: "Grid",
        link: "/grid",
        redirect: true,
      },
    ],
  },
];

export default navDropdownRoutes;