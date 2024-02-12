"use client";
import useStore from "@/lib/useStore";
import React, { useEffect } from "react";

const ClientSideState = ({ state }: any) => {
  useEffect(() => {
    useStore.setState(state);
  }, []);
  return <></>;
};

export default ClientSideState;
