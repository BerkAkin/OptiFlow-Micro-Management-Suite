import { useContext, useState } from 'react'
import { ModalContext } from '../../context/ModalContext'

import StepOne from './RegisterSteps/StepOne';
import StepTwo from './RegisterSteps/StepTwo';
import StepThree from './RegisterSteps/StepThree';
import StepFour from './RegisterSteps/StepFour';
import ProgressCounter from '../ProgressCounter/ProgressCounter';


interface registerInfoProps {
    name: string,
    surname: string,
    email: string,
    phone: string,
    password: string,
    street: string,
    street2: string,
    apartmentNum: string,
    doorNumber: string,
    province: string,
    district: string,
    fullAddress: string,
    packSelection: string,
    nameAndSurname: string,
    cardNumber: string,
    validDateMonth: string,
    validDateYear: string,
    cvv: string,
}

function RegisterModal() {

    const { setIsModal } = useContext(ModalContext);
    const [step, setStep] = useState(1);
    const [currentProgressStep, setCurrentProgressStep] = useState(1);
    const [registerInfo, setRegisterInfo] = useState<registerInfoProps>({
        name: "",
        surname: "",
        email: "",
        phone: "",
        password: "",
        street: "",
        street2: "",
        apartmentNum: "",
        doorNumber: "",
        province: "",
        district: "",
        fullAddress: "",
        packSelection: "",
        nameAndSurname: "",
        cardNumber: "",
        validDateMonth: "",
        validDateYear: "",
        cvv: "",
    });
    const nextStep = () => {
        setStep(prev => prev + 1);
        setCurrentProgressStep(prev => prev + 1);
    }

    const prevStep = () => {
        setStep(prev => prev - 1);
        setCurrentProgressStep(prev => prev - 1);
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRegisterInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div>
                        <StepOne handleChange={handleChange} registerInfo={registerInfo} setRegisterInfo={setRegisterInfo} nextStep={nextStep} setIsModal={setIsModal} />
                    </div>)
            case 2:
                return (
                    <>
                        <StepTwo handleChange={handleChange} registerInfo={registerInfo} setRegisterInfo={setRegisterInfo} nextStep={nextStep} setIsModal={setIsModal} previousStep={prevStep} />
                    </>)
            case 3:
                return (
                    <>
                        <StepThree handleChange={handleChange} registerInfo={registerInfo} setRegisterInfo={setRegisterInfo} nextStep={nextStep} setIsModal={setIsModal} previousStep={prevStep} />
                    </>)
            case 4:
                return (
                    <>
                        <StepFour handleChange={handleChange} registerInfo={registerInfo} setRegisterInfo={setRegisterInfo} setIsModal={setIsModal} previousStep={prevStep} />
                    </>)
            default:
                return null;
        }
    }

    return (
        <>
            <div>
                <div>
                    <ProgressCounter depth={3} currentStep={currentProgressStep} />
                </div>

                <div>
                    {renderStep()}
                </div>

            </div>


        </>
    )

}

export default RegisterModal
