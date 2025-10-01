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
        <div className="relative w-[400px] h-[250px]">
            <Image
              src={design}
              alt="Photo"
              className="object-cover rounded-lg"
              />
            <div className="absolute inset-0 flex items-center justify-center">
              {/* please tinker with the width and height. 
                  please also make 10 copies for each stamp date, and comment the offsets for each date in the comments of your github request.
              
              */}
              <p className="text-black text-xl font-bold px-4 py-2 rounded">
                mm-dd
              </p>
            </div>
    </div>
    )
}