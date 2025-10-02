'use client';
import { useState } from "react";

export default function Stamp(){
    // fade in and out the status message
    const [ status, setStatus ] = useState("hidden");
    const [ fade, setFade ] = useState(false);   

    const [word, setWord] = useState("");
    const [message, setMessage] = useState("");

    const handleSetWord = () => {
        setStatus("flex");
        setFade(true);

        setMessage(`THE WORD OF THE DAY "${word}" HAS BEEN SET`);

        setTimeout(() => {
            setFade(false);
        }, 3000);
    }

    return (
        <div className="flex flex-col items-center bg-white text-black w-[542px] h-[210px] border-1 border-b-6 border-r-4 p-[32px]">
            <div className="flex flex-col gap-y-[8px]">
                <div className={`text-xs font-light`}>
                    ENTER THE "WORD OF THE DAY"
                </div>
                <div className="flex w-[478px] h-[36px] border-1 rounded-4xl bg-lightyellow items-center">
                    <input onChange={(e) => setWord(e.target.value)} type="text" className={`ml-[4px] h-[20px] input rounded-full bg-lightyellow focus:outline-none font-light`} />
                </div>
            </div>
            <div>
                <button onClick={handleSetWord} className={`btn h-[56px] w-[161px] mt-[20px] border-b-4 border-r-2 rounded-none bg-amber-400 px-[24px] py-[16px] text-lg text-black`}>
                    SET WORD
                </button>
            </div>
            {/* in the future this will be conditionally rendered based on the token */}
            <div className={status + `italic bg-amber-400 w-[685px] mt-[90px] p-[24px] justify-center border-1 border-b-6 border-r-4 text-[26px]
                            transition-all ease-in-out duration-500 ${fade ? "opacity-100" : "opacity-0"}`}>
                {message}
            </div>
            <div className={`hidden italic bg-amber-400 w-[740px] h-[87px] mt-[90px] p-[24px] justify-center border-1 border-b-6 border-r-4 text-[26px]`}>
                THE WORD OF THE DAY "{word}" FAILED TO BE SET
            </div>
        </div>
    )
}
