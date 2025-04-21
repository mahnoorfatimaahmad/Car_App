"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";
import { toast } from "react-toastify";

const NEXT_PUBLIC_BASE_URL = "https://restweb.azurewebsites.net/";

export default function LoginPage() {
  const router = useRouter();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!loginData.email || !loginData.password) {
      toast.error("Email and password are required.", {
        position: "top-right",
      });
      setIsLoading(false);
      return;
    }
    toast.success(`Login Successfully! 🎉`, { position: "top-right" });
    setLoginData({ email: "", password: "" });
    router.push("/");
    // try {
    //   // const response = await fetch(`${NEXT_PUBLIC_BASE_URL}users/login/`, {
    //   //   method: "POST",
    //   //   headers: { "Content-Type": "application/json" },
    //   //   body: JSON.stringify(loginData),
    //   // });

    //   if (response.ok) {
    //     const user = await response.json();
    //     localStorage.setItem("token", JSON.stringify(user.user_id));
    //     toast.success(`${user.message}! 🎉`, { position: "top-right" });
    //     setLoginData({ email: "", password: "" });
    //     router.push("/");
    //   } else {
    //     const errorData = await response.json();
    //     toast.error(errorData.detail || "Invalid email or password.", {
    //       position: "top-right",
    //     });
    //   }
    // } catch (error) {
    //   console.error("Network error:", error);
    //   toast.error("Network error. Please try again.", {
    //     position: "top-right",
    //   });
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="container mx-auto py-12 w-[95%] md:w-[80%] lg:w-[95%] xl:w-[80%] my-10 sm:pl-20">
      <div className="flex flex-col border rounded-lg w-[98%] sm:w-[90%] lg:flex-row shadow-lg items-center">
        <div className="w-full lg:w-[50%] p-6 bg-white rounded-l-md h-full">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <p className="text-gray-600 mb-6">Login to access your account</p>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={loginData.email}
              onChange={handleChange}
              className="mb-4"
              type="email"
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              name="password"
              value={loginData.password}
              onChange={handleChange}
              className="mb-4"
              type="password"
            />
            <div className="flex justify-between items-center mb-4">
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Remember Me"
              />
              <Link href="/forgot-password" className="text-red-600 text-sm">
                Forgot Password?
              </Link>
            </div>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="mb-4 bg-red-600 text-white py-[10px]"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            <div className="text-center">
              <p className="text-black">
                Don't have an account?{" "}
                <Link href="/register" className="text-red-600">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-4">Or login with</p>
            <div className="flex justify-center gap-4">
              <Button variant="outlined" className="flex-1">
                <FaFacebook />
              </Button>
              <Button variant="outlined" className="flex-1">
                {/* Replace with Google login icon */}
              </Button>
            </div>
          </div>
        </div>
        <div
          className="w-full lg:w-1/2 h-[584px] rounded-r-lg p-2"
          style={{
            backgroundImage: `url("/images/bg_01.webp")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
    </div>
  );
}
