"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "@/components/Navbar";
import SecondaryNavbar from "@/components/SecondaryNavbar";

const NavComponent = () => {
  const pathname = usePathname();
  console.log({ pathname });

  // if (pathname === "/files") {
  //   return <SecondaryNavbar />;
  // }

  return <Navbar />;
};

export default NavComponent;
