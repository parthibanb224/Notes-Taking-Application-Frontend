// EventForm.js
import React, { useState } from 'react';
import { useUser } from '../../../context/Users.context';

const EventForm = () => {
  const { addEvent } = useUser();

  const [event, setEvent] = useState({
    title: '',
    date: '',
    time: '',
    type: 'appointment', // Default event type
    details: '',
    start: Date,
    end: Date,
    day: '',
  });

  const handleChange = (e) => {
    const [year, month, day] = event.date.split('-').map(Number);
    const [hour, minute] = event.time.split(':').map(Number);
    const start = new Date(year, month - 1, day, hour, minute);
    const end = new Date(year, month - 1, day, hour, minute);

    const dates = new Date(event.date);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = daysOfWeek[dates.getUTCDay()]; // Get the day of the week
    
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value, start: start, end: end, day: dayOfWeek });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addEvent(event);
    setEvent({
      title: '',
      date: '',
      time: '',
      type: 'appointment',
      details: ''
    });
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">Add Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block text-gray-700">Title:</label>
          <input
            type="text"
            name="title"
            value={event.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Date:</label>
          <input
            type="date"
            name="date"
            value={event.date}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Time:</label>
          <input
            type="time"
            name="time"
            value={event.time}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Type:</label>
          <select
            name="type"
            value={event.type}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="appointment">Appointment</option>
            <option value="event">Event</option>
            <option value="task">Task</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Details</label>
          <input
            type="text"
            name="details"
            value={event.details}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className='text-center'>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          >
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
