"use client"

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
});

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
      const response = await axios.post("/api/auth/login", payload);
      if (response.status === 200) {
        // alerts the user that login was successful
        alert("Login successful");
        push('/');
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
    <main style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#FFFBEF',
      display: 'block',
      }}>
        
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center h-screen">
          <div className="border-1 w-[588px] h-[504px] border-r-4 border-b-6 border-black bg-white flex flex-col items-center justify-center">
            <div className="flex flex-col mb-[48px] w-[280px]">
              <label htmlFor="email" className={`${montserrat.className} text-black text-xs mb-[8px]`}>ENTER EMAIL </label>
              <input
                type="text"
                id="email"
                name="email"
                required
                className={`${montserrat.className} border border-black rounded-full bg-lightyellow px-[15px] py-[8px] text-black`}
              />
            </div>
            <div className="flex flex-col mb-[48px] w-[280px]">
              <label htmlFor="password" className={`${montserrat.className} text-black text-xs mb-[8px]`}>ENTER PASSWORD </label>
              <input
              //changed input type to password on some secure shi
                type="password"
                id="password"
                name="password"
                required
                className={`${montserrat.className} border border-black rounded-full bg-lightyellow px-[15px] py-[8px] text-black tracking-wider`}
              />
            </div>
            <button
              type="submit"
              className={`${montserrat.className} bg-[#FBCA29] text-black hover:cursor-pointer w-[115px] h-[56px] border-1 border-b-4 border-r-2 px-[24px] text-lg font-semibold`}
            >
              LOGIN
            </button>
          </div>
        </form>
    </main>
  );
}
