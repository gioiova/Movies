"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateUser } from "@/utils/auth";

export default function SignUpForm() {
  const [formData, setFormData] = useState({ 
    username: "", 
    password: "", 
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const { username, password, } = formData;

    // Validate inputs
    if (!username ||  !password  ) {
      setErrorMessage("All fields are required.");
      setIsLoading(false);
      return;
    }

  

    try {
      // Validate user
      const isValidUser = validateUser(username, password);
      if (isValidUser) {
        setErrorMessage("");
        router.push("/");
      } else {
        setErrorMessage("Invalid username or password.");
      }
    } catch (error) {
      setErrorMessage("An error occurred during signup.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-600">MovieFlix</h1>
          <p className="text-gray-400 mt-2">Create your account</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-8 rounded-lg shadow-xl space-y-6"
        >
          {errorMessage && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-md">
              {errorMessage}
            </div>
          )}

          {/* Username field */}
          <div>
            <label htmlFor="username" className="block text-gray-300 text-sm font-medium mb-2">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                placeholder="Enter your username"
              />
            </div>
          </div>

      

          {/* Password field */}
          <div>
            <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                placeholder="Enter your password"
              />
            </div>
          </div>


          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors disabled:bg-red-800 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <span>{isLoading ? "Creating Account..." : "Sign Up"}</span>
            
          </button>

       
        </form>
      </div>
    </div>
  );
};