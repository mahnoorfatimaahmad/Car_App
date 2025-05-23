"use client";
import React, { useEffect, useState } from "react";
import Heading from "@/components/miniWidgets/Heading";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import NEXT_PUBLIC_API_URL from "@/components/layout/Url";
import AOS from "aos";
import "aos/dist/aos.css";

const CarService = () => {
  const [carServices, setCarServices] = useState([]);

  useEffect(() => {
    AOS.init({
      easing: "ease-in-out",
      offset: 100,
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${NEXT_PUBLIC_API_URL}/data/services.json`);
        const data = await response.json();
        console.log("services", data);
        setCarServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className="pt-16 pb-36 bg-black bg-opacity-40 px-14 sm:px-28"
      style={{
        paddingBottom: "30px",
        position: "relative",
        backgroundImage: `url("/images/bg_02.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Heading title="Our Services" para="Lorem ipsum is simply dummy text" />

      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay
        autoPlaySpeed={3000}
        infinite
        responsive={{
          desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
          tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
          mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
        }}
        draggable
        pauseOnHover
        swipeable
      >
        {carServices.map((service) => (
          <div
            key={service.id}
            className="bg-white w-[100%] md:w-[95%] bg-opacity-80 group hover:border-red-600 gap-5 border-none rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <img
              src={service.image}
              alt={service.heading}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-white bg-black group-hover:bg-red-600 group-hover:text-white duration-300 transition-all ease-in-out text-center">
              <h3 className="text-lg font-bold">{service.heading}</h3>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarService;
