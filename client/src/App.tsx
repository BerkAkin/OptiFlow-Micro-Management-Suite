import { useContext } from "react";
import Footer from "./components/Footer.tsx/Footer";
import ModalContainer from "./components/ModalContainer/ModalContainer";
import Navbar from "./components/Navbar/Navbar";
import LandingLayout from "./layouts/LandingPage";
import { ModalContext } from "./context/ModalContext";



function App() {

  const { isModal } = useContext(ModalContext);

  return (
    <div className="bg-white">
      {isModal ? <ModalContainer /> : ""}
      <Navbar />
      <LandingLayout />
      <Footer />
    </div>
  );
}

export default App;
