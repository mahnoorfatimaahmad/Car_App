import { Facebook, Twitter, YouTube, Instagram } from "@mui/icons-material";
import { useEffect } from "react";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
export default function Team() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      offset: 100,
      delay: 0,
    });
  }, []);
  const team = [
    { name: "John Doe", role: "CEO", image: "/images/team/team_01.jpg" },
    {
      name: "Jane Smith",
      role: "Manager",
      image: "/images/team/image_01.jpg",
    },
    {
      name: "Alice Johnson",
      role: "Designer",
      image: "/images/team/team_03.jpg",
    },
    {
      name: "Alice Johnson",
      role: "Enginner",
      image: "/images/team/images.jpg",
    },
  ];
  const icon = [
    {
      link: "https;//www.facebook.com",
      icon: <FaFacebookF />,
    },
    {
      link: "https;//www.twitter.com",
      icon: <Twitter />,
    },
    {
      link: "https;//www.youtube.com",
      icon: <YouTube />,
    },
    {
      link: "https;//www.instagram.com",
      icon: <Instagram />,
    },
  ];
  return (
    <div className="flex flex-col items-center font-semibold font-sans my-8">
      <p>Lorem Ipsum is simply dummy text</p>
      <h2 className="text-3xl font-bold mb-4">
        Our <span className=" text-red-500 font-sans ">Team</span>
      </h2>
      <section className="py-6 flex flex-wrap flex-row items-center  justify-center gap-4 w-[80%] sm:w-[95%] xl:w-[80%] mx-auto">
        {team.map((item, i) => (
          <div
            data-aos="zoom-in"
            key={i}
            className="w-[70%] sm:w-[40%] md:w-[23%] text-center relative bg-white group  rounded-lg shadow-lg  overflow-hidden  transition-transform duration-500 ease-in-out transform hover:scale-105"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={300}
              height={200}
              className="w-full h-[250px] mx-auto "
            />

            {/* Social Media Icons */}
            <div className="flex  bg-black/50  justify-center gap-4 -bottom-16 absolute left-0 group-hover:bottom-1 duration-200 transition-all  ease-in-out  w-full rounded-b-md">
              {icon.map((item, i) => (
                <Link
                  key={i}
                  href={item.link}
                  className="text-red-500 hover:text-red-700  rounded-md py-1 px-[8px] flex items-center justify-center transition-all ease-in-out duration-200"
                >
                  <span
                    className=" text-black text-[18px] duration-500 bg-white p-1 px-[6px] rounded-md"
                    style={{ transition: "transform 0.5s ease-in-out" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "rotateY(180deg)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "rotateY(0deg)")
                    }
                  >
                    {item.icon}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
