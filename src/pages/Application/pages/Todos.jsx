import React, { useState } from "react";
import TextInput from '../components/TextInput';
import TaskCard from "../components/TaskCard";
import { useUser } from "../../../context/Users.context";

export default function Todos() {

    const { todo, todos, mode, setTodo, setTodos, setMode, handleTodo, handleUpdateTodo, handleDeleteTodo, todosDuplicate } = useUser();
    const [statusValue, setStatusValue] = useState("All");

    function handleInputTodo(e) {
        let todoCopy = {
            ...todo
        };
        todoCopy[e.target.id] = e.target.value;
        setTodo(todoCopy);
    }

    function handleEditTodo(data = {}) {
        setMode("edit");
        setTodo(data);
    }

    function renderCards(data = []) {
        return data.map((d, i) => (
            <TaskCard
                data={d}
                key={`${d.title}-${i}`}
                handleEdit={handleEditTodo}
                handleDeleteTodo={handleDeleteTodo}
                statusValue = {statusValue}
            />
        ));
    }

    const handleFilter = (val) => {
        setStatusValue(val)
        if (val === "Completed") {
            setTodos(todosDuplicate.filter(item => item.status === val));
        }
        else if (val === "Not Completed") {
            setTodos(todosDuplicate.filter(item => item.status === val));
        }
        else {
            setTodos([...todosDuplicate]);
        }
    }

    return (
        <div className="p-5">
            <h1 className="text-center text-3xl mb-3 font-bold">TODOS</h1>
            <div className="container-fluid">
                <div className="card shadow-lg">
                    <div className="card-body">
                        <form onSubmit={mode === "create" ? handleTodo : handleUpdateTodo}>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="col-span-3 sm:col-span-1">
                                    <TextInput
                                        label="Title"
                                        placeholder="Enter Task title here"
                                        id="title"
                                        value={todo["title"]}
                                        onChange={handleInputTodo}
                                        disabled={mode === "edit"}
                                        required={mode === "create"}
                                    />
                                </div>
                                <div className="col-span-3 sm:col-span-1">
                                    <TextInput
                                        label="Description"
                                        placeholder="Enter Task Description here"
                                        id="description"
                                        value={todo["description"]}
                                        onChange={handleInputTodo}
                                        required={true}
                                    />
                                </div>
                                <div className="col-span-3 sm:col-span-1">
                                    <div className="mb-3 text-start">
                                        <label className="form-label">
                                            Status
                                        </label>
                                        <select
                                            id="status"
                                            className="form-select"
                                            aria-label="Default select example"
                                            value={todo.status}
                                            onChange={handleInputTodo}
                                        >
                                            <option value="Not Completed">Not Completed</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="rounded-full bg-indigo-500 p-2 px-4 text-white"
                                >
                                    {mode === "create" ? "Create Task" : "Edit Task"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='mt-5 d-flex justify-end'>
                    <h4 className="pt-2">Status Filter : </h4>
                    <select
                        name="category-select-1"
                        className="form-select-sm bg-sky-400 text-white category-select ms-2"
                        id="category-select-1"
                        // value={value}
                        onChange={(e) => handleFilter(e.target.value)}>
                        <option value={"All"}>All</option>
                        <option value={"Completed"}>Completed</option>
                        <option value={"Not Completed"}>Not Completed</option>
                    </select>
                </div>
                <div className="row mt-5">
                    {todos.length > 0 ? renderCards(todos) : ""}
                </div>
            </div>
        </div>
    );
}