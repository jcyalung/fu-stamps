import { montserrat_global as montserrat } from "@/constants";
export function StampProto(){
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); };
    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center bg-white text-black w-[542px] h-[210px] border-1 border-b-6 border-r-4 p-[32px]">
            <div className="flex flex-col gap-y-[8px]">
                <label htmlFor="stamp" className={`text-xs ${montserrat.className} font-light `}>
                    ENTER THE "WORD OF THE DAY"
                </label>
                <div className="flex w-[478px] h-[36px] border-1 rounded-4xl bg-lightyellow items-center">
                    <input
                    type="text"
                    id="stamp"
                    name="stamp"
                    className={`ml-[4px] h-[20px] input rounded-full bg-lightyellow focus:outline-none ${montserrat.className} font-light`}
                    />
                </div>
            </div>
            <div>
                <button type='submit' className={`btn h-[56px] w-[161px] mt-[20px] border-b-4 border-r-2 rounded-none bg-amber-400 px-[24px] py-[16px] text-lg text-black ${montserrat.className}`}>
                    SET WORD
                </button>
            </div>
        </form>
    )
}

export function StampCardProto() {
  const stamps = Array(10).fill("This Long Word");

  return (
    <div className="bg-yellow-400 p-6 rounded-2xl shadow-lg w-[300px]">
        <p className={`${montserrat.className}`}>this is the stampcard proto</p>
    </div>
  );
}

export function HowItWorks() {
  return (
    <div className={`${montserrat.className} flex flex-col items-center bg-white text-black w-[960px] h-[580px] border-1 border-b-6 border-r-4 p-[32px]`}>
      <h2 className={`${montserrat.className} text-3xl font-bold drop-shadow-md`}>HOW IT WORKS</h2>
      <ol className={`${montserrat.className} space-y-4 text-black mt-10`}>
        <li className='italic'><span className="font-semibold">Step 1:</span> Go to study hours online or in-person</li>
        <li className='italic'><span className="font-semibold">Step 2:</span> Log into your FU-Stamps account</li>
        <li className='italic'><span className="font-semibold">Step 3:</span> Enter the “Word of the Day” or check in with a director</li>
        <li className='italic'><span className="font-semibold">Step 4:</span> Collect 10 stamps → claim your prize (QR code coupon)</li>
      </ol>
    </div>
  );
}