"use client"
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { TABLES } from "@/constants";
import { useState } from "react";
import toast from "react-hot-toast";
const supabase = createClientComponentClient();

const checkValidPassword = (pwd: string) => {
    return (
      pwd.length >= 8 &&
      /[a-z]/.test(pwd) &&
      /[A-Z]/.test(pwd) &&
      /\d/.test(pwd)
    );
  };
  
export default function RegisterPage() {
  const { push } = useRouter();
  const [loading, setLoading]   = useState(false);
  const [password, setPassword] = useState<string>("");
  const [valid, setValid]       = useState<boolean>(true);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    setPassword(pwd);
    setValid(checkValidPassword(pwd));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log('handle submit called');
    event.preventDefault();
    if(loading) { 
      console.log("double loading detected, stopping");
      return; 
    };
    
    // added user id and verification fields to the payload
    const payload = {
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    }

    try {
        setLoading(true);
        const response = await axios.post("/api/auth/register", payload);
        if (response.status === 200) {
          // alerts the user that login was successful
          toast.success("Successfully registered! Check your email for verification.",{duration: 1000,});
          push('/');
        }
    } catch (e : any) {
        const ax_error = e as AxiosError;
        const { response } = ax_error;
        const { error } = response?.data as any;
        console.log(error.message);
        toast.error(`${error}.` || "An unknown error occurred.");
    }
    finally {
        setLoading(false);
    }
  };

  return (
    <main style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#FFFBEF',
      display: 'block',
      }}>
        <div className="relative w-[1149px] h-screen overflow-hidden z-0">
          <Image
            src="/fusion_logo.png"
            alt="logo"
            fill
            className="object-cover object-[75%_25%]"
          />
        </div>
        <div className="absolute top-[17.72vh] left-1/2 z-0">
          <div className="flex flex-col items-center">
            <Image
              src="/title-XL.png"
              alt="FU Stamps Title"
              width={731}
              height={50}
              className="mb-[25px]"
            />
            <div className="border-1 w-[588px] h-[504px] border-r-4 border-b-6 border-black bg-white/90 flex flex-col items-center justify-center">
              <h1 className="text-black text-[clamp(1rem,40px,3rem)] mb-[3vh]">REGISTRATION</h1>
              <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">

                <div className="flex flex-col mb-[48px] w-[280px]">
                  <label htmlFor="email" className={` text-black text-xs mb-[8px]`}>ENTER EMAIL</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    required
                    className={` border border-black rounded-full bg-lightyellow px-[1vw] py-[8px] text-black`}
                  />
                </div>

                <div className={`flex flex-col ${valid ? "mb-[48px]": "mb-[12px]"} w-[280px]`}>
                  <label htmlFor="password" className={` text-black text-xs mb-[8px]`}>ENTER PASSWORD</label>
                  <input
                  //changed input type to password on some secure shi
                    type="password"
                    id="password"
                    name="password"
                    required
                    onChange={(e) => handlePasswordChange(e)}
                    className={` border border-black rounded-full bg-lightyellow px-[1vw] py-[8px] text-black tracking-wider`}
                  />
                </div>
                {!valid && (
                  <p className="text-red-500 text-[clamp(0.75rem,2.5vw,1rem)] mb-10 text-center max-w-[70%]">
                    Password must be at least 8 characters, include an uppercase
                    letter, lowercase letter, and number.
                  </p>
                )}
                <button
                  type="submit"
                  className={` btn bg-[#FBCA29] text-black hover:cursor-pointer w-[115px] h-[56px] border-1 border-b-4 border-r-2 px-[24px] text-lg font-semibold`}
                >
                  REGISTER
                </button>
              </form>
 
              <a href='/login' className={`underline text-black pt-10`}>Have an account?</a>
            </div>
          </div>
        </div>
    </main>
  );
}
