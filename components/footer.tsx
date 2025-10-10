

export default function Footer() {
    return (
       <div className="w-full bg-black text-[#747474]">
            <div className="flex flex-col sm:flex-col md:flex-col lg:flex-col xl:flex-col justify-center items-center py-8 px-4 sm:px-10">

                {/* Top section: Heading + Links */}
                <div className="flex flex-col md:flex-row justify-between items-center w-full gap-6 sm:gap-10">
      
                    {/* heading */}
                    <h3 className="text-center md:text-left text-lg sm:text-xl font-normal italic md:italic">
                      STAY CONNECTED WITH FUSION!
                    </h3>

                    {/* Links */}
                    <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-8 text-base sm:text-xl font-montserrat">
                        <a 
                          href="https://www.instagram.com/fusionatuci/"
                          className="transition duration-300 ease-in-out hover:text-white"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                            INSTAGRAM
                        </a>
                        <a 
                          href="https://discord.gg/cz93j2Y2kx"
                          className="transition duration-300 ease-in-out hover:text-white"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                            DISCORD
                        </a>
                        <a 
                          href="/"
                          className="transition duration-300 ease-in-out hover:text-white"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                            EMAIL NEWSLETTER
                        </a>
                        <a 
                          href="https://linktr.ee/FUSIONInternals?fbclid=PAZXh0bgNhZW0CMTEAAac5-8BtaKdqdzq8KmbssgUHgFY3tlalG2ViRGtGpjHFo_Q4lbTRSakKxUnKAg_aem_Kx3GOKycV9zd3buPfYql3Q"
                          className="transition duration-300 ease-in-out hover:text-white"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                            LINKTREE
                        </a>
                    </div>
                </div>

                {/* tagline */}
                <div className="mt-6 flex justify-center items-center w-full">
                  <h2 className="text-center text-2xl sm:text-3xl text-[#FBCA29] font-montserrat">
                    DESIGNED BY FUSION, FOR FUSION
                  </h2>
                </div>
          </div>
        </div>
    )
}