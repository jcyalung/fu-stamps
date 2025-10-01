"use client"
import Image from "next/image";
import page_image from '@/components/images/landing_page_section.png';
import { Montserrat } from "next/font/google";
import TitleTextbox from "@/components/TitleTextbox";
import { STUDY_HOURS, getUpcomingStudySession } from "@/constants";
import { AcademicsModal, MemberModal, GuestModal } from "@/components/Modals";
import ModalSelector from "@/components/ModalSelector";

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
})
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

        <TitleTextbox>
          <a href='/stampcard'>START STAMPING TODAY</a>
        </TitleTextbox>
      </div>

      <div className='flex flex-col items-center justify-center min-w-screen min-h-screen bg-lightyellow'>
        <div className='flex gap-16 p-4 min-w-screen h-[50px] bg-yellowunderline border-2 border-black justify-center items-center'>
          <span className={`${montserrat.className} font-bold text-3xl text-black px-2`}>{details.name}</span>
          <span className={`${montserrat.className} font-bold text-3xl text-black px-2`}>{details.label}, {details.mmdd}</span>
          <span className={`${montserrat.className} font-bold text-3xl text-black px-2`}>{details.time}</span>
          <span className={`${montserrat.className} font-bold text-3xl text-black px-2`}>LOCATION: {details.location}</span>
        </div>
      </div>

      <div className='flex flex-col items-center justify-start min-h-screen bg-lightyellow'>
        <div className={`${montserrat.className} flex gap-16 p-4 max-w-[90%] text-black justify-center items-center`}>
          <p className='font-medium text-center text-4xl'>AS FUSION'S STUDY HOURS HAVE EXPANDED INTO THE ONLINE SPACE, THE STAMP CARD SYSTEM HAS TOO! 
            FU-STAMPS WAS CREATED TO MAKE IT EASIER FOR MEMBERS TO TRACK THEIR STUDY HOUR PROGRESS, REDUCE STAMP FRAUD,
            AND ENSURE FAIR PRIZE REDEMPTION. AFTER COLLECTING 10 STAMPS, YOU CAN REDEEM A BACON WRAPPED HOTDOG COUPON!
          </p>
          <ModalSelector />
        </div>
      </div>
    </main>
  );
}
