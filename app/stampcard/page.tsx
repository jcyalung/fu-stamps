"use client"

import axios, { Axios, AxiosError } from "axios";
import Stampcard from "@/components/Stampcard";
import type { StampProps } from "@/types/types";
import { useState, useEffect } from "react";
export default function StampcardPage() {
  const [stamps, setStamps] = useState<StampProps | null>(null);
  const [cardID, setCardID] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchStamps = async () => {
      try {
        const { data } = await axios.get("/api/getStampCard");
        setStamps(data.message);
      }
      catch(e : any) {
        setStamps(null);
      }
    };
    fetchStamps();
  }, []);

  return (
    <main>
      <div className='flex justify-center items-center min-h-[80vh]'>
        <div className='relative group w-[28vw] h-auto'>
          <Stampcard stamps={stamps}/>
        </div>
      </div>
    </main>
  );
}
