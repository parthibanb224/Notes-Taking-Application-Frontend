import React from "react";

export default function TaskCard({
  data = {},
  handleEdit = (e) => {},
  handleDeleteTodo = (e) => {},
  statusValue = "",
}) {
  return (
    <div className="col-md-4 gy-3">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <h4><span className="font-bold">Title:</span> {data.title}</h4>
            <p><span className="font-bold">Description:</span> {data.description}</p>
            <p><span className="font-bold">Status:</span> {data.status}</p>
            {statusValue==='All' ?
              <div
              className="btn-group mt-3"
              role="group"
              aria-label="Basic mixed styles example"
            >
              <button
                type="button"
                className="btn btn-info me-2"
                id="editButton"
                onClick={() => handleEdit(data)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => handleDeleteTodo(data.title)}
              >
                Delete
              </button>
            </div>
            :
            ""  
          }
          </div>
        </div>
      </div>
    </div>
  );
}
