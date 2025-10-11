import HOWITWORKS from "@/components/root/HOW IT WORKS.png"; 
import Image from "next/image";
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

export function StampCardProto({color='yellow-400', claim=true}) {
  const stamps = Array.from({length: 10}).map((_, index) => {
    return (
      <div key={index} className="w-[257px] h-[22px] flex justify-center">
        <div className="flex flex-row gap-[32px]">
          <div className="flex items-center justify-center rounded-4xl border-1 bg-lightyellow font-montserrat text-[10px] text-black px-[10px]">WORD</div>
          <div className="flex items-center justify-center rounded-4xl border-1 bg-lightyellow font-montserrat w-[98px] text-xs text-black">2025-07-12</div>
        </div>
      </div>
    )}
  );

  return (
    <div className={`relative flex items-center bg-${color} shadow-lg w-[344px] h-[580px] border-1 border-b-6 border-r-4 border-black flex flex-col items-center`}>
        <h2 className="absolute right-[15px] top-[15px] text-black">&#10006;</h2>
        <div className="flex flex-col gap-[25px] mt-[46px]">{stamps}</div>
        { claim ? 
        <div className="bg-lightyellow w-[166px] h-[37px] flex justify-center items-center text-black font-montserrat text-lg font-semibold border-1 border-b-4 border-r-2 mt-[25px]">
          CLAIM PRIZE
        </div>
        :
        <div className="bg-[#FBCA29] w-[166px] h-[37px] flex justify-center items-center text-black font-montserrat text-lg font-semibold border-1 border-b-4 border-r-2 mt-[25px]">
          ADD STAMP
        </div>
        }

    </div>
  );
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