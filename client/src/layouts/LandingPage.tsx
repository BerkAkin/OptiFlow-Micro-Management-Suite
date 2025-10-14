import Carousel from "../components/Carousel/Carousel"
import CarouselConstant from "../constants/CarouselConstant"
import dotBg from "../assets/dotBg.jpg"
import InfoBox from "../components/InfoBox/InfoBox"
import { infoBoxOne } from "../constants/InfoBoxLandingConstants"
import { BasicPlan, FullPlan, GeneralPlan } from "../constants/PacksConstants"
import PackCard from "../components/PackCard/PackCard"
import styles from "./styles.module.css"
import PageTopBtn from "../components/PageTopBtn/PageTopBtn"

function LandingLayout() {

  const items = CarouselConstant


  return (
    <>  <PageTopBtn />
      <div>


        <div style={{ textShadow: "0px 1px 1px rgb(0 0 0 / 0.2)", backgroundImage: `url(${dotBg})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} className="grid w-[100%] h-[700px]">
          <div className="flex items-end justify-center">
            <p className="text-5xl text-white font-bold text-shadow-xl">Manage Your Corporation As It <span className="border-b-2 border- border-indigo-500">Deserves</span> </p>
          </div>
          <div className="grid justify-center">
            <div className="flex items-center">
              <h1 className="text-2xl text-white font-light">Review - Subscribe - Manage !</h1>
            </div>
            <div className="flex items-start justify-evenly">
              <button className="  border-gray-400 bg-white w-24 block py-2 px-3 md:p-0 text-gray-700 md:dark:hover:text-indigo-500 text-lg w-36 me-5">Review Packs</button>
              <button className="block bg-indigo-500 w-36 text-lg text-white py-2 px-3 md:p-0 hover:bg-indigo-700">Purchase</button>
            </div>
          </div>
        </div>


        <div className="relative grid grid-cols-[45%_55%] pt-[200px] pb-[100px]">
          <InfoBox items={infoBoxOne} />
          <div className="flex items-center justify-center">
            <div>
              <div className="text-center mb-10">
                <h1 className="text-4xl text-gray-700">What is CASTRA-MICRO Management Suite?</h1>
              </div>
              <p className={`${styles.LandingFont} ps-10 text-center leading-9 text-gray-600 text-xl`} >
                Castra is a comprehensive management platform developed for organizations seeking to adapt to the rapidly changing dynamics of the modern business world.
                One of the biggest challenges for companies today is managing many different processes, such as finance, human resources, communication, innovation, and employee satisfaction, through disjointed systems.
                Castra eliminates this complexity and centralizes all these areas.
              </p>
            </div>
          </div>
          <div className={`w-100 h-[700px] flex items-center justify-center `}>
            <Carousel items={items} />
          </div>
        </div>






        <div className="py-[150px] border-t relative grid">
          <InfoBox items={infoBoxOne} />
          <div className="flex justify-center text-gray-700 items-center">
            <h1 className='text-5xl mb-12'><span className="border-b">Available Plans</span></h1>
          </div>
          <div className="flex items-center my-5  justify-center ">
            <PackCard Text="Temp Text1" ButtonText="Details" Price={700} Header="Basic Plan" HeaderBg="indigo-400" Height={560} Width={96} IsHover={true} SingleItems={BasicPlan} />
            <PackCard Text="Temp Text2" ButtonText="Details" Price={1000} Header="Full Plan" HeaderBg="indigo-500" Height={620} Width={96} IsHover={true} SingleItems={FullPlan} />
            <PackCard Text="Temp Text3" ButtonText="Details" Price={900} Header="General Plan" HeaderBg="indigo-400" Height={560} Width={96} IsHover={true} SingleItems={GeneralPlan} />
          </div>

          <div className="text-center mt-8 container mx-auto flex justify-center">
            <p className="font-bold text-xl text-gray-700">Looking for a Customized Solution?</p>
          </div>
          <div className="text-center mb-8 pt-4 container mx-auto flex justify-center text-gray-500">
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
