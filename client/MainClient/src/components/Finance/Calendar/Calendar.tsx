import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

import './styles.css'



interface EventType {
    id: string
    title: string
    start: string
    end?: string
}

export function Calendar() {
    const [events, setEvents] = useState<EventType[]>([])


    const handleDateSelect = (selectInfo: any) => {
        const title = prompt('Etkinlik adı girin:')
        if (title) {
            const newEvent: EventType = {
                id: String(events.length + 1),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr
            }
            setEvents((prev) => [...prev, newEvent])
        }
    }

    return (
        <div className="fc-toolbar fc-header-toolbar p-3 h-[420px] font-rubik">
            <FullCalendar
                height={400}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                selectable={true}
                events={events}
                select={handleDateSelect}
                editable={true}
                themeSystem=''
                headerToolbar={{
                    left: 'prev,next',
                    center: 'title',
                    right: ''
                }}
                buttonText={{
                    today: 'Today',
                }}

            />
        </div>
    )
}

