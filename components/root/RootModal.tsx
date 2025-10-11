import { HOVER_STYLE } from "@/constants"
interface ModalProps {
  verification: number | null;
}

type Details = {
  title : string,
  option1 : string,
  href1 : string,
  option2 : string,
  href2 : string,
}
const ACADEMICS_DETAILS : Details = {
  title: "ACADEMICS DIRECTOR",
  option1 : "set a STAMP WORD",
  href1 : "/stamp",
  option2 : "view the ATTENDANCE LOG",
  href2 : "/attendance",
}
const MEMBER_DETAILS : Details = {
  title: "GENERAL MEMBER",
  option1 : "check your STAMPCARDS",
  href1 : "/stampcard",
  option2 : "view your PROFILE",
  href2 : "/profile",
}
const GUEST_DETAILS : Details = {
  title: "GUEST",
  option1 : "check your STAMPCARDS",
  href1 : "/register",
  option2 : "view your PROFILE",
  href2 : "/login",
}
export function RootModal({verification} : ModalProps) {
  let displayDetails : Details;
  verification = 0;
  if(verification == 2) { displayDetails = ACADEMICS_DETAILS; }
  else if(verification == 1) { displayDetails = MEMBER_DETAILS; }
  else { displayDetails = GUEST_DETAILS; }
  return (
    <div 
      className="border border-r-4 border-b-6 border-black bg-yellowunderline text-center flex flex-col items-center justify-center 
                w-[clamp(160px,40vw,500px)] h-[clamp(100px,50vh,360px)] rounded-lg p-[clamp(8px,2vw,16px)]">
            <p className='text-black font-bold text-center mt-4 text-[clamp(1.5rem,4vw,3rem)]'>{displayDetails.title}</p>
            <div className='pt-[clamp(8px,1.5vw,20px)]'/>
            <a 
              href={displayDetails.href1} 
              className={`${HOVER_STYLE} border border-r-4 border-b-6 border-black bg-white/90 mt-4
               px-[clamp(10px,3vw,16px)] py-[clamp(6px,1.5vw,10px)]
               text-[clamp(1.25rem,3vw,2rem)]`}
            >{displayDetails.option1}</a>
            <a 
              href={displayDetails.href2} 
              className={`${HOVER_STYLE} border border-r-4 border-b-6 border-black bg-white/90 mt-4
               px-[clamp(10px,3vw,16px)] py-[clamp(6px,1.5vw,10px)]
               text-[clamp(1.25rem,3vw,2rem)]`}
            >{displayDetails.option2}</a>
          </div>
  )
}
