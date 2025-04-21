"use client";
import { useEffect } from "react";
import Navbar from "@/components/widgets/home/Header";
import WhyChooseUs from "@/components/widgets/home/WhyChooseUs";
import Team from "@/components/widgets/home/Team";
import CarCategories from "@/components/widgets/home/CarCategories";
import CarListings from "@/components/widgets/home/CarListings";
import CarShowcase from "@/components/widgets/home/CarShowCase";
// import BrandSlider from "@/components/widgets/home/BransdSlider";
import HeroSection from "@/components/widgets/home/Hero";
import CarService from "@/components/widgets/home/CarServices";
import BlogSlier from "@/components/widgets/home/BlogSlider";
export default function Home() {
  // useEffect(async () => {
  //   await fetch("/data/car.json")
  //     .then((response) => {
  //       let data = response.json();
  //       console.log("data", data);
  //     })
  //     .then((data) => console.log(data));
  // }, []);
  return (
    <div className="font-sans w-full">
      <Navbar />
      <HeroSection />
      <CarShowcase />
      <CarCategories />
      <CarListings />
      <CarService />
      <WhyChooseUs />
      <Team />
      <BlogSlier />
    </div>
  );
}
