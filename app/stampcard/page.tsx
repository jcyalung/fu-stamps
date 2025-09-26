"use client"

import axios, { AxiosError } from "axios";
import Stampcard from "@/components/Stampcard";
import type { StampType, StampProps } from "@/types/types";

const stamp : StampType = {id:1, date:'mm-dd'};
const stamps : StampType[] = [stamp];
export default function Home() {

  return (
    <main style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#FFFBEF',
      display: 'block',
      padding: '80px',
      }} >
      
      <Stampcard stamps={stamps}/>
        
    </main>
  );
}
