import HOWITWORKS from "@/components/root/HOW IT WORKS.png"; 
import Image from "next/image";
import design from "@/components/images/design-stampcard.png";
import template from "@/components/images/stampcard-template.png";
import { HOVER_STYLE } from '@/constants';
import { useState } from "react";
import type { StampProps } from "@/types/types";

export function StampProto(){
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); };
    return (
      <form 
        onSubmit={handleSubmit} 
        className="relative flex flex-col items-center bg-white text-black
                   w-[clamp(200px,80vw,542px)] max-w-[90vw] h-auto max-h-[90vh]
                   border border-b-6 border-r-4 p-[clamp(12px,3vw,24px)] rounded-lg
                   overflow-y-auto"
      >
        {/* Close button */}
        <h2 className="absolute right-[clamp(8px,2vw,15px)] top-[clamp(8px,2vw,15px)] 
                       text-black text-[clamp(1rem,3vw,1.5rem)] cursor-pointer">
          &#10006;
        </h2>

        {/* Input Section */}
        <div className="flex flex-col gap-y-[clamp(4px,1vw,8px)] w-full">
          <label htmlFor="stamp" className="text-[clamp(0.7rem,2vw,1rem)] font-light">
            ENTER THE "WORD OF THE DAY"
          </label>

          <div className="flex w-full max-w-full h-[clamp(30px,6vw,36px)] border rounded-full bg-lightyellow items-center px-2">
            <input
              type="text"
              id="stamp"
              name="stamp"
              placeholder="MAGIC WORD"
              className="flex-1 h-[clamp(16px,4vw,20px)] w-full max-w-full bg-lightyellow focus:outline-none font-light placeholder-black rounded-full px-2"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-[clamp(12px,3vw,20px)] w-full flex justify-center">
          <button 
            type='submit' 
            className="btn h-[clamp(40px,10vw,56px)] w-[clamp(120px,50%,161px)]
                       border-b-4 border-r-2 rounded-none bg-amber-400 py-[clamp(8px,2vw,16px)]
                       text-[clamp(0.875rem,3vw,1.125rem)] font-semibold text-black"
          >
            ADD STAMP
          </button>
        </div>
      </form>

    )
}

