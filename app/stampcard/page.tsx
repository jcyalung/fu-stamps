"use client"

import axios, { AxiosError } from "axios";
import Stampcard from "@/components/Stampcard";
import type { StampType, StampProps } from "@/types/types";

const stamp : StampType = {id:1, date:'mm-dd'};
const stamps : StampProps = [stamp];
export default function Home() {

  return (
    <main>
        <Stampcard stamps={stamps}/>
    </main>
  );
}
