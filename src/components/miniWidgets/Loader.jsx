"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PuffLoader } from "react-spinners";

const Loader = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Store the previous route to detect change
  useEffect(() => {
    let timeout; // To prevent flashing

    const handleRouteChange = () => {
      setLoading(true);
      timeout = setTimeout(() => setLoading(false), 1000); // Adjust time if needed
    };

    handleRouteChange(); // Call on initial render

    return () => clearTimeout(timeout);
  }, [router.asPath]); // Runs when the route changes

  return loading ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <PuffLoader color="#ffffff" size={80} />
    </div>
  ) : null;
};

export default Loader;
