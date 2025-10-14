import OpenStreetMapView from "../../utils/Mapview"
import bg2 from '../../assets/bg2.jpg'

function Footer() {
  return (
    <>
      <div className='h-[700px] '>

        <OpenStreetMapView />

        <div className="h-[100%] w-[100%] grid relative ">
          <div className="border grid grid-cols-3 h-[250px] w-[50%] absolute transform left-1/2 -translate-x-1/2 -translate-y-1/3 bg-white shadow-lg">
            <div className='flex items-center justify-center '>
              <h1 className="ps-6 text-2xl text-gray-600">1</h1>
            </div>
            <div className='flex items-center justify-center border-x border-indigo-400'>
              <h1 className="ps-6 text-2xl text-gray-600">2</h1>
            </div>
            <div className='flex items-center justify-center'>
              <h1 className="ps-6 text-2xl text-gray-600">3</h1>
            </div>
          </div>
        </div>


      </div>

    </>
  )
}

export default Footer
