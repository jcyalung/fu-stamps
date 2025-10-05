import Image from "next/image"
export default function Email() {
    const NAME = "<NAME>"; // replace with dynamic name fetching later
    return (
        <div className="flex flex-col items-center bg-white
                        lg:w-[550px] lg:h-[624px]
                        w-[280px] h-[596px]">
            <div className="flex flex-col items-center mt-[26px] justify-center bg-[#FFFBEF]
                            lg:w-[502px] lg:h-[141px]
                            w-[258px] h-[101px]
                            border-b-6 border-r-4 border-1 border-black">
                <h1 className={`lg:text-4xl text-2xl text-center font-montserrat text-black
                                lg:mt-[9px] mt-[14px]`}> 
                    WELCOME TO
                </h1>
                <div className="relative w-[232px] lg:w-[415px] h-full">
                    <Image
                        src="/title.png"
                        alt="logo"
                        fill
                        className="object-contain -mt-[10px]"
                        sizes="(min-width: 1024px) 415px, 232px"
                    />
                </div>          
            </div>
            <p className={`lg:text-3xl text-2xl font-montserrat text-black italic font-light
                                lg:mt-[59px] mt-[64px]
                                lg:w-[492px] w-[229px]`}>
                    HELLO {NAME},
            </p>
            <p className={`lg:text-lg text-sm font-montserrat text-black font-medium
                                lg:w-[492px] w-[235px]
                                lg:h-[171px] h-[215px]
                                lg:mt-[11px] mt-[15px]`}>
                    Yay! Thank you so much for registering an account with Fu-Stamps. Before getting started and stamping, let’s verify your email. 
                    <br/>
                    <br/>
                    Click on the button below to continue with registration and login with your new account! This link will expire in a week.
            </p>
            <button className="flex justify-center items-center text-center
                            lg:w-[443px] lg:h-[78px]
                            w-[222px] h-[59px] bg-[#FBCA29] 
                            border-b-6 border-r-4 border-1 border-black
                            lg:mt-[50px] mt-[30px]
                            hover:cursor-pointer">
                <div className="relative w-[142px] h-[39px]
                                lg:w-[283px] lg:h-[62px]">
                    <Image
                        src="/VERIFY.png"
                        alt="verify email button"
                        fill
                        className="object-contain"
                    />                
                </div>
            </button>    
        </div>
    )
}