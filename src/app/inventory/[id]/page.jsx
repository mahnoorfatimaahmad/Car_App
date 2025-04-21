"use client"; // Ensure this component runs on the client side

import { useParams } from "next/navigation";
import ProductDetail from "@/components/widgets/booking/ProductDetail";
import BlogSlider from "@/components/widgets/home/BlogSlider";
import Hero from "@/components/miniWidgets/Hero";
import { CircularProgress } from "@mui/material";

export default function Page() {
  const param = useParams();
  console.log("id", param?.id);

  if (!param?.id) {
    return (
      <p>
        <CircularProgress />
      </p>
    );
  }

  return (
    <>
      {param.id}
      <Hero />
      <ProductDetail id={param.id} />
      <BlogSlider />
    </>
  );
}
