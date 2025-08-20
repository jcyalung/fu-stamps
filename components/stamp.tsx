import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400"],
});

export default function Stamp(){
    return (
        <div className="flex flex-col items-center bg-white text-black w-[542px] h-[210px] border-1 border-b-6 border-r-4 p-[32px]">
            <div className="flex flex-col gap-y-[8px]">
                <div className={`text-sm ${montserrat.className} font-light `}>
                    ENTER MAGIC WORD
                </div>
                <div className="flex w-[478px] h-[36px] border-1 rounded-4xl bg-lightyellow items-center">
                    <input type="text" placeholder="magic word" className={`ml-[4px] h-[20px] input rounded-full bg-lightyellow focus:outline-none ${montserrat.className} font-light placeholder-black`} />
                </div>
            </div>
            <div>
                <button className={`btn h-[56px] w-[161px] mt-[20px] border-b-4 border-r-2 rounded-none bg-amber-400 px-[24px] py-[16px] text-lg text-black ${montserrat.className}`}>
                    SET WORD
                </button>
            </div>
        </div>
    )
}