import type { StampProps } from "@/types/types";
import Image from "next/image";
import design from "@/components/images/design-stampcard.png";

type StampcardProps = {
  stamps: StampProps;
};

export default function Stampcard({ stamps }: StampcardProps) {
  return (
    <div 
    className={`relative w-[28vw] h-auto rounded-lg transition-all duration-300  
    ${stamps && Object.keys(stamps).length === 10 ? 'ring-20 ring-yellow-400 ring-offset-2 sparkle' : ''}`}>
      <Image
        src={design}
        alt="Stamp Card Design"
        className="object-cover rounded-lg"
      />
      {/* stamps 1–5 */}
      { stamps ? 
      <div className="absolute left-[2vw] w-[24vw] bottom-[12vw] flex flex-row gap-[1.26vw]">
        {Object.entries(stamps).slice(0, 5).map((stamp, index) => (
          <p
            key={index}
            className="text-black italic text-[.9vw] w-[3.8vw] text-center font-bold rounded h-[2vw] flex items-center justify-center"
          >
            {stamp[1].substring(5)}
          </p>
        ))}
      </div>
      : null}
      

      {/* stamps 6–10 */}
      { stamps ?
      <div className="absolute left-[2vw] w-[24vw] bottom-[7vw] flex flex-row gap-[1.26vw]">
        {Object.entries(stamps).slice(5, 10).map((stamp,index) => (
          <p
            key={index}
            className="text-black italic text-[.9vw] w-[3.8vw] text-center font-bold rounded h-[2vw] flex items-center justify-center"
          >
            {stamp[1].substring(5)}
          </p>
        ))}
      </div>
       :
      null}
      
    </div>
  );
}
