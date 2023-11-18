import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventsComponent = ({ events }) => {
  const navigate = useNavigate();
  return (
    <div className="widget">
      <h2 className='font-bold text-center mb-2'>EVENTS</h2>
      <ul>
        {events.length>0? events.map((event,index) => (
          <div key={index} className="card">
            <div className="card-body">
              <h5 className="card-title"><span className='uppercase font-bold'>{event.title} </span>({event.type})</h5>
              <p className="card-text">Date: {event.date}</p>
              <p className="card-text">Day: {event.day}</p>
              <p className="card-text">Details: {event.details}</p>
            </div>
          </div>
        )) :
        <div className='text-center mt-5'>
        <button onClick={()=>navigate('/ApplicationLayout/myCalendar')} className='rounded-full bg-sky-400 text-white pt-2 pb-2 ps-3 pe-3'>
        Add Events
      </button>
      </div>
        }
      </ul>
    </div>
  );
};

export default EventsComponent;
