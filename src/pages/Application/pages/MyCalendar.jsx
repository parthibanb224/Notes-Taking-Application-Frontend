import React from 'react';
import EventForm from '../components/EventForm';
import EditEventForm from '../components/EditEventForm';
import { useUser } from '../../../context/Users.context';
import EventCalendar from '../components/EventCalendar';


const MyCalendar = () => {

  const { events, editEvent, handleCalendarEdit, handleCalendarDelete } = useUser();

  return (
    <div className="App">
      <h1 className='text-3xl text-center mt-2 mb-4 font-bold'>Event Manager</h1>
      <div className="grid grid-cols-3 gap-3">

        {/* Event Form */}
        <div className="col-span-3 sm:col-span-1 pl-4">
          <EventForm />
        </div>

        {/* Calendar */}
        <div className="col-span-3 sm:col-span-1">
          <EventCalendar calendarEvent={handleCalendarEdit} />
        </div>

        {/* Events List */}
        <div className="col-span-3 sm:col-span-1">
          {events.length > 0 &&
            <div className="bg-gray-100 p-4 rounded shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-center">Events List</h2>
              <ul className="mt-4">
                {events.map((event, index) => (
                  <li key={index} className="flex items-center justify-between border-b p-2">
                    <div>{event.title} - {event.date}</div>
                    <div>
                      <button onClick={() => handleCalendarEdit(event)} className="bg-indigo-500 text-white p-2 me-2 rounded hover:bg-red-700">
                        Edit
                      </button>
                      <button onClick={() => handleCalendarDelete(event)} className="bg-red-500 text-white p-2 rounded hover:bg-red-700">
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          }
        </div>

        {/* Edit Event Form in popup */}
        {editEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Edit Event</h2>
              <EditEventForm />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCalendar;
