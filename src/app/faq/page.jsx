import React from "react";

import Hero from "@/components/miniWidgets/Hero";
import FAQAccordion from "@/components/miniWidgets/Faqs";
import BlogSlider from "@/components/widgets/home/BlogSlider";
const page = () => {
  return (
    <>
      <Hero />
      <FAQAccordion />
      <BlogSlider />
    </>
  );
};

export default page;
