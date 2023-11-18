import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import TasksComponent from '../components/TaskComponent';
import EventsComponent from '../components/EventsComponent';
import EventCalendar from '../components/EventCalendar';
import Weather from '../components/Weather';
import TimeDateDisplay from '../components/TimeDateDisplay';
import { useUser } from '../../../context/Users.context';

const Dashboard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { todos, events } = useUser();

  const openPopup = (event) => {
    setSelectedEvent(event);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedEvent(null);
    setIsPopupOpen(false);
  };

  // // Sample data for events and tasks (replace with your data or use state management)
  // const [events, setEvents] = useState([
  //   { id: 1, title: 'Meeting with Client', date: '2020-09-11', time: '14:00', location: 'Zoom' },
  //   { id: 2, title: 'Doctor Appointment', date: '2023-09-12', time: '10:30', location: 'Medical Center' },
  //   // Add more events as needed
  // ]);

  // const [tasks, setTasks] = useState([
  //   { id: 1, text: 'Prepare presentation for meeting', completed: false },
  //   { id: 2, text: 'Buy groceries', completed: true },
  //   // Add more tasks as needed
  // ]);

  // Chart data for event distribution
  const monDays = events.filter(eve => eve.day === 'Monday');
  const tueDays = events.filter(eve => eve.day === 'Tuesday');
  const wedDays = events.filter(eve => eve.day === 'Wednesday');
  const thursDays = events.filter(eve => eve.day === 'Thursday');
  const friDays = events.filter(eve => eve.day === 'Friday');
  const saturDays = events.filter(eve => eve.day === 'Saturday');
  const sunDays = events.filter(eve => eve.day === 'Sunday');
  const eventDistributionData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Events',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: [monDays.length, tueDays.length, wedDays.length, thursDays.length, friDays.length, saturDays.length, sunDays.length], // Replace with your event data
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'category', // Use 'category' scale for the x-axis
        labels: eventDistributionData.labels,
      },
      y: {
        beginAtZero: true, // Start the y-axis at zero
      },
    },
  };

  // Calculate task completion rate
  const completedTasks = todos.filter((task) => task.status === 'Completed').length;
  const totalTasks = todos.length;
  const taskCompletionRateData = {
    labels: ['Completed', 'Not Completed'],
    datasets: [
      {
        data: [completedTasks, totalTasks - completedTasks],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const eventCategories = [...new Set(events.map((event) => event.type))];
  const eventCategoryData = {
    labels: eventCategories,
    datasets: [
      {
        label: 'Event Categories',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(150, 204, 204, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(150, 204, 204, 1)',
        ],
        borderWidth: 1,
        data: eventCategories.map((category) => events.filter((event) => event.type === category).length),
      },
    ],
  };

  // // Calculate task priority distribution
  // const taskPriorities = [...new Set(tasks.map((task) => task.priority))];
  // const taskPriorityData = {
  //   labels: taskPriorities,
  //   datasets: [
  //     {
  //       label: 'Task Priorities',
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //       ],
  //       borderColor: [
  //         'rgba(255, 99, 132, 1)',
  //         'rgba(54, 162, 235, 1)',
  //       ],
  //       borderWidth: 1,
  //       data: taskPriorities.map((priority) => tasks.filter((task) => task.priority === priority).length),
  //     },
  //   ],
  // };

  const Notification = ({ message, onClose }) => {
    return (
      <div className="notification">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-2">
      <div className="w-full sm:w-full bg-gray-300 rounded-lg flex justify-center items-center text-center shadow-md mb-3">
        <div className='pt-5 pb-5'>
          <h1 className="display-4 font-bold">NOTES-TAKING APPLICATION</h1>
          <p className="lead mt-2">Effortlessly capture and organize thoughts with our sleek Notes Taker app.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 sm:col-span-1 flex justify-center items-center">
          <div className='grid grid-rows-2 gap-4'>
            <div className='bg-white rounded-lg shadow-md my-auto'><TimeDateDisplay /></div>
            <div className='bg-white rounded-lg shadow-md'><Weather /></div>
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1 bg-white p-6 rounded-lg shadow-md">
          <EventCalendar calendarEvent={openPopup} />
          {isPopupOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Event Details</h2>
                <p className="text-gray-700"><strong>Title:</strong> {selectedEvent.title}</p>
                <p className="text-gray-700"><strong>Date:</strong> {selectedEvent.date}</p>
                <p className="text-gray-700"><strong>Time:</strong> {selectedEvent.time}</p>
                <p className="text-gray-700"><strong>Details:</strong> {selectedEvent.details}</p>
                <button
                  onClick={closePopup}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded mt-4"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {/* Tasks Component */}
        <div className="col-span-2 sm:col-span-1 bg-white p-5 h-96 overflow-y-auto rounded-lg shadow-md">
          <TasksComponent tasks={todos} />
        </div>

        {/* Task Completion Rate Chart */}
        <div className="col-span-2 sm:col-span-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Task Completion Rate</h2>
          <div className="w-full h-64 flex justify-center items-center">
            <Pie data={taskCompletionRateData} />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {/* Events Component */}
        <div className="col-span-2 sm:col-span-1 bg-white p-5 h-screen overflow-y-auto rounded-lg shadow-md">
          <EventsComponent events={events} />
        </div>
        {/* Event Distribution Chart */}
        <div className="col-span-2 sm:col-span-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Event Distribution</h2>
          <div className="w-full h-64 flex justify-center items-center">
            <Bar data={eventDistributionData} options={chartOptions} />
          </div>
          <h2 className="text-xl font-semibold mb-4 mt-5">Event Category Distribution</h2>
          <div className="w-full h-64 flex justify-center items-center">
            <Pie data={eventCategoryData} />
          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-6">

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Task Priority Distribution</h2>
          <div className="w-full h-64 flex justify-center items-center">
            <Bar data={taskPriorityData} options={chartOptions} />
          </div>
        </div>
      </div> */}

    </div>
  );
};

export default Dashboard;
