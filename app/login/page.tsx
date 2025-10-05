"use client"
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { TABLES } from "@/constants";
const supabase = createClientComponentClient();
export default function LoginPage() {
  const { push } = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // added user id and verification fields to the payload
    const payload = {
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email : event.currentTarget.email.value, password: event.currentTarget.password.value });

    try {
      const response = await axios.post("/api/auth/login", payload);
      if (response.status === 200) {
        // alerts the user that login was successful
        alert("Login successful");
        const { data: userData } = await supabase
        .from(TABLES.USERS)
        .select('verification')
        .eq('id', data.user?.id)
        .single();
        push('/');
      }
    } catch (e : any) {
      const error = e as AxiosError;
      console.log(error);
      const { response } = error;
      // displays error message and error code
       if (error.message) {
        const { message } = response?.data as any;
        alert(message + '\n' + error.message || "An unknown error occurred.");
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
              src="/title.png"
              alt="FU Stamps Title"
              width={731}
              height={50}
              className="mb-[25px]"
            />
            <div className="border-1 w-[588px] h-[504px] border-r-4 border-b-6 border-black bg-white/90 flex flex-col items-center justify-center">
              
              <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">

                <div className="flex flex-col mb-[48px] w-[280px]">
                  <label htmlFor="email" className={` text-black text-xs mb-[8px]`}>ENTER EMAIL </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    required
                    className={` border border-black rounded-full bg-lightyellow px-[15px] py-[8px] text-black`}
                  />
                </div>

                <div className="flex flex-col mb-[48px] w-[280px]">
                  <label htmlFor="password" className={` text-black text-xs mb-[8px]`}>ENTER PASSWORD </label>
                  <input
                  //changed input type to password on some secure shi
                    type="password"
                    id="password"
                    name="password"
                    required
                    className={` border border-black rounded-full bg-lightyellow px-[15px] py-[8px] text-black tracking-wider`}
                  />
                </div>

                <button
                  type="submit"
                  className={` bg-[#FBCA29] text-black hover:cursor-pointer w-[115px] h-[56px] border-1 border-b-4 border-r-2 px-[24px] text-lg font-semibold`}
                >
                  LOGIN
                </button>
              </form>
 
              <p className= {` text-black pt-10`}>Don't have an account?</p>
              <button className={` bg-[#FBCA29] text-black hover:cursor-pointer w-[115px] h-[56px] border-1 border-b-4 border-r-2 text-lg font-bold text-center`} onClick={() => {push('/register')}}> REGISTER</button>
            </div>
          </div>
        </div>
    </main>
  );
}
