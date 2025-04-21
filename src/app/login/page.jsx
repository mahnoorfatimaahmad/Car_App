import React from "react";
import LoginPage from "@/components/widgets/auth/Login";
import BlogSlider from "@/components/widgets/home/BlogSlider";
import Hero from "@/components/miniWidgets/Hero";
const page = () => {
  return (
    <div>
      <Hero />
      <LoginPage />
      <BlogSlider />
    </div>
  );
};

export default page;
