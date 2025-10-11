"use client"
import Image from "next/image";
import page_image from '@/components/images/landing_page_section.png';
import logo from '@/components/root/fusion_logo.png';
import ModalSelector from "@/components/root/ModalSelector";
import RewardBox from '@/components/root/reward_box.png';
import { StampProto, StampCardProto, HowItWorks } from "@/components/root/Section2";
import { getUpcomingStudySession } from "@/constants";
import Stampcard from "@/components/Stampcard";
import TitleTextbox from "@/components/TitleTextbox";
const stamps1 = { 
    "1" : "2025-10-10",
    "2" : "2025-10-11",
    "3" : "2025-10-12",
    "4" : "2025-10-13",
  }
  const stamps2 = { 
    "1" : "2025-10-10",
    "2" : "2025-10-11",
    "3" : "2025-10-12",
    "4" : "2025-10-14",
    "5" : "2025-10-15",
    "6" : "2025-10-16",
    "7" : "2025-10-17",
    "8" : "2025-10-18",
    "9" : "2025-10-19",
    "10" : "2025-10-20",
  }

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

        <a href='/stampcard' 
           className={`transform transition-transform duration-300 hover:scale-105`}
        // mt-10 inline-flex px-[80px] py-[4px] justify-end items-center border border-black bg-[#FBCA29] shadow-[4px_6px_0_0_#000000]
        >
            <TitleTextbox>
              START STAMPING TODAY
              </TitleTextbox>
        </a>
      </div>

      <div className='flex flex-col items-center justify-center w-screen h-[50vh] bg-lightyellow'>
        <div className='flex flex-wrap justify-center items-center gap-6 sm:gap-12 p-4 bg-yellowunderline border-2 border-black w-full'>
          <span className={`font-bold text-center text-2xl sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl text-black px-2`}>{details.name}</span>
          <span className={`font-bold text-center text-2xl sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl text-black px-2`}>{details.label}, {details.mmdd}</span>
          <span className={`font-bold text-center text-2xl sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl text-black px-2`}>{details.time}</span>
          <span className={`font-bold text-center text-2xl sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl text-black px-2`}>LOCATION: {details.location}</span>
        </div>
      </div>

      <div className='flex flex-col items-center justify-start min-h-screen bg-lightyellow'>
        <div className={`flex flex-wrap gap-16 p-4 min-w-[10%] max-w-[80%] text-black justify-center items-center`}>
          <p className='font-medium text-center leading-[clamp(2rem, 4vw, 3.5rem)] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl'>As FUSION'S Study Hours have expanded into the online space, the stamp card system has too! 
            Fu-Stamps was created to make it easier for members to track their study hour progress, reduce stamp fraud,
            and ensure fair prize redemption. After collecting 10 stamps, you can redeem a bacon wrapped hotdog coupon!
          </p>
          <ModalSelector />
        </div>
      </div>


      {/* break line */}
      <div className='flex gap-16 min-w-screen bg-yellowunderline border-2 border-black justify-center items-center' />


      
      <div className="relative w-full min-h-screen bg-lightyellow">
            <div className="absolute left-[33vw] bottom-[16px] z-10">
              <StampProto />
            </div>
            <div className="absolute left-[40vw] top-[12vh] z-10">
              <HowItWorks />
            </div>
            <div className="absolute bottom-0 left-[79vw] z-10">
              <Image
                src={RewardBox}
                alt="hot_dog_reward"
                className="p-6 rounded-2xl"
              />
            </div>
            <div className="absolute left-[11vw] top-[11vh] z-3">
              <Stampcard stamps={stamps1}/>
            </div>
            <div className="absolute left-[3vw] top-[36vh] z-1">
              <Stampcard stamps={stamps2}/>
            </div>
            <div className="absolute left-[vw] top-0 w-[90%] h-[90%] max-h-screen max-w-screen">
              <Image
                src={logo}
                alt="logo"
                fill
                className="[animation:spin_5s_linear_infinite] object-contain" 
              />
            </div>
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
