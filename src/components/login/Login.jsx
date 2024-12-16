import { useState } from "react";
import { instance } from "../../axios";

export default function Login({ setIsConnected }) {
  const [formValues, setFormValues] = useState({ cin: "", password: "" });
  const [isLoading, setIsLoading] = useState("idle");
  
  const handleFormInputs = async (e) => {
    e.preventDefault();
    setIsLoading("pending");
    try {
      const response = await instance.post(`/login`, formValues);
      const token = response.data?.token;
      setIsLoading("fulfield");
      if (token) {
        localStorage.setItem("token", token);
        return setIsConnected(true);
      }
      return setIsConnected(false);
    } catch (error) {
      console.log(error);
      setIsLoading("rejected");
    }
  };

  return (
    
   <>
  {isLoading !== "pending" ? (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-[350px] text-center border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome <span className="animate-wave">👋</span></h1>
        <p className="text-gray-400 mb-6">Sign in to your account</p>

        <form className="flex flex-col" onSubmit={handleFormInputs}>
          <input
            type="text"
            placeholder="Your CIN"
            className="mb-4 rounded px-4 py-2 bg-gray-700 text-white outline-none border border-transparent focus:ring-2 focus:ring-yellow-400 transition"
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, cin: e.target.value }))
            }
          />
          <input
            type="password"
            placeholder="Your Password"
            className="mb-4 rounded px-4 py-2 bg-gray-700 text-white outline-none border border-transparent focus:ring-2 focus:ring-yellow-400 transition"
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600 transition-transform transform hover:scale-105"
          >
            Login
          </button>
        </form>

        <a
          href="#"
          className="text-sm text-gray-400 mt-4 inline-block hover:text-yellow-500 transition"
        >
          Forgot your password?
        </a>
      </div>
    </div>
  ) : (
    "loading ..."
  )}
</>

  
  );
}

