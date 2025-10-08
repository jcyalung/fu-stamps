"use client"

import axios, { AxiosError } from "axios";
import Stampcard from "@/components/Stampcard";
import type { StampProps } from "@/types/types";
import { useState, useEffect } from "react";
export default function StampcardPage() {
  const [stamps, setStamps] = useState<StampProps>({});
  const [cardID, setCardID] = useState<string | null>(null);
  useEffect(() => {
    const fetchStamps = async () => {
      const { data } = await axios.get("/api/getStampCard");
      setStamps(data.message);
    };
    fetchStamps();
  }, []);
  return (
    <main>
        <Stampcard stamps={stamps}/>
    </main>
  );
}
