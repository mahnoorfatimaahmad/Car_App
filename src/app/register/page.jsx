import React from "react";
import SignupPage from "@/components/widgets/auth/Signup";
import Hero from "@/components/miniWidgets/Hero";
import BlogSlider from "@/components/widgets/home/BlogSlider";
const page = () => {
  return (
    <>
      <Hero />
      <SignupPage />
      <BlogSlider />
    </>
  );
};

export default page;
