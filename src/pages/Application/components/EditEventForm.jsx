import React, { useState, useEffect } from 'react';
import { useUser } from '../../../context/Users.context';

const EditEventForm = () => {
  // Use local state to manage the form data
  const {handleCalendarCancelEdit,handleCalendarSaveEdit,editEvent} = useUser();
  const [editedEvent, setEditedEvent] = useState({ ...editEvent });

  // Update local state when the event prop changes
  useEffect(() => {
    setEditedEvent({ ...editEvent });
  }, [editEvent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({ ...editedEvent, [name]: value });
  };

  const handleSave = (event) => {
    const [year, month, day] = editedEvent.date.split('-').map(Number);
    const [hour, minute] = editedEvent.time.split(':').map(Number);
    const start = new Date(year, month - 1, day, hour, minute);
    const end = new Date(year, month - 1, day, hour, minute);

    const dates = new Date(editedEvent.date);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = daysOfWeek[dates.getUTCDay()]; // Get the day of the week

    event.preventDefault();
    handleCalendarSaveEdit({...editedEvent, start: start, end: end, day: dayOfWeek }); // Pass the edited event data back to the parent component
    handleCalendarCancelEdit();
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Edit Event</h2>
      <form onSubmit={handleSave}>
        <div className="mb-2">
          <label className="block text-gray-700">Title:</label>
          <input
            type="text"
            name="title"
            value={editedEvent.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            disabled
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Date:</label>
          <input
            type="date"
            name="date"
            value={editedEvent.date}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Time:</label>
          <input
            type="time"
            name="time"
            value={editedEvent.time}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Type:</label>
          <select
            name="type"
            value={editedEvent.type}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="appointment">Appointment</option>
            <option value="event">Event</option>
            <option value="task">Task</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Details:</label>
          <input
            type="text"
            name="details"
            value={editedEvent.details}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded hover:bg-green-700 mr-2"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleCalendarCancelEdit}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditEventForm;
