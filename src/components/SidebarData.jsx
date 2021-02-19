import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";

const Sidebardata = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/",
  },

  {
    title: "Search",
    icon: <SearchIcon />,
    link: "/search",
  },

  {
    title: "Library",
    icon: <LibraryMusicIcon />,
    link: "/library",
  },

  // {
  //   button: "SignUp",
  //   link: "/signup",
  // },

  // {
  //   button: "Login",
  //   link: "/login",
  // },
];
export default Sidebardata;
