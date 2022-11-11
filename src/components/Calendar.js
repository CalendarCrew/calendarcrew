import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css"
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const locales = {
    "en-US": require("date-fns/locale/en-US")
}
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

const events = [
    {
        title: "Birthday",
        allDay: true,
        start: new Date(2022,6,1),
        end: new Date(2022,6,1)
    },
    {
        title: "July 4th",
        allDay: true,
        start: new Date(2022,6,4),
        end: new Date(2022,6,4)
    },
    {
        title: "Conference",
        allDay: true,
        start: new Date(2022,6,8),
        end: new Date(2022,6,14)
    },
]


export default function Dashboard(){

    const [newEvent, setNewEvent] = useState({title: "", start:"",end:""})
    const [allEvents, setAllEvents] = useState(events)
    
    
    const handleAddEvent = () => {
        setAllEvents([...allEvents, newEvent]) // Adds new event to allEvents array
    }


    return <div className="App">
        <h1 className="calendarText">CalendarCrew</h1>
        <input type="text" placeholder="Add Event Title" style={{width: "20%", marginRight: "10px",float:"left"}}
            value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}/>
        <DatePicker placeholderText="Event Start Date" style={{marginRight: "10px",display:"flex",float:"right"}} selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})}/>
        <DatePicker placeholderText="Event End Date"  selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent, end})}/>
        <button style={{marginTop: "5px"}} onClick={handleAddEvent}>Add Event</button>
        <Calendar 
        localizer={localizer} 
        events={allEvents} startDate="start" 
        endDate="end"
        style={{height: 400, margin: "5px", color:"ivory"}}/>
    </div>;
}