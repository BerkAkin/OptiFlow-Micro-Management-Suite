import React from 'react'
import { Line } from 'react-chartjs-2'

const data = {
    labels: ["Pzt", "Salı", "Çar", "Per", "Cuma"],
    datasets: [
        {
            label: "Mood",
            data: [1, 3, 2, 4, 5],
        },
    ],
};

const moodLabels: any = {
    1: "Kötü",
    2: "Orta",
    3: "İyi",
    4: "Çok İyi",
    5: "Mükemmel"
};

function PreviousMoods() {
    return (
        <div className='h-full p-3'>
            <Line data={data} options={{
                scales: {
                    y: {

                        ticks: {
                            stepSize: 1,
                            callback: function (value) {
                                return moodLabels[value] || value;
                            }
                        }
                    }
                },
                maintainAspectRatio: false,
                plugins: { legend: { display: false } }
            }} />
        </div>
    )
}

export default PreviousMoods
