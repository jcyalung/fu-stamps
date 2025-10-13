"use client"
import type { StampProps } from "@/types/types";
import Image from "next/image";
import design from "@/components/images/design-stampcard.png";
import template from "@/components/images/stampcard-template.png";
import { useState } from "react";
import { HOVER_STYLE } from "@/constants";
import axios, { AxiosError } from "axios";
import toast from 'react-hot-toast';
import useSWR, { mutate } from 'swr';
type StampcardProps = {
  stamps: StampProps | null;
};

const fetcher = (url: string) => axios.get(url).then(res => res.data.message);
export default function Stampcard({ stamps }: StampcardProps) {
  const [loading, setLoading]         = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isAdding, setIsAdding]       = useState(false);
  const [stampInput, setStampInput]   = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  // Use SWR to fetch the stamp card. The API returns the stamps object as `message`.
  const { data: displayStamps, error, isLoading } = useSWR<StampProps | null>(
    '/api/getStampCard',
    fetcher
  );
  // fall back to initial prop when SWR hasn't loaded yet
  const stampsToShow = displayStamps ?? stamps ?? null;

  const handleClick = async (e : number, input? : string) => {
    if(loading) return;
    setLoading(true);
    console.log(`button clicked with ${e}`)
    try {
      // create a stampcard
      if(e == 0) {
        const response = await axios.get('/api/createStampCard');
        toast.success('Card created!');
        // revalidate the getStampCard cache so UI updates
        await mutate('/api/getStampCard');
      }
      // stamp my card
      else if(e == 1) {
        console.log('adding stamp');
        console.log(stampsToShow);
        const response = await axios.post('/api/addStamp', { stamp: input });
        toast.success('Stamp added for today!');
        // revalidate the getStampCard cache so UI updates
        await mutate('/api/getStampCard');
      }
      else if(e == 2) {
        console.log('claiming reward');
        const response = await axios.get('/api/reward');
        toast.success('Reward sent! Check your inbox.');
        // revalidate the getStampCard cache so UI updates
        await mutate('/api/getStampCard');
      }
    } catch(e : any) {
      const { response } = e as AxiosError;
      const errorMessage =
        response && response.data && typeof (response.data as any).message === "string"
          ? (response.data as any).message
          : "An error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }
  if (stampsToShow !== null) {
    console.log(Object.entries(stampsToShow));
    return (
      <div
        className={`relative w-[28vw] h-auto rounded-lg transition-all duration-300  
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
            if (showOverlay) {
              setIsAdding(false);
              setStampInput('');
            }
          }} // toggle on mobile
        >
          {/* If user is in 'adding' mode show input + actions, otherwise show main button */}
          {isAdding ? (
            <div className="flex items-center gap-2">
              <input
                value={stampInput}
                onChange={(e) => setStampInput(e.target.value)}
                className="p-2 rounded bg-white text-black text-[.9vw]"
                placeholder="Enter stamp word"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                onClick={async (ev) => {
                  ev.stopPropagation();
                  await handleClick(1, stampInput);
                  setIsAdding(false);
                  setStampInput('');
                }}
                className="bg-yellow-400 text-black px-3 py-1 rounded cursor-pointer"
              >
                Submit
              </button>
              <button
                onClick={(ev) => {
                  ev.stopPropagation();
                  setIsAdding(false);
                  setStampInput('');
                }}
                className="bg-gray-600 text-white px-3 py-1 rounded cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className={`transform transition-all duration-300
              ${showOverlay ? "scale-105 opacity-100" : "scale-95 opacity-90"}
              md:group-hover:scale-105 md:group-hover:opacity-100 border-[0.5vw] rounded-lg p-[0.2vw] bg-yellow-300 text-black border-yellow-300 cursor-pointer`}
              onClick={(ev) => {
                ev.stopPropagation();
                // if card full they will redeem, otherwise start adding flow
                if (Object.entries(stampsToShow).length === 10) {
                  setShowConfirm(true);
                } else {
                  setIsAdding(true);
                  setShowOverlay(true);
                }
              }}
            >
              {Object.entries(stampsToShow).length === 10 ? "Redeem your reward!" : "Add a Stamp"}
            </button>
          )}
        </div>
        <div
  className={`
    fixed inset-0 flex items-center justify-center z-50
    transition-opacity duration-300
    ${showConfirm ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
    bg-black/50
  `}
>
  <div
    className={`
      bg-white rounded-lg p-6 w-[80%] sm:w-[400px] text-center text-black shadow-lg transform transition-transform duration-300
      ${showConfirm ? "scale-100" : "scale-90"}
    `}
  >
    <h2 className="text-[clamp(1rem,6vh,2rem)] font-bold mb-4">Confirm Reward</h2>
    <p className="mb-[3vh] text-[clamp(0.25rem,3vh,1rem)]">Are you sure you want to redeem your reward?</p>
    <p className="mb-[4vh] text-[clamp(0.25rem,3vh,1rem)] text-red-500">This action will delete your current card.</p>
    <div className="flex justify-center gap-4">
      <button
        className="px-4 py-2 text-[clamp(0.75rem,6vh,1.5rem)] bg-green-500 rounded hover:bg-green-600 cursor-pointer"
        onClick={async () => {
          setShowConfirm(false);
          await handleClick(2); // Redeem action
        }}
      >
        Yes
      </button>
      <button
        className="px-4 py-2 text-[clamp(0.75rem,6vh,1.5rem)] bg-red-500 rounded hover:bg-red-600 cursor-pointer"
        onClick={() => setShowConfirm(false)}
      >
        Cancel
      </button>
    </div>
  </div>
</div>

      </div>
    );
  }
  else {
    return (
      <div 
      className={`relative w-[28vw] h-auto rounded-lg transition-all duration-300`}>
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
