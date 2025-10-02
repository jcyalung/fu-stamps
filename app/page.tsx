"use client"
import Image from "next/image";
import page_image from '@/components/images/landing_page_section.png';
import TitleTextbox from "@/components/TitleTextbox";
import ModalSelector from "@/components/root/ModalSelector";
import LogoBackground from "@/components/root/LogoBackground";
import RewardBox from '@/components/root/reward_box.png';
import { StampProto, StampCardProto, HowItWorks } from "@/components/root/Section2";
import { getUpcomingStudySession, HOVER_STYLE, STUDY_HOURS } from "@/constants";
const { dates, times } = STUDY_HOURS

export default function Home() {
  const details = getUpcomingStudySession();
  return (
    <main>
      <div className='flex flex-col items-center justify-center min-w-screen min-h-screen bg-lightyellow'>
        <Image
        src={page_image}
        alt="Fu-Stamps logo"
        width={1000}
        height={237}
        className='object-contain max-w-[90%] max-h-[50%]'
        priority
        />

        <a href='/stampcard' className={`transform transition-transform duration-300 hover:scale-105 mt-10 inline-flex px-[80px] py-[4px] justify-end items-center border border-black bg-[#FBCA29] shadow-[4px_6px_0_0_#000000]`}>
            <h1 
              className={`text-center text-white text-[48px] font-extrabold tracking-[3.2px] break-words font-['Verdana',monospace]`}
              style={{
                WebkitTextStroke: '1px black',
              }}
            >
              START STAMPING TODAY
            </h1>
        </a>
      </div>

      <div className='flex flex-col items-center justify-center min-w-screen min-h-screen bg-lightyellow'>
        <div className='flex gap-16 p-4 min-w-screen h-[50px] bg-yellowunderline border-2 border-black justify-center items-center'>
          <span className={`font-bold text-3xl text-black px-2`}>{details.name}</span>
          <span className={`font-bold text-3xl text-black px-2`}>{details.label}, {details.mmdd}</span>
          <span className={`font-bold text-3xl text-black px-2`}>{details.time}</span>
          <span className={`font-bold text-3xl text-black px-2`}>LOCATION: {details.location}</span>
        </div>
      </div>

      <div className='flex flex-col items-center justify-start min-h-screen bg-lightyellow'>
        <div className={`flex gap-16 p-4 max-w-[90%] text-black justify-center items-center`}>
          <p className='font-medium text-center text-4xl'>AS FUSION'S STUDY HOURS HAVE EXPANDED INTO THE ONLINE SPACE, THE STAMP CARD SYSTEM HAS TOO! 
            FU-STAMPS WAS CREATED TO MAKE IT EASIER FOR MEMBERS TO TRACK THEIR STUDY HOUR PROGRESS, REDUCE STAMP FRAUD,
            AND ENSURE FAIR PRIZE REDEMPTION. AFTER COLLECTING 10 STAMPS, YOU CAN REDEEM A BACON WRAPPED HOTDOG COUPON!
          </p>
          <ModalSelector />
        </div>
      </div>


      {/* break line */}
      <div className='flex gap-16 min-w-screen bg-yellowunderline border-2 border-black justify-center items-center' />


      
      <div className="relative w-full min-h-screen bg-lightyellow">
        
        <LogoBackground />

        {/* ts don't work so we'll get back to it later
        <div className="relative flex flex-col md:flex-row items-start md:items-center w-full h-full px-8 md:px-16">
          <div className="flex flex-col gap-16 md:w-1/2 mt-20">
            <StampProto />
            <HowItWorks />
          </div>

          <div className="flex flex-col items-center gap-16 md:w-1/2 mt-20">
            <Image
              src={RewardBox}
              alt="hot_dog_reward"
              className="p-6 rounded-2xl shadow-lg"
            />
            <div className="mt-auto">
              <StampCardProto />
            </div>

          </div> 
        </div> */}
      </div>
      

      {/* break line */}
      <div className='flex gap-16 min-w-screen bg-yellowunderline border-2 border-black justify-center items-center' />

      <div className="flex flex-col min-w-screen min-h-screen justify-center px-8">
        {/* Left-aligned heading */}
        <h1
          className="text-5xl font-extrabold font-verdana text-white text-left max-w-lg ml-[5%] font-['Verdana',monospace]"
          style={{
            WebkitTextStroke: '2px black',
            WebkitTextFillColor: 'white',
          }}
        >
          FAQs
        </h1>
        
        {/* Centered content */}
        <div className="flex flex-col items-center justify-center mt-16 gap-8 w-full">
          <div className="flex flex-col bg-yellowunderline text-black w-[90%] h-[20%] border-1 border-b-6 border-r-4 p-[32px]">
            <h1 className={`font-bold text-3xl text-left`}>
              WHEN ARE STUDY HOURS?
            </h1>
              {(() => {
                // check if study hours is today
                const today = new Date();
                const month = (today.getMonth() + 1).toString().padStart(2, '0'); // getMonth is 0-indexed
                const day = today.getDate().toString().padStart(2, '0');
                const mmdd = `${month}/${day}`;
                if(mmdd === details.mmdd) {
                  return(
                    <span className={`italic text-2xl mt-3`}>
                      Study Hours is happening today at {details.time}! It will be at {details.location}. Come study with FUSION!
                     </span>
                    )
                }
                else {
                  return(
                    <span className={`italic text-2xl mt-3`}>
                        The next Study hours is happening on {details.label}, {mmdd}, during {details.time} at {details.location}.
                    </span>
                    )
                }
              })()}
          </div>
          <div className="flex flex-col bg-yellowunderline text-black w-[90%] h-[20%] border-1 border-b-6 border-r-4 p-[32px]">
            <h1 className={`font-bold text-3xl text-left`}>
              WILL PHYSICAL STAMP CARDS STILL BE USED?
            </h1>
            <span className={`italic text-2xl mt-3`}> Absolutely! there will still be in-person study hours where you can still you can use a physical card to earn stamps and turn them in for prizes too.</span>
          </div>
          <div className="flex flex-col bg-yellowunderline text-black w-[90%] h-[20%] border-1 border-b-6 border-r-4 p-[32px]">
            <h1 className={`font-bold text-3xl text-left`}>
              WHAT IF I FORGOT TO ADD THE STAMP EVEN THOUGH I WAS IN ATTENDANCE?
            </h1>
            <span className={`italic text-2xl mt-3`}> Talk to an academic director and they can update the system from their end.</span>
          </div>
        </div>
      </div>

    </main>
  );
}
