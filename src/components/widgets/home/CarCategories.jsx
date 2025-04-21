import React, { useEffect, useState } from "react";
import { Button, Chip } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useCarContext } from "@/contextApi/CarContext";
import Heading from "../../miniWidgets/Heading";
import CarCard from "@/components/miniWidgets/CarCard";
import NEXT_PUBLIC_API_URL from "@/components/layout/Url";
const CarCategories = () => {
  const [categories, setCategories] = useState([]);
  // const NEXT_PUBLIC_API_URL = "https://car-rent-appl.netlify.app/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${NEXT_PUBLIC_API_URL}/data/categories.json`
        );
        const cate = await response.json();
        setCategories(cate);
        console.log("categories in categories compoennes", cate);
      } catch (error) {
        console.error("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className="pt-16 pb-36 border-4 border-orange-950 bg-black bg-opacity-40 px-8 sm:px-10 md:px-28"
      style={{
        paddingBottom: "30px",
        position: "relative",
        backgroundImage: `url("/images/bg_02.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Heading
        title="Lorem ipsum is simply dummy text"
        para="Lorem ipsum is simply dummy text"
      />

      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay
        autoPlaySpeed={3000}
        centerMode={false}
        className="mb-12"
        containerClass="carousel-container"
        // dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass="carousel-item-padding-40-px"
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside
        responsive={{
          desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4, // Show 4 items on desktop
            partialVisibilityGutter: 30, // Adjust gutter between cards
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2, // Show 2 items on tablets
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1, // Show 1 item on mobile
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        // showDots
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {categories &&
          categories.map((car, index) => (
            <div
              className="w-[100%] md:w-[95%]  bg-white bg-opacity-80 rounded-lg overflow-hidden"
              key={index}
            >
              <CarCard car={car} />
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default CarCategories;
