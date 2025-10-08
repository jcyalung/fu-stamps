"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios, { AxiosError } from 'axios';
import { useRouter } from "next/navigation";

export default function Verify() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [success, setSuccess] = useState<"verifying" | "success" | "error" | "unauthorized">("verifying");
  const [error, setError] = useState("");
  
  useEffect(() => {
      if(!token) {
          setSuccess("error");
          setError("No token provided");
          return;
      }
      const verifyToken = async () => {
          try {
              const response = await axios.post('/api/auth/verifyEmail', { verification_code : token });
              console.log(response);
              if(response.status == 200) {
                  setSuccess("success");
              }
              else {
                  setSuccess("error");
                  setError(response.data.message || "Invalid token.");
              }
          } catch(err : any) {
              const { response } = err;
              const { error } = response!.data!;
              const { status } = response!;
              if(status != 401) {
                setSuccess("unauthorized");
              }
              else {
                setSuccess("error");
              }
              setError(error || "Something went wrong.");
          }
      }
    verifyToken();
  }, [token]);
  
  // redirect them in 1 second
  useEffect(() => {
    if (success === "success") {
      const timer = setTimeout(() => {
        router.push("/");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [router]);
  
  const resendEmail = async () => {
    try {
      const response = await axios.get(`/api/auth/resendEmail?token=${token}`);
    } catch(err : any) {
      const error = err as AxiosError;
    }
  }
  return (
       <div className="text-black flex flex-col items-center justify-center min-h-screen gap-4">
          {success === "verifying" && <p>Verifying your account...</p>}
          {success === "success" && <p className="text-green-600">Your account has been verified! Redirecting you to the homepage...</p>}
          {success === "unauthorized" && <p className="text-red-600">{error}</p>}
          {success === "error" && (
            <div className="flex flex-col items-center gap-2">
              <p className="text-red-600">{error}</p>
              <button
                onClick={resendEmail}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Resend Verification Email
              </button>
            </div>
          )}
        </div>
      );
}