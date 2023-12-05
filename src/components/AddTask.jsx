import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, resetFilters, filterTasks } from "../features/task/taskSlice";
import {
  getTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from "../utility/helper";

const AddTask = () => {
  const { taskEditing } = useSelector((state) => state.task);
  const [value, setValue] = useState("");
  const [filtering, setFiltering] = useState(true);

  const dispatch = useDispatch();

  //handle user input from the input field
  const handleInput = (event) => {
    setValue(event.target.value);
  };

  const handleCreateNewTask = () => {
    // dispatch action here
    // reject code for validation
    if (/^\s*$/.test(value)) {
      return;
    }

    dispatch(addTask(value));
    setValue("");
  };

  // handle filtering based on completed/pending
  const handleFilterTasks = (params) => {
    setFiltering(false);
    let storedTasks = getTasksFromLocalStorage();
    let tempTasks = storedTasks.filter((item) => item.isDone === params);
    dispatch(filterTasks(tempTasks));
  };

  React.useEffect(() => {
    setValue(taskEditing.description || " ");
  }, [taskEditing.id]);

  const saveEditedTask = () => {
    if (/^\s*$/.test(value)) {
      return;
    }
    let storedTasks = getTasksFromLocalStorage();
    console.log(storedTasks);
    let result = storedTasks.map((item) => {
      if (item.id === taskEditing.id) {
        console.log(item);
        item.description = value;
      }
      return item;
    });

    saveTasksToLocalStorage(result);
    dispatch(resetFilters());
    setValue("");
    dispatch(editSelectedTask(""));
  };

  return (
    <div>
      {/* create post section */}
      <section className="space-x-4">
        <input
          onChange={handleInput}
          value={value}
          className="border-2 border-red-500"
        />
        {filtering || taskEditing ? (
          taskEditing ? (
            <button onClick={saveEditedTask}>Save Edit</button>
          ) : (
            <button
              onClick={handleCreateNewTask}
              className="bg-red-500 rounded-md px-2 text-white hover:bg-red-800"
            >
              Create Todo
            </button>
          )
        ) : null}
      </section>
      {/* *********************** */}

      {/* filter post section */}
      <section className="flex gap-3 items-center my-3">
        <p className="font-bold">Filter: </p>
        {/* show all tasks */}
        <button
          onClick={() => {
            dispatch(resetFilters());
            setFiltering(true);
          }}
          className="bg-blue-500 hover:bg-blue-800 px-2 rounded-md text-white"
        >
          All
        </button>

        {/* filter pending tasks */}
        <button
          onClick={() => handleFilterTasks(false)}
          className="bg-orange-500 hover:bg-orange-800 px-2 rounded-md text-white"
        >
          Pending
        </button>
        {/* filter completed tasks */}
        <button
          onClick={() => handleFilterTasks(true)}
          className="bg-green-500 hover:bg-green-800 px-2 rounded-md text-white"
        >
          Completed
        </button>
      </section>
      {/* ******************************** */}
    </div>
  );
};

export default AddTask;
