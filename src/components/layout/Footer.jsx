import React from "react";
import { TextField, Button } from "@mui/material";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 w-full px-8 ">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* About Us Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">About Us</h2>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            faucibus id malesuada lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </p>
        </div>

        {/* Contact Info Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Contact Info</h2>
          <p className="text-sm mb-2">
            <span className="font-bold">Phone:</span> +1 234-567-8901
          </p>
          <p className="text-sm mb-2">
            <span className="font-bold">Address:</span> 123 Main Street, Anytown
            USA
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-white hover:text-gray-400">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Newsletter Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Newsletter</h2>
          <p className="text-sm mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            faucibus.
          </p>
          <form className="flex flex-col">
            <TextField
              variant="outlined"
              placeholder="Enter your email"
              size="small"
              className="bg-white rounded mb-4"
            />
            <Button
              variant="contained"
              color="error"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center border-t border-gray-700 pt-4">
        <p className="text-sm">
          &copy; Example 2025. All Rights Reserved. Designed by Ammara Ilyas.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
