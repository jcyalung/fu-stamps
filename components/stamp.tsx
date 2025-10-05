'use client';
import { HOVER_STYLE } from "@/constants";
import { useState } from "react";
import axios, { AxiosError } from "axios";

export default function Stamp(){
    // fade in and out the status message
    const [ status, setStatus ] = useState("hidden");
    const [ fade, setFade ] = useState(false);   

    const [word, setWord] = useState("");
    const [displayWord, setDisplayWord] = useState("");
    const [error, setError] = useState({message: null} as {message: string | null});
    const [message, setMessage] = useState("");

    const handleSetWord = async () => {
        try {
            setWord(word.toLowerCase());
            setDisplayWord(word);
            const response = await axios.get(`/api/setStamp?stamp=${word}`);
            if(response.status === 200) {
                setFade(true);
                setStatus("flex");
                setMessage(`THE WORD OF THE DAY "${word}" HAS BEEN SET`);
                setTimeout(() => {
                    setFade(false);
                }, 3000);
            }
        }
        catch(e : any) {
            const error = e as AxiosError;
            const { response } = error
            if(response) {
                const { data } = response as any;
                setError({message: data.error});
                //alert(data.error + '\n' + error.message || "An unknown error occurred.");
            }
        }
        finally {
            setFade(true);
            setStatus("flex");
            setTimeout(() => {
                    setFade(false);
                }, 3000);
            setWord('');
        }
    }

    return (
        <div className="flex flex-col items-center bg-white text-black w-[542px] h-[210px] border-1 border-b-6 border-r-4 p-[32px]">
            <div className="flex flex-col gap-y-[8px]">
                <div className={`text-xs font-light`}>
                    ENTER THE "WORD OF THE DAY"
                </div>
                <div className="flex w-[478px] h-[36px] border-1 rounded-4xl bg-lightyellow items-center">
                    <input maxLength={60} value={word} onChange={(e) => setWord(e.target.value)} type="text" className={`flex w-full text-center bg-transparent h-[20px] input rounded-full border-none focus:outline-none font-light`} />
                </div>
            </div>
            <div>
                <button onClick={handleSetWord} className={`${HOVER_STYLE} btn h-[56px] w-[161px] mt-[20px] border-b-4 border-r-2 rounded-none bg-amber-400 px-[24px] py-[16px] text-lg text-black`}>
                    SET WORD
                </button> 
            </div>
            {/* in the future this will be conditionally rendered based on the token */}
            { /* <div className={status + `italic bg-amber-400 w-[685px] mt-[90px] p-[24px] justify-center border-1 border-b-6 border-r-4 text-[26px]
                            transition-all ease-in-out duration-500 ${fade ? "opacity-100" : "opacity-0"}`}>
                {message}
            </div> */ }

            {error.message ? <div className={status + `italic text-center bg-amber-400 w-[685px] mt-[90px] p-[24px] justify-center border-1 border-b-6 border-r-4 text-[26px]
                            transition-all ease-in-out duration-500 ${fade ? "opacity-100" : "opacity-0"}`}>
                {`THE WORD OF THE DAY, "${displayWord}", FAILED TO BE SET:  `}
                <p className='mt-4'>{error.message}</p>
                </div> : <div className={status + `italic bg-amber-400 w-[685px] mt-[90px] p-[24px] justify-center border-1 border-b-6 border-r-4 text-[26px]
                            transition-all ease-in-out duration-500 ${fade ? "opacity-100" : "opacity-0"}`}>
                {message}
            </div>
            }
        </div>
    )
}
