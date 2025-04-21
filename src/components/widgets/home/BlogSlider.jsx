"use client";
import React, { useEffect, useState } from "react";
import { FaComments } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import NEXT_PUBLIC_API_URL from "@/components/layout/Url";
const BlogSlider = () => {
  const [blogs, setBlogs] = useState([]);
  // const NEXT_PUBLIC_API_URL = "https://car-rent-appl.netlify.app";

  useEffect(() => {
    AOS.init({
      easing: "ease-in-out",
      offset: 100,
    });
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${NEXT_PUBLIC_API_URL}/data/blog.json`);
        let data = await response.json();
        console.log("data", data);
        setBlogs(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center font-semibold bg-gray-100 rounded-md pt-10 font-sans my-20">
      <p className="text-gray-500">Lorem Ipsum is simply dummy text</p>
      <h2 className="text-3xl font-bold mb-4">
        Our <span className=" text-red-500 font-sans ">Blogs</span>
      </h2>
      <div className="w-[80%] md:w-[98%] xl:w-[80%] mx-auto flex-wrap justify-center  flex gap-4 md:gap-2 xl:gap-4 mt-7">
        {blogs.map((item, i) => (
          <div
            data-aos="zoom-in-down"
            data-aos-delay={i * 200}
            key={i}
            className="w-[90%] sm:w-[40%] md:w-[32%] xl:w-[30%] rounded overflow-hidden shadow-lg bg-white hover:scale-110 transition-transform duration-500 ease-in-out"
          >
            <Image
              className="w-full h-48 object-cover"
              src={item.image}
              alt="Car on a road"
              width={200}
              height={200}
            />
            <div className="px-6 py-4">
              <div className="flex items-center justify-between mb-2 text-gray-500 text-sm">
                <p className="text-sm text-gray-500 ">{item.date}</p>
                <div className=" w-[33%] flex items-center justify-between">
                  <div className="flex items-center">
                    <FaComments className="text-xl mr-1" />
                    <span>{item.comments}</span>
                  </div>
                  <div className="flex items-center">
                    <CiHeart className="text-xl mr-1" />
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
              <h2 className="font-bold text-lg mb-2 text-gray-800">
                {item.title}
              </h2>
              <p className="text-gray-500 font-sans text-sm">
                {item.description}
              </p>
            </div>
            <div className="px-6 pb-4 flex justify-between items-center">
              <a
                href={item.link}
                className="text-blue-500 text-sm font-semibold hover:underline"
              >
                READ MORE
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSlider;
