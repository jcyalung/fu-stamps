"use client"

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const { push } = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // added user id and verification fields to the payload
    const payload = {
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
      // constant verification and user id rn
      verification: 2,
      user_id: 0,
    }

    try {
      const response = await axios.post("/api/login", payload);
      if (response.status === 200) {
        // alerts the user that login was successful
        alert("Login successful");
      }
    } catch (e) {
      const error = e as AxiosError;
      // displays error message and error code
       if (error.response) {
        const data = error.response.data as { message?: string };
        alert(data.message + '\n' + error.message || "An unknown error occurred.");
      }
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center h-screen">
        <div>
          <label htmlFor="email">Email: </label>
          <input 
            type="text" 
            id="email" 
            name="email" 
            required 
            className="border p-2 mb-4" 
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
          //changed input type to password on some secure shi 
            type="password" 
            id="password" 
            name="password" 
            required 
            className="border p-2 mb-4" 
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </main>
  );
}
