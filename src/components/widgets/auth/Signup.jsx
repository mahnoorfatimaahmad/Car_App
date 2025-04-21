"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { toast } from "react-toastify";

const NEXT_PUBLIC_BASE_URL = "https://restweb.azurewebsites.net/";

const SignupPage = () => {
  const router = useRouter();
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password mismatch validation
    if (registerData.password !== registerData.confirmPassword) {
      toast.error("Passwords do not match!", {
        position: "top-right",
      });
      return;
    }

    console.log("register data", registerData);

    setIsLoading(true);

    toast.success(`Register Successfully! 🎉`, {
      position: "top-right",
    });
    router.push("/login");

    // try {
    //   const response = await fetch(`${NEXT_PUBLIC_BASE_URL}/users/signup/`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email: registerData.email,
    //       username: registerData.name,
    //       password: registerData.password,
    //     }),
    //   });

    //   if (response.ok) {
    //     const user = await response.json();

    //     // Store token in localStorage
    //     localStorage.setItem("token", JSON.stringify(user.user_id));

    //     toast.success(`${user.message}! 🎉`, {
    //       position: "top-right",
    //     });

    //     // Reset form fields
    //     setRegisterData({
    //       email: "",
    //       name: "",
    //       password: "",
    //       confirmPassword: "",
    //     });

    //     // Navigate to the login page (if needed)
    //     router.push("/login");
    //   } else {
    //     // Handle errors (e.g., 400 Bad Request)
    //     const errorData = await response.json();
    //     console.log("error data", errorData);

    //     toast.error(
    //       errorData.detail || "Registration failed. Please try again.",
    //       {
    //         position: "top-right",
    //       }
    //     );
    //   }
    // } catch (error) {
    //   // Handle network or unexpected errors
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
        {/* Signup Form Section */}
        <div className="w-full lg:w-[50%] p-6 bg-white rounded-l-md h-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Sign Up</h2>
          <p className="text-gray-600 mb-6">Register to access your account</p>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <TextField
                label="First Name"
                name="firstName"
                variant="outlined"
                fullWidth
                size="small"
                value={registerData.firstName}
                onChange={handleChange}
              />
              <TextField
                label="Last Name"
                name="lastName"
                variant="outlined"
                fullWidth
                size="small"
                value={registerData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <TextField
                label="Email"
                name="email"
                variant="outlined"
                fullWidth
                size="small"
                value={registerData.email}
                onChange={handleChange}
                type="email"
              />
              <TextField
                label="Phone Number"
                name="phone"
                variant="outlined"
                fullWidth
                size="small"
                value={registerData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4">
              <TextField
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                fullWidth
                size="small"
                value={registerData.password}
                onChange={handleChange}
              />
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                variant="outlined"
                fullWidth
                size="small"
                value={registerData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="I agree to all the Terms and Privacy Policies."
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="mb-4 bg-red-600 text-white py-[10px]"
            >
              {isLoading ? "Signing up..." : "Register"}
            </Button>
          </form>

          <p className="text-gray-600 text-center mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-red-500 font-medium">
              Login
            </Link>
          </p>

          {/* Social Login Buttons */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-4">Or sign up with</p>
            <div className="flex justify-center gap-4">
              <Button variant="outlined" className="flex-1">
                <FaFacebook />
              </Button>
              <Button variant="outlined" className="flex-1">
                <FaGoogle />
              </Button>
            </div>
          </div>
        </div>

        {/* Image Section */}
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
};

export default SignupPage;
