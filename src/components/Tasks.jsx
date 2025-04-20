import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line, RiCheckboxCircleLine } from "react-icons/ri";
import { BsSun, BsMoon } from "react-icons/bs";

const Tasks = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("todo-tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("todo-tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleAdd = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now(), name: task, completed: false }]);
      setTask("");
    }
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleStrike = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
      <div
        className={`${
          darkMode ? "bg-black" : "bg-white"
        }  text-gray-900 dark:text-white p-6 rounded-xl shadow-xl w-full max-w-md`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2
            className={` ${
              darkMode ? "text-white" : "textlack"
            } text-2xl font-bold`}
          >
            Task Tracker
          </h2>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xl p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            title="Toggle Theme"
          >
            {darkMode ? <BsSun /> : <BsMoon />}
          </button>
        </div>

        <div className="flex mb-4">
          <input
            type="text"
            className={`flex-1 px-3 py-2 border rounded-l-lg outline-none ${
              darkMode ? "bg-white" : "bg-gray-100"
            } dark:text-white `}
            placeholder="Add new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600 transition"
          >
            Add Task
          </button>
        </div>

        <ul className="space-y-2">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No tasks yet
            </p>
          ) : (
            tasks.map((t) => (
              <li
                key={t.id}
                className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg"
              >
                <button
                  onClick={() => toggleStrike(t.id)}
                  className="text-green-600 hover:text-green-800 text-lg"
                >
                  <RiCheckboxCircleLine size={20} />
                </button>

                <span
                  className={`flex-1 px-2 ${
                    t.completed
                      ? "line-through text-red-400 italic font-semibold"
                      : "text-black dark:text-white font-semibold"
                  }`}
                >
                  {t.name}
                </span>

                <button
                  onClick={() => handleDelete(t.id)}
                  className="text-red-500 hover:text-red-700 text-lg"
                >
                  <RiDeleteBin6Line size={20} />
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Tasks;
