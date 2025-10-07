import type { StampType, StampProps } from "@/types/types";
import Image from "next/image";
import design from "@/components/images/design-stampcard.png";

export default function Stampcard({ stamps }: StampProps) {
  return (
    <div className="relative w-[28vw] h-auto">
      <Image
        src={design}
        alt="Stamp Card Design"
        className="object-cover rounded-lg"
      />

      {/* stamps 1–5 */}
      <div className="absolute left-[2vw] w-[24vw] bottom-[12vw] flex flex-row gap-[1.26vw]">
        {stamps.slice(0, 5).map((stamp) => (
          <p
            key={stamp.id}
            className="text-black italic text-[.9vw] w-[3.8vw] text-center font-bold rounded h-[2vw] flex items-center justify-center"
          >
            {stamp.date}
          </p>
        ))}
      </div>

      {/* stamps 6–10 */}
      <div className="absolute left-[2vw] w-[24vw] bottom-[7vw] flex flex-row gap-[1.26vw]">
        {stamps.slice(5, 10).map((stamp) => (
          <p
            key={stamp.id}
            className="text-black italic text-[.9vw] w-[3.8vw] text-center font-bold rounded h-[2vw] flex items-center justify-center"
          >
            {stamp.date}
          </p>
        ))}
      </div>
    </div>
  );
}
