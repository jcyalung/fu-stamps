

export default function Footer() {
    return (
        <div className="w-full h-[200px]">
            <div className="content flex flex-col h-full justify-center items-center">
                <div className="topbar flex justify-between p-10 w-full italic">
                    <div className="text-xl text-[#747474] not-italic"><h3>STAY CONNECTED WITH FUSION!
                        </h3></div>

                    <div className="text-xl text-[#747474] flex gap-[48px] font-montesserat">
                        <a 
                        href="https://www.instagram.com/fusionatuci/"
                        className='transition duration-300 ease-in-out hover:text-white'>
                            INSTAGRAM
                        </a>
                        <a 
                        href="https://discord.gg/cz93j2Y2kx"
                        className='transition duration-300 ease-in-out hover:text-white'>
                            DISCORD
                        </a>
                        <a 
                        href="/"
                        className='transition duration-300 ease-in-out hover:text-white'>
                            EMAIL NEWSLETTER
                        </a>
                        <a 
                        href="https://linktr.ee/FUSIONInternals?fbclid=PAZXh0bgNhZW0CMTEAAac5-8BtaKdqdzq8KmbssgUHgFY3tlalG2ViRGtGpjHFo_Q4lbTRSakKxUnKAg_aem_Kx3GOKycV9zd3buPfYql3Q"
                        className='transition duration-300 ease-in-out hover:text-white'>
                            LINKTREE
                        </a>
                    </div>
                   
                </div>

                <div className=" flex items-center justify-center w-full mx-auto ">
                    <h2 className="text-3xl text-[#FBCA29] font-montserrat">
                        DESIGNED BY FUSION, FOR FUSION
                        </h2>

                </div>

            </div>
        </div>
    )





}