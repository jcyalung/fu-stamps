"use client";
import { HOVER_STYLE } from "@/constants";
import Image from "next/image";
import { useState, useEffect } from "react";

// async validator: check if image exists before rendering
async function validateImageUrl(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
}

export default function Headcard({name, image, position, github} : { name? : string, image? : string, position? : string, github? : string }) {
    const displayName = name || "Name";
    const displayImage = image || "/fallback.png";
    const displayPosition = position || "N/A";
    const displayGithub = github || '/';
    const [imgSrc, setImgSrc] = useState("/fallback.png");

    useEffect(() => {
    async function checkImage() {
        const exists = await validateImageUrl(image!);
        if (exists || image?.startsWith('/')) {
          setImgSrc(image!);
        } else {
          console.warn("Invalid Supabase image — using fallback:", image);
          setImgSrc("/fallback.png");
        }
    }
    checkImage();
  }, [image]);

    //return(
    //    <div className="text-black flex flex-col items-center">
    //        <div className='relative overflow-hidden border-1 w-[15rem] h-[20rem] bg-[#FFFFFD] border-b-6 border-r-4 p-[32px]'>
    //            <Image 
    //                src={displayImage}
    //                alt={displayName}
    //                fill
    //                className="object-cover object-center"
    //                onError={(e) => (e.currentTarget.src = "/fallback.png")}
    //                />
    //        </div>
    //        <p className="text-center py-2 text-2xl font-bold">{displayName}</p>
    //        <p className="text-center text-2xl font-bold">{displayPosition}</p>
    //        <a className="items-center py-2" target='_blank' href={displayGithub}>
    //            <svg
    //              xmlns="http://www.w3.org/2000/svg"
    //              viewBox="0 0 24 24"
    //              fill="currentColor"
    //              className='w-[3rem] h-[3rem]'
    //            >
    //              <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 008 10.9c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.6 2.4 1.1 3 .8.1-.6.4-1.1.7-1.3-2.6-.3-5.4-1.3-5.4-5.7 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1a10.5 10.5 0 015.5 0c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.8 1.1 3 0 4.4-2.8 5.3-5.4 5.6.5.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0023.5 12c0-6.35-5.15-11.5-11.5-11.5z"/>
    //            </svg>
    //        </a>
    //    </div>
    //);
    return (
    <div className="text-black flex flex-col items-center">
      <div className="relative w-[15rem] h-[20rem] bg-[#FFFFFD] border-b-6 border-r-4 overflow-hidden rounded-lg">
        <Image
          src={imgSrc || "/fallback.png"}
          alt={name || "N/A"}
          fill
          className="object-cover object-center"
          onError={() => setImgSrc("/fallback.png")}
        />
      </div>

      <p className="text-center text-2xl font-bold mt-2 w-[15rem]">{name || "N/A"}</p>
      <p className="text-center text-xl w-[15rem]">{position || "N/A"}</p>
      { github ? <a className={`items-center py-2 transform transition-transform duration-300 hover:scale-105`} target='_blank' href={github || "/"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className='w-[3rem] h-[3rem]'
        >
          <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 008 10.9c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.6 2.4 1.1 3 .8.1-.6.4-1.1.7-1.3-2.6-.3-5.4-1.3-5.4-5.7 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1a10.5 10.5 0 015.5 0c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.8 1.1 3 0 4.4-2.8 5.3-5.4 5.6.5.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0023.5 12c0-6.35-5.15-11.5-11.5-11.5z"/>
        </svg>
    </a> : null }
    </div>
  );
}