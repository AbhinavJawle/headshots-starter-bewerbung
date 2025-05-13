"use client";
import React from "react";
import { dodopayments } from "@/lib/dodopayments";
import { useEffect } from "react";

useEffect(() => {
  listProducts();
}, []);
async function listProducts() {
  try {
    const products = await dodopayments.products.list();
    console.log(products);
  } catch (error) {
    console.log(error);
  }
}

export default async function Index() {
  return <>HIII</>;
}
