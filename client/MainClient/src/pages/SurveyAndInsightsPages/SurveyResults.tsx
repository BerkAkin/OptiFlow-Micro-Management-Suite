import { useParams } from "react-router-dom"


type Surveys = {
    surveys: Survey[]
}

type Answer = {
    text: string,
    voteCount: number,
}
type Question = {
    text: string,
    answers: Answer[],
}
type Survey = {
    id: string,
    header: string,
    questions: Question[],
    participateCount: number,
}


const initialSurvey: Survey = {
    id: "1",
    header: "Maintenance Survey Part 1",
    participateCount: 100,
    questions: [
        {
            text: "Aşağıdaki sistemlerden hangisinin kullanımı sizin için daha yararlı olabilir? Hangisini şirket bünyesinde görmek istersiniz?",
            answers: [
                { text: "Sistem Analizi", voteCount: 42 },
                { text: "Çalışan Güvenlik Sistemi", voteCount: 58 },
            ]
        },
        {
            text: "Aşağıdaki sistemlerden hangisinin kullanımı sizin için daha yararlı olabilir? Hangisini şirket bünyesinde görmek istersiniz?",
            answers: [
                { text: "Sistem Analizi", voteCount: 42 },
                { text: "Çalışan Güvenlik Sistemi", voteCount: 58 },
            ]
        },
        {
            text: "Aşağıdaki sistemlerden hangisinin kullanımı sizin için daha yararlı olabilir? Hangisini şirket bünyesinde görmek istersiniz?",
            answers: [
                { text: "Sistem Analizi", voteCount: 42 },
                { text: "Çalışan Güvenlik Sistemi", voteCount: 58 },
            ]
        },
        {
            text: "Aşağıdaki sistemlerden hangisinin kullanımı sizin için daha yararlı olabilir? Hangisini şirket bünyesinde görmek istersiniz?",
            answers: [
                { text: "Sistem Analizi", voteCount: 42 },
                { text: "Çalışan Güvenlik Sistemi", voteCount: 58 },
            ]
        },
        {
            text: "Aşağıdaki sistemlerden hangisinin kullanımı sizin için daha yararlı olabilir? Hangisini şirket bünyesinde görmek istersiniz?",
            answers: [
                { text: "Sistem Analizi", voteCount: 42 },
                { text: "Çalışan Güvenlik Sistemi", voteCount: 58 },
            ]
        },
        {
            text: "Aşağıdaki Denemedir",
            answers: [
                { text: "Sistem Denemesi", voteCount: 67 },
                { text: "Çalışan Güvenlik Denemesi", voteCount: 33 },
            ]
        },
    ],


}


function SurveyResults() {
    const { slug } = useParams();

    const initialTempSurvey: Surveys = {
        surveys: [initialSurvey,]
    }

    return (
        <div className='container mx-auto border my-10 bg-white rounded-lg shadow-md' >

            {initialTempSurvey.surveys.map((item, index) => (
                <div key={index} className={`h-[800px] grid grid-cols-[20%_80%]`}>
                    <div>
                        <div className={`w-full h-full flex items-center justify-center border-e`}>
                            <p style={{ fontFamily: "roobert" }} className='text-center text-3xl text-gray-600 mx-4'>{slug} Results</p>
                        </div>
                    </div>
                    <div className="p-2 overflow-auto">
                        {item.questions.map((questions, index) => (
                            <div key={index} className="mb-4">
                                <p className="text-lg mb-2 text-gray-800">{index + 1}) {questions.text}</p>
                                {questions.answers.map((answer) => (
                                    <div>
                                        <p className="ps-5 text-gray-600 inline">-{answer.text} </p>
                                        <p className="inline bg-indigo-500 text-white px-2  rounded-sm">{answer.voteCount} % </p>

                                    </div>
                                ))}
                            </div>
                        ))}

                    </div>
                </div>

            ))}
        </div>


    )
}

export default SurveyResults
