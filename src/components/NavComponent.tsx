"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "@/components/navbar/navbar";

const NavComponent = () => {
  const pathname = usePathname();
  console.log({ pathname });

  return <Navbar />;
};

export default NavComponent;
