"use client";

import { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import CircularProgress from "@mui/material/CircularProgress";
import NEXT_PUBLIC_API_URL from "../layout/Url";
export default function FAQAccordion() {
  const [openIndexes, setOpenIndexes] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  // const NEXT_PUBLIC_API_URL = "https://car-rent-appl.netlify.app/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/data/faqs.json`);
        const data = await res.json();
        // console.log("Faqs", data.faqs);
        setFaqs(data.faqs);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleAccordion = (index) => {
    setOpenIndexes((prevIndexes) =>
      prevIndexes.includes(index)
        ? prevIndexes.filter((i) => i !== index)
        : [...prevIndexes, index]
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-red-600 text-center mb-6">
        Frequently Asked Questions
      </h2>
      {loading ? (
        <div className="flex justify-center">
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border  transition-all ease-in-out duration-300  border-red-600 rounded-lg"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between transition-all ease-in-out duration-300 items-center p-4 text-white bg-black  rounded-t-lg"
              >
                <span className="font-medium">{faq.question}</span>
                {openIndexes.includes(index) ? <FaMinus /> : <FaPlus />}
              </button>
              {openIndexes.includes(index) && (
                <div className="p-4 bg-gray-600 text-white rounded-b-lg">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
