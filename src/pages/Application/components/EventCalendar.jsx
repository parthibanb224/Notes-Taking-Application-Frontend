import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useUser } from '../../../context/Users.context';

const localizer = momentLocalizer(moment);

export default function EventCalendar({ calendarEvent }) {

  const { events } = useUser();

  return (
    <div className="bg-gray-100 p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Event Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor={(events) => { return new Date(events.start) }}
        endAccessor={(events) => { return new Date(events.start) }}
        style={{ height: 400 }}
        onSelectEvent={(events) => { calendarEvent(events) }}
        views={['month', 'week', 'day']}
      />
    </div>
  );
}


// startAccessor={(event) => { return moment(event.start) }}