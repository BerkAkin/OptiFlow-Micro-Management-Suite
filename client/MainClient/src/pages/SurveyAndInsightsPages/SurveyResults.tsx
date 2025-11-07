

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
    const initialTempSurvey: Surveys = {
        surveys: [initialSurvey,]
    }

    return (
        <div className='m-10 bg-white shadow-md'>
            <div className='w-[95%] mx-auto grid grid-cols-2 gap-4' >
                {initialTempSurvey.surveys.map((item, index) => (
                    <div key={index} className={`my-3 shadow-sm border h-[200px] grid grid-cols-[20%_80%]`}>
                        <div>
                            <div className={`w-full h-full flex items-center justify-center border-e`}>
                                <p style={{ fontFamily: "roobert" }} className='text-center text-xl text-gray-600 mx-4'>{item.header}</p>
                            </div>
                        </div>
                        <div className="p-2 overflow-auto">
                            {item.questions.map((questions, index) => (
                                <div key={index} className="mb-4">
                                    <p className="text-sm mb-2 text-gray-800">{index + 1}) {questions.text}</p>
                                    {questions.answers.map((answer) => (
                                        <div>
                                            <p className="ps-5 text-sm text-gray-600 inline">-{answer.text} </p>
                                            <p className="inline bg-indigo-500 text-white px-2 text-sm rounded-sm">{answer.voteCount} % </p>

                                        </div>
                                    ))}
                                </div>
                            ))}

                        </div>
                    </div>

                ))}
            </div>


        </div>
    )
}

export default SurveyResults
