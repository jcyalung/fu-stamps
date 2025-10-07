import HOWITWORKS from "@/components/root/HOW IT WORKS.png"; 
import Image from "next/image";
export function StampProto(){
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); };
    return (
        <form onSubmit={handleSubmit} className="relative flex flex-col items-center bg-white text-black w-[542px] h-[210px] border-1 border-b-6 border-r-4 p-[32px]">
            <h2 className="absolute right-[15px] top-[15px] text-black">&#10006;</h2>
            <div className="flex flex-col gap-y-[8px]">                
                <label htmlFor="stamp" className={`text-xs font-light `}>
                    ENTER THE "WORD OF THE DAY"
                </label>
                <div className="flex w-[478px] h-[36px] border-1 rounded-4xl bg-lightyellow items-center">
                    <input
                    type="text"
                    id="stamp"
                    name="stamp"
                    placeholder="MAGIC WORD"
                    className={`ml-[4px] h-[20px] input rounded-full bg-lightyellow focus:outline-none font-light placeholder-black`}
                    />
                </div>
            </div>
            <div>
                <button type='submit' className={`btn h-[56px] w-[161px] mt-[20px] border-b-4 border-r-2 rounded-none bg-amber-400 py-[16px] text-lg text-black`}>
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
    <div className={`flex flex-col items-center bg-white text-black w-[50vw] h-[30vw] max-w-[960px] max-h-[580px] border-1 border-b-6 border-r-4 p-[32px] opacity-90`}>
      <Image src={HOWITWORKS} alt="How It Works" className="w-[60%] h-auto" />
      <ol className={`space-y-10 text-black mt-4 text-[clamp(1rem,2vw,1.5rem)] uppercase font-extralight`}>
        <li className='italic'><span>Step 1:</span> Go to study hours online or in-person</li>
        <li className='italic'><span>Step 2:</span> Log into your FU-Stamps account</li>
        <li className='italic'><span>Step 3:</span> Enter the “Word of the Day” or check in with a director</li>
        <li className='italic'><span>Step 4:</span> Collect 10 stamps → claim your prize (QR code coupon)</li>
      </ol>
    </div>
  );
}