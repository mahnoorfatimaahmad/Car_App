import React from "react";
import Image from "next/image";
const History = () => {
  return (
    <div className="w-[95%] xl:w-[80%] mx-auto my-10 mt-20  flex md:flex-row flex-col items-center justify-center gap-5">
      <div className=" w-[95%] sm:w-[80%]  md:w-[40%]">
        <Image
          src="/images/bg_01.webp"
          alt="history"
          width={500}
          height={700}
          className=""
        />
      </div>

      <div className="md:ml-10 w-[90%] sm:w-[80%]  md:w-[40%] text-gray-800 font-sans letter-wide  ">
        <h2 className="text-red-600 font-bold text-4xl pb-4">About Us</h2>
        <p>
          In 2005, proprietor Emily Carter&apos;s daughter, Sarah, sold the
          original café to siblings, Alex and Mia Reynolds, who transformed it
          by expanding the space by 50 feet and doubling the seating capacity.
          The Reynolds siblings, along with their families, collaborated closely
          with designers to create a vibrant new restaurant, which was
          constructed in sections and shipped to the heart of Sunnyvale, CA,
          from Burlington, Vermont.
        </p>
        <p>
          Today, at YummyYatch, you can enjoy a delightful on-site bakery,
          breakfast served all day, handcrafted beverages delivered to your
          table, generous portions of delicious meals made with fresh, locally
          sourced ingredients, and warm, welcoming service. These qualities have
          earned YummyYatch the title of Best of Sunnyvale Dining. The Reynolds
          family remains at the helm, ensuring it&apos;s still very much a
          family-run establishment.
        </p>
        <h3 className="font-bold text-black mt-3">
          Here are some articles celebrating YummyYatch&apos;s cherished
          history:
        </h3>
        <ul className="list-disc   ml-10 my-2">
          <li>Sunnyvale café celebrates two decades of exceptional dining</li>
          <li>Welcome to the new and improved YummyYatch</li>
          <li>Photo of the original YummyYatch Café (pre-expansion)</li>
        </ul>
      </div>
    </div>
  );
};

export default History;
