export function AcademicsModal() {
  return (<div className="border-1 min-w-[480px] min-h-[265px] border-r-4 border-b-6 border-black bg-yellowunderline text-center items-center flex flex-col">
            <p className='text-black text-4xl font-bold text-center mt-10'>ACADEMICS DIRECTOR</p>
            <div className='pt-5'/>
            <a href='/stamp' className="text-3xl border-1 border-r-4 border-b-6 px-[15px] py-[8px] border-black bg-white/90">set a STAMP WORD</a>
            <a href='/attendance' className="text-3xl border-1 border-r-4 border-b-6 mt-5 px-[15px] py-[8px] border-black bg-white/90">view the ATTENDANCE LOG</a>
          </div>)
}

export function MemberModal() {
  return (<div className="border-1 min-w-[480px] min-h-[265px] border-r-4 border-b-6 border-black bg-yellowunderline text-center items-center flex flex-col">
            <p className='text-black text-4xl font-bold text-center mt-10'>GENERAL MEMBER</p>
            <div className='pt-5'/>
            <a href='/stampcard' className="text-3xl border-1 border-r-4 border-b-6 px-[15px] py-[8px] border-black bg-white/90">check your STAMPCARDS</a>
            <a href='/profile' className="text-3xl border-1 border-r-4 border-b-6 mt-5 px-[15px] py-[8px] border-black bg-white/90">view your PROFILE</a>
          </div>)
}

export function GuestModal() {
  return (<div className="border-1 min-w-[480px] min-h-[265px] border-r-4 border-b-6 border-black bg-yellowunderline text-center items-center flex flex-col">
            <p className='text-black text-4xl font-bold text-center mt-10'>GUEST</p>
            <div className='pt-5'/>
            <a href='/register' className="text-3xl border-1 border-r-4 border-b-6 px-[15px] py-[8px] border-black bg-white/90">make an ACCOUNT</a>
            <a href='/login' className="text-3xl border-1 border-r-4 border-b-6 mt-5 px-[15px] py-[8px] border-black bg-white/90">LOG IN</a>
          </div>)
}