type StampcardProps = {
  stamps: StampProps | null;
};
export function StampCardProto({ stamps }: StampcardProps) {
  const [showOverlay, setShowOverlay] = useState(false);

  // fall back to initial prop when SWR hasn't loaded yet
  const stampsToShow = stamps ?? null;

  const handleClick = async (e : number) => { console.log(`button clicked with ${e}`) }
  if (stampsToShow !== null) {
    return (
      <div
        className={`relative group w-[28vw] h-auto rounded-lg transition-all duration-300 
      ${stampsToShow && Object.keys(stampsToShow).length === 10 ? 'ring-20 ring-yellow-400 ring-offset-2 sparkle' : ''}`}>
        <Image
          src={design}
          alt="Stamp Card Design"
          className="object-cover rounded-lg"
        />
        {/* stamps 1–5 */}
        { stampsToShow ? 
        <div className="absolute left-[2vw] w-[24vw] bottom-[12vw] flex flex-row gap-[1.26vw]">
          {Object.entries(stampsToShow).slice(0, 5).map((stamp, index) => (
            <p
              key={index}
              className="text-black italic text-[.9vw] w-[3.8vw] text-center font-bold rounded min-h-[2.4vw] max-h-[4.2vw] flex items-center justify-center leading-tight break-words whitespace-normal overflow-hidden"
            >
              {stamp[1] ? `${stamp[0]}, ${String(stamp[1]).substring(5)}` : ""}
            </p>
          ))}
        </div>
        : null}


        {/* stamps 6–10 */}
        { stampsToShow ?
        <div className="absolute left-[2vw] w-[24vw] bottom-[7vw] flex flex-row gap-[1.26vw]">
          {Object.entries(stampsToShow).slice(5, 10).map((stamp,index) => (
            <p
              key={index}
              className="text-black italic text-[.9vw] w-[3.8vw] text-center font-bold rounded min-h-[2.4vw] max-h-[4.2vw] flex items-center justify-center leading-tight break-words whitespace-normal overflow-hidden"
            >
              {stamp[1] ? `${stamp[0]}, ${String(stamp[1]).substring(5)}` : ""}
            </p>
          ))}
        </div>
         :
        null}
        {/* Hover Overlay */}
        <div
          className={`
            absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg text-white font-semibold text-[1.1vw]
            transition-opacity duration-300
            ${showOverlay ? "opacity-100" : "opacity-0"}
            md:opacity-0 md:group-hover:opacity-100
          `}
          onClick={() => {
            // toggle overlay on mobile; if overlay closing also reset add state
            setShowOverlay(!showOverlay);
          }} // toggle on mobile
        >
            <button
              type='submit'
              className={`btn transform transition-all duration-300
              ${showOverlay ? "scale-105 opacity-100" : "scale-95 opacity-90"}
              md:group-hover:scale-105 md:group-hover:opacity-100 border-[0.5vw] rounded-lg p-[0.2vw] bg-yellow-300 text-black border-yellow-300 cursor-pointer`}
              onClick={(ev) => {ev.stopPropagation();}}
            >
              {Object.entries(stampsToShow).length === 10 ? "Redeem your reward!" : "Add a Stamp"}
            </button>
        </div>
      </div>
    );
  }
  else {
    return (
  <div 
  className={`relative group w-[28vw] h-auto rounded-lg transition-all duration-300`}>
        <h1 className='text-[2.3vw] text-black text-center mb-[3vh]'> It looks like you don't have a stampcard yet. Want to add one? </h1>
          <button 
            className={`relative text-black cursor-pointer rounded-lg transition-opacity duration-300 focus:outline-2 items-center active:shadow-lg active:shadow-black focus:outline-offset-2 active:bg-gray-500 text-[20vh] ${HOVER_STYLE}`}
            onClick={() => handleClick(0)}
            >
            <p className='absolute inset-0 flex justify-center items-center text-center text-[clamp(1rem,10vw,4rem)] font-bold z-10'>+</p>
            <Image
              src={template}
              alt="Stamp Card Template"
              className="object-cover rounded-lg transition-shadow "
              />
          </button>
      </div>
    )
  }
}

export function HowItWorks() {
  return (
    <div className={`flex flex-col items-center bg-white text-black 
                w-[clamp(280px,45vw,50vw)] min-h-[clamp(300px,40vw,30vw)] 
                max-w-[960px] h-auto border border-b-6 border-r-4 p-[clamp(16px,2vw,32px)] opacity-90 rounded-lg`}>
      <Image src={HOWITWORKS} alt="How It Works" className="w-[clamp(50%,30vw,60%)] h-auto mb-[clamp(12px,2vw,16px)]" />
      <ol className={`space-y-[clamp(8px,2vw,10px)] text-black mt-[clamp(8px,2vw,16px)] 
                  text-[clamp(0.75rem,2vw,1.5rem)] uppercase font-extralight`}>
        <li className='italic text-[clamp(0.75rem,2vw,1.5rem)] pt-1'><span>Step 1:</span> Go to study hours online or in-person</li>
        <li className='italic text-[clamp(0.75rem,2vw,1.5rem)] pt-1'><span>Step 2:</span> Log into your FU-Stamps account</li>
        <li className='italic text-[clamp(0.75rem,2vw,1.5rem)] pt-1'><span>Step 3:</span> Enter the “Word of the Day” or check in with a director</li>
        <li className='italic text-[clamp(0.75rem,2vw,1.5rem)] pt-1'><span>Step 4:</span> Collect 10 stamps → claim your prize (QR code coupon)</li>
      </ol>
    </div>
  );
}