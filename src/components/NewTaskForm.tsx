import axios from "axios";
import { useCallback } from "react";
import { useEffect, useState } from "react";

import { generateRandomNumber } from "../units/generateRandomNumber";

const NewTaskForm = () => {
  const [userTasks, setUserTasks] = useState([]);
  const mainURL = "http://localhost:4000/users";
  const userID = +localStorage.getItem("userId");

  const [taskName, setTaskName] = useState("");
  const [taskType, setTaskType] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [newTaskForm, setNewTaskForm] = useState(false);

  const getUserTasks = useCallback(async () => {
    await axios.get(mainURL).then((res) => {
      const userID = +localStorage.getItem("userId");
      const userIndex = res.data.findIndex((user) => user.id === userID);
      const userTsks = [...res.data[userIndex].tasks];
      setUserTasks(userTsks);
    });
  }, []);

  useEffect(() => {
    getUserTasks();
  }, [getUserTasks]);

  const addTaskHandler = async (event) => {
    debugger;
    event.preventDefault();

    const clonedTasks = [...userTasks];
    const newTask = {
      id: generateRandomNumber(),
      taskname: taskName,
      tasktype: taskType,
      taskdate: taskDate,
      status: "pending",
    };
    const allUserTasks = [...clonedTasks, newTask];

    await axios
      .patch(`${mainURL}/${userID}`, { tasks: allUserTasks })
      .then((res) => {
        setUserTasks(allUserTasks);
        setTaskName("");
        setTaskDate("");
        setTaskType("");
      });
  };

  const openTaskFormHandler = () => {
    setNewTaskForm(!newTaskForm);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary float-end"
        onClick={openTaskFormHandler}
      >
        {newTaskForm ? "Cancel" : "Add Task"}
      </button>
      {newTaskForm && (
        <form onSubmit={addTaskHandler}>
          <h3 className="text-center">Add New Task</h3>
          <div className="mb-3">
            <label className="form-label">Task Title</label>
            <input
              type="text"
              className="form-control"
              value={taskName}
              required
              placeholder="Task title"
              onChange={(event) => setTaskName(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Task Date</label>
            <input
              type="date"
              className="form-control"
              value={taskDate}
              required
              onChange={(event) => setTaskDate(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Task Type</label>
            <select
              className="form-select"
              value={taskType}
              required
              onChange={(event) => setTaskType(event.target.value)}
            >
              <option>Open this select menu</option>
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Save Task
          </button>
        </form>
      )}
    </>
  );
};

export default NewTaskForm;
