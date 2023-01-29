import axios from "axios";
import { useEffect, useState } from "react";
const mainURL = "http://localhost:4000/users";
const userID = +localStorage.getItem("userId");

const TasksList = () => {
  const [userTasks, setUserTasks] = useState([]);
  const [editTaskModal, setEditTaskModal] = useState(false);

  useEffect(() => {
    getUserTasks();
  }, []);

  const getUserTasks = async () => {
    await axios.get(mainURL).then((res) => {
      const userIndex = res.data.findIndex((user) => user.id === userID);
      const userTsks = [...res.data[userIndex].tasks];
      setUserTasks(userTsks);
    });
  };


  const deleteTaskHandler = async (taskId) => {
    const taskIndex = userTasks.findIndex((task) => task.id === taskId);
    const clonedTasks = [...userTasks];
    clonedTasks.splice(taskIndex, 1);

    await axios
      .patch(`${mainURL}/${userID}`, { tasks: clonedTasks })
      .then((res) => {
        setUserTasks(clonedTasks);
      });
  };

  const doneTaskhandler = async (taskId) => {
    const selectedTask = userTasks.find((task) => task.id === taskId);
    const selectedTaskIndex = userTasks.findIndex((task) => task.id === taskId);
    const clonedTasks = [...userTasks];
    clonedTasks[selectedTaskIndex] = { ...selectedTask, status: "done" };

    await axios
      .patch(`${mainURL}/${userID}`, { tasks: clonedTasks })
      .then((res) => {
        console.log(res);
        setUserTasks(clonedTasks);
      });
  };

  const openModalHandler = (tasks) => {
    setEditTaskModal(true);
  };

  const closeModalHandler = () => {
    setEditTaskModal(false);
  };

  const addTaskHandler = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <h3 className="text-center mb-5">User Tasks</h3>
      {userTasks && userTasks.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Task Name</th>
              <th scope="col">Task Date</th>
              <th scope="col">Task Type</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userTasks.map((task) => {
              return (
                <tr
                  key={task.id}
                  className={task.status === "done" ? "bg-success" : null}
                >
                  <td>{task.taskname}</td>
                  <td>{task.taskdate}</td>
                  <td>{task.tasktype}</td>
                  <td>
                    <i
                      className="bi bi-pencil px-1"
                      onClick={() => openModalHandler(task)}
                    ></i>
                    <i
                      className="bi bi-trash3 px-1"
                      onClick={() => deleteTaskHandler(task.id)}
                    ></i>
                    <i
                      className="bi bi-check-lg px-1"
                      onClick={() => doneTaskhandler(task.id)}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h1 className="text-center">This user hasn't tasks yet!</h1>
      )}

      {editTaskModal && (
        <div className="">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Edit Task</h4>
              </div>

              <div className="modal-body">
                <form className="ms" onSubmit={addTaskHandler}>
                  <div className="mb-3">
                    <label className="form-label">Task Title</label>
                    <input
                      type="text"
                      className="form-control"
                      //value={taskName}
                      required
                      //onChange={(event) => setTaskName(event.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Task Date</label>
                    <input
                      type="date"
                      className="form-control"
                      //value={taskDate}
                      required
                      // onChange={(event) => setTaskDate(event.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Task Type</label>
                    <select
                      className="form-select"
                      // value={taskType}
                      required
                      // onChange={(event) => setTaskType(event.target.value)}
                    >
                      <option>Open this select menu</option>
                      <option value="Personal">Personal</option>
                      <option value="Work">Work</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary mx-2">
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                    onClick={closeModalHandler}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TasksList;
