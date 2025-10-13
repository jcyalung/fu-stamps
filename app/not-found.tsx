import { HOVER_STYLE } from "@/constants";
import Image from "next/image";
export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col text-black bg-lightyellow">
            <div className="relative w-[60vw] h-screen overflow-hidden z-0">
                <Image
                  src="/fusion_logo.png"
                  alt="logo"
                  fill
                  className="object-cover object-[75%_25%]"
                />
            </div>
            <div className="absolute top-[17.72vh] left-1/2 z-0 flex flex-col items-right">
                <div className="w-[50vw]">
                    <Image
                      src="/title-xl.png"
                      alt="FU Stamps Title"
                      width={731}
                      height={50}
                      className="mb-[25px]"
                    />
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-center font-bold text-[7vh]'>404 - NOT FOUND</h1>
                    <p className="mt-[2vh] flex flex-col text-[3vh] italic text-center justify-center items-center">AY NAKU! THE PAGE YOU'RE LOOKING FOR DOES NOT EXIST.</p>
                    <a href='/'><button className={`${HOVER_STYLE} btn mt-[8vh] flex flex-col bg-yellow-500 text-black text-[3vh] italic text-center justify-center items-center`}>RETURN TO HOMEPAGE</button></a>
                </div> 
            </div>
        </main>
    );
}