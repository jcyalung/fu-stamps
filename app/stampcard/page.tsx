"use client"

import axios, { AxiosError } from "axios";
import Stampcard from "@/components/Stampcard";
import type { StampType, StampProps } from "@/types/types";

const exStamp: StampType = {id:1, date:'09-28'};
const stamp : StampType = {id:1, date:'mm-dd'};
const stamps : StampType[] = [exStamp, stamp, stamp, stamp, stamp, stamp, stamp, stamp, stamp, stamp];
export default function Home() {

  return (
    <main>
        <Stampcard stamps={stamps}/>
    </main>
  );
}
