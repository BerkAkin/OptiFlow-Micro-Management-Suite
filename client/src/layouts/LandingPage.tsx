import Carousel from "../components/Carousel/Carousel"
import CarouselConstant from "../constants/CarouselConstant"
import dotBg from "../assets/dotBg.jpg"
import InfoBox from "../components/InfoBox/InfoBox"
import { infoBoxOne } from "../constants/InfoBoxLandingConstants"
import { BasicPlan, FullPlan, GeneralPlan } from "../constants/PacksConstants"
import PackCard from "../components/PackCard/PackCard"
import PageTopBtn from "../components/PageTopBtn/PageTopBtn"
import UsageCard from "../components/UsageCard/UsageCard"
import { UsageCardConstants } from "../constants/UsageCardConstants"
import Accordion from "../components/Accordion/Accordion"
import managementBg from "../assets/management.jpg"
import { IndustriesConsts } from "../constants/IndustriesConstants"
import HorizontalCard from "../components/HorizontalCard/HorizontalCard"
import AOS from "aos";
import { useEffect } from "react"
import "aos/dist/aos.css";
function LandingLayout() {

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, offset: 100 });
  }, [])

  return (
    <>
      <PageTopBtn />
      <div>


        <div style={{ textShadow: "0px 1px 1px rgb(0 0 0 / 0.2)", backgroundImage: `url(${dotBg})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} className="grid w-[100%] h-[700px]">
          <div className="flex items-end justify-center">
            <p data-aos="fade-top" style={{ fontFamily: "Roobert" }} className="text-5xl text-gray-700 font-bold text-shadow-xl">Manage Your Corporation As It <span className="border-b-2 border- border-indigo-400">Deserves</span> </p>
          </div>
          <div className="grid justify-center">
            <div className="flex items-center">
              <h1 data-aos="fade-top" className="text-2xl text-gray-700 font-light" >Review - Subscribe - Manage !</h1>
            </div>
            <div className="flex items-start justify-evenly">
              <button className="border border-gray-700 bg-white w-24 block py-2 px-3 md:p-0 text-gray-700 md:dark:hover:text-indigo-500 text-lg w-36 me-5">Review Packs</button>
              <button className="block bg-indigo-500 w-36 text-lg text-white py-2 px-3 md:p-0 hover:bg-indigo-700">Purchase</button>
            </div>
          </div>
        </div>


        <div data-aos="fade-down" className="relative grid bg-gray-50" >
          <InfoBox items={infoBoxOne} />
          <div className="my-10">
            <div className="grid grid-cols-4 mt-12 container mx-auto">
              {UsageCardConstants.map((item, index) => (
                <div className=" flex justify-center" key={index}>
                  <UsageCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>


        <div data-aos="fade-up" className="grid grid-cols-[45%_55%] shadow-sm">
          <div className="flex items-center justify-center">
            <div>
              <div className="text-center mb-10 " >
                <h1 style={{ fontFamily: "Roobert" }} className="text-4xl text-gray-700 font-bold"><span className="border-b-2 border-indigo-400">What</span> is CASTRA-MICRO Management Suite?</h1>
              </div>
              <p className={`ps-2 text-center leading-9 text-gray-600 text-xl`} >
                Castra is a comprehensive management platform developed for organizations seeking to adapt to the rapidly changing dynamics of the modern business world.
                One of the biggest challenges for companies today is managing many different processes, such as finance, human resources, communication, innovation, and employee satisfaction, through disjointed systems.
                Castra eliminates this complexity and centralizes all these areas.
              </p>
            </div>
          </div>
          <div className={`w-100 h-[700px] flex items-center justify-center `}>
            <Carousel items={CarouselConstant} />
          </div>
        </div>



        <div data-aos="fade-down" className="h-[600px] my-12 ">
          {IndustriesConsts.map((item, index) => (
            <div key={index}>
              <HorizontalCard item={item} />
            </div>
          ))}


        </div>




        <div className="h-[700px] grid grid-cols-2" >
          <div className="h-[100%] flex items-start pt-10 justify-center" style={{ backgroundColor: "#1f1f1f" }}>
            <div data-aos="fade-top" className="w-[600px] h-[400px]">
              <div>
                <p className="text-indigo-400 text-lg">Manage Your Corporation !</p>
              </div>

              <div className="my-6">
                <p style={{ fontFamily: "Roobert" }} className="text-3xl text-white font-bold"><span className="border-b-2 border-indigo-400">Why</span> Choose Castra Micromanagement Suite?</p>
              </div>

              <div >
                <p className="text-white my-10">
                  In today’s fast-paced business environment, organizations need more than just isolated tools — they need a unified ecosystem that connects every department, streamlines communication, and empowers employees.
                  Castra Micromanagement Suite was built precisely for that purpose. It brings together all the critical aspects of internal operations — from finance and HR to innovation and employee engagement — under one intelligent, interconnected platform.
                </p>
              </div>
              <div>
                <Accordion />
              </div>
            </div>

          </div>
          <div>

            <img className="w-full h-full object-cover" src={managementBg} alt="" />
          </div>
        </div>




        <div className="bg-gray-50 py-20">
          <div className="flex justify-center text-gray-700 items-center">
            <h1 className='text-5xl mb-2'><span style={{ fontFamily: "Roobert" }} className="border-b">Available Plans</span></h1>
          </div>
          <div data-aos="fade-top" className="flex items-center my-5  justify-center " >
            <PackCard Text="Temp Text1" ButtonText="Details" Price={700} Header="Basic Plan" HeaderBg="indigo-400" Height={560} Width={96} IsHover={true} SingleItems={BasicPlan} />
            <PackCard Text="Temp Text2" ButtonText="Details" Price={1000} Header="Full Plan" HeaderBg="indigo-500" Height={620} Width={96} IsHover={true} SingleItems={FullPlan} />
            <PackCard Text="Temp Text3" ButtonText="Details" Price={900} Header="General Plan" HeaderBg="indigo-400" Height={560} Width={96} IsHover={true} SingleItems={GeneralPlan} />
          </div>

          <div className="text-center mt-8 container mx-auto flex justify-center">
            <p style={{ fontFamily: "Roobert" }} className="font-bold text-xl text-gray-700">Looking for a Customized Solution?</p>
          </div>
          <div className="text-center  pt-4 container mx-auto flex justify-center text-gray-500">
            <p className="w-[60%]">
              Castra Micromanagement Suite is designed to adapt to your organization’s unique needs.
              If you’re interested in a tailored plan or want to explore specific module configurations, our team is ready to help.
              Get in touch with us today to discuss your requirements and create a solution that fits your business perfectly.</p>
          </div>
        </div>



      </div>
    </>

  )
}

export default LandingLayout
