import OpenStreetMapView from "../../utils/Mapview"
import { FooterContactsConstants } from "../../constants/FooterContactsConstants"
import ContactCard from "../ContactCard/ContactCard"
import link from '../../assets/link.png'
import ins from '../../assets/ins.png'
import git from '../../assets/git.png'

function Footer() {
  return (
    <>
      <div className='h-[850px]'>

        <OpenStreetMapView />

        <div className="h-[100%] w-[100%] grid relative " style={{ backgroundColor: "#1f1f1f" }}>
          <div className="border grid grid-cols-3 h-[250px] w-[65%] absolute transform left-1/2 -translate-x-1/2 -translate-y-1/3 bg-white overflow-hidden">
            {FooterContactsConstants.map((item, index) => (
              <div key={index}>
                <ContactCard item={item} />
              </div>
            ))}

          </div>

          <div className="relative pt-5">
            <div className="absolute top-60 w-[100%]">
              <div className="container border-indigo-500 border-b mx-auto h-[200px] w-[65%] grid grid-cols-[30%_70%]">
                <div className="flex items-center text-start">
                  <h1 className="text-white text-4xl font-roobert">OptiFlow Management Suite</h1>
                </div>
                <div className="flex items-center justify-end text-end">
                  <h1 className="text-white text-2xl w-[70%] pe-5 font-roobert" >Manage Your Corporation As It Deserves <br />Review - Subscribe - Manage !</h1>
                </div>
              </div>


              <div className="container mt-8 mx-auto h-[300px] w-[65%] grid grid-cols-[30%_70%]">


                <div className="bg-[#141414]">
                  <div className="h-[25%]">
                    <h1 className="p-5 text-white font-bold text-xl font-roobert">OptiFlow</h1>
                  </div>
                  <div className="h-[50%]">
                    <h1 className="p-5 text-[gray] text-white text-sm font-roobert" >OptiFlow Suite is the all-in-one process management platform that helps organizations streamline operations across every department.</h1>

                  </div>
                  <div className="flex justify-start ps-5 pb-10 items-center h-[25%]">
                    <div className="rounded-md hover:bg-indigo-600 hover:scale-105 hover:ease-in transition duration-150 cursor-pointer p-2 bg-indigo-400 size-10 ">
                      <img src={ins}></img>
                    </div>
                    <div className="rounded-md hover:bg-indigo-600 hover:scale-105 hover:ease-in transition duration-150 cursor-pointer p-2 bg-indigo-400 size-10 mx-4">
                      <img src={link}></img>
                    </div>
                    <div className="rounded-md hover:bg-indigo-600 hover:scale-105 hover:ease-in transition duration-150 cursor-pointer p-2 bg-indigo-400 size-10 ">
                      <img src={git}></img>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3">
                  <div>
                    <div>
                      <h1 className="text-white text-xl ps-5 font-roobert"><span className="border-b-2 border-indigo-500" >Plat</span>form</h1>
                    </div>
                    <div className="h-[40px] py-5 ps-5"><h1 className="text-white">Features </h1></div>
                    <div className="h-[40px] py-5 ps-5"><h1 className="text-white">Privacy</h1></div>
                    <div className="h-[40px] py-5 ps-5"><h1 className="text-white">Security</h1></div>
                    <div className="h-[40px] py-5 ps-5"><h1 className="text-white">Use Cases</h1></div>
                    <div className="h-[40px] py-5 ps-5"><h1 className="text-white">Marketplace</h1></div>
                    <div className="h-[40px] py-5 ps-5"><h1 className="text-white">Pricing</h1></div>

                  </div>
                  <div>
                    <div>
                      <h1 className="text-white text-xl ps-5 font-roobert"><span className="border-b-2 border-indigo-500 font-roobert">Mod</span>ules</h1>
                    </div>
                    <div className="h-[40px] py-5 ps-5"><h1 className="text-white">Finance </h1></div>
                    <div className="h-[40px] py-5 ps-5"><h1 className="text-white">Survey & Insights</h1></div>
                    <div className="h-[40px] py-5 ps-5"><h1 className="text-white">Innovation Box</h1></div>
                    <div className="h-[40px] py-5 ps-5"><h1 className="text-white">Leave Management</h1></div>
                    <div className="h-[40px] py-5 ps-5"><h1 className="text-white">Silent System</h1></div>
                    <div className="h-[40px] py-5 ps-5"><h1 className="text-white">Recognition</h1></div>

                  </div>

                  <div>
                    <div>
                      <h1 className="text-white text-xl ps-5 font-roobert"><span className="border-b-2 border-indigo-500 font-roobert">Indus</span>tries</h1>
                    </div>
                    <div className="h-[40px] py-5 ps-5"><h1 className="text-white">Corporate</h1></div>
                    <div className="h-[40px] py-5 ps-5"><h1 className="text-white">Enterprise</h1></div>
                    <div className="h-[40px] py-5 ps-5"><h1 className="text-white">Manufacturing</h1></div>
                    <div className="h-[40px] py-5 ps-5"><h1 className="text-white">Industrial Operations</h1></div>
                    <div className="h-[40px] py-5 ps-5"><h1 className="text-white">Technology</h1></div>
                    <div className="h-[40px] py-5 ps-5"><h1 className="text-white">Creative Agencies</h1></div>

                  </div>

                </div>

              </div>
              <div className="text-white flex items-center justify-center pt-8" >
                <h1 className="text-sm font-roobert"><span className="text-indigo-500 font-roobert">© Copyright 2025 All Rights Reserved to</span> B.A.</h1>
              </div>
            </div>
          </div>

        </div>


      </div>

    </>
  )
}

export default Footer
