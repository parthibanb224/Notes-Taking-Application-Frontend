import React from 'react';
import { useNavigate } from 'react-router-dom';

const TasksComponent = ({ tasks }) => {

  const navigate = useNavigate();

  return (
    <div className="widget">
      <h2 className='font-bold text-center mb-2'>TODOS</h2>
      <ul>
        {tasks.length > 0 ? tasks.map((task, index) => (
          <div key={index} className='card flex'>
            <div className="card-body">{task.title}</div>
          </div>
        )) :
          <div className='text-center mt-5'>
            <button onClick={()=>navigate('/ApplicationLayout/Todos')} className='rounded-full bg-sky-400 text-white pt-2 pb-2 ps-3 pe-3'>
            Add Tasks
          </button>
          </div>
        }
      </ul>
    </div>
  );
};

export default TasksComponent;
