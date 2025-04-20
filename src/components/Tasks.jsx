import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line, RiCheckboxCircleLine } from "react-icons/ri";

const Tasks = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("todo-tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("todo-tasks", JSON.stringify(tasks));
  }, [tasks]);

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-start">Task Tracker</h2>

        <div className="flex mb-4">
          <input
            type="text"
            className="flex-1 px-3 py-2 border rounded-l-lg outline-none"
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
            <p className="text-center text-gray-500">No tasks yet</p>
          ) : (
            tasks.map((t) => (
              <li
                key={t.id}
                className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg"
              >
                <button
                  onClick={() => toggleStrike(t.id)}
                  className="text-green-600 hover:text-green-800 px-2 py-1 text-sm"
                >
                  <RiCheckboxCircleLine size={20} />
                </button>
                <span
                  className={`flex-1 ${
                    t.completed
                      ? "line-through text-red-500 italic font-semibold text-md"
                      : "text-black font-semibold text-md"
                  }`}
                >
                  {t.name}
                </span>

                <div className="flex justify-between items-center gap-2 ml-4">
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="text-red-500 hover:text-red-700 text-lg"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Tasks;
