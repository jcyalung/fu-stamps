import type { StampType, StampProps } from "@/types/types";
import Image from "next/image";
import design from '@/components/images/design-stampcard.png';
/*

StampType is defined as:
export type StampType = {
  id: number;
  date: string;
};

StampProps is defined as:
export type StampProps = {
    stamps: StampType[];
}
*/
export default function Stampcard({stamps} : StampProps) {
    return( 
        <div className="relative w-[28vw] h-auto">
            <Image
              src={design}
              alt="Photo"
              className="object-cover rounded-lg"
              />
            <div className="absolute left-[2vw] w-[24vw] bottom-[12vw] flex flex-row justify-between">
              {/* please tinker with the width and height. 
                  please also make 10 copies for each stamp date, and comment the offsets for each date in the comments of your github request.
              
              */}
              <p className="text-black text-[.6vw] w-[3.8vw] text-center font-bold px-4 rounded border-1 h-[2vw]">
                mm-dd
              </p>
              <p className="text-black text-[.6vw] w-[3.8vw] text-center font-bold px-4 rounded border-1 h-[2vw]">
                mm-dd
              </p>
              <p className="text-black text-[.6vw] w-[3.8vw] text-center font-bold px-4 rounded border-1 h-[2vw]">
                mm-dd
              </p>
              <p className="text-black text-[.6vw] w-[3.8vw] text-center font-bold px-4 rounded border-1 h-[2vw]">
                mm-dd
              </p>
              <p className="text-black text-[.6vw] w-[3.8vw] text-center font-bold px-4 rounded border-1 h-[2vw]">
                mm-dd
              </p>
            </div>
    </div>
    )
}