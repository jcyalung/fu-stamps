import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
});

export default function Stamp(){
    const word = "SNOW"; // example word
    return (
        <div className="flex flex-col items-center bg-white text-black w-[542px] h-[210px] border-1 border-b-6 border-r-4 p-[32px]">
            <div className="flex flex-col gap-y-[8px]">
                <div className={`text-xs ${montserrat.className} font-light `}>
                    ENTER THE "WORD OF THE DAY"
                </div>
                <div className="flex w-[478px] h-[36px] border-1 rounded-4xl bg-lightyellow items-center">
                    <input type="text" className={`ml-[4px] h-[20px] input rounded-full bg-lightyellow focus:outline-none ${montserrat.className} font-light`} />
                </div>
            </div>
            <div>
                <button className={`btn h-[56px] w-[161px] mt-[20px] border-b-4 border-r-2 rounded-none bg-amber-400 px-[24px] py-[16px] text-lg text-black ${montserrat.className}`}>
                    SET WORD
                </button>
            </div>
            <div className={`flex ${montserrat.className} italic bg-amber-400 w-[685px] h-[87px] mt-[90px] p-[24px] justify-center border-1 border-b-6 border-r-4 text-[26px]`}>
                THE WORD OF THE DAY "{word}" HAS BEEN SET
            </div>
            <div className={`hidden ${montserrat.className} italic bg-amber-400 w-[740px] h-[87px] mt-[90px] p-[24px] justify-center border-1 border-b-6 border-r-4 text-[26px]`}>
                THE WORD OF THE DAY "{word}" FAILED TO BE SET
            </div>
        </div>
    )
}