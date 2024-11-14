import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("All");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) {
      alert("Enter a task");
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  const checkComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditing = (id, text) => {
    setEditingTaskId(id);
    setEditingText(text);
  };

  const saveTask = (id) => {
    if (!editingText.trim()) {
      alert("Task cannot be empty!");
      return;
    }
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editingText } : task
      )
    );
    setEditingTaskId(null);
    setEditingText("");
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true;
  });

  return (
    <div className="font-lemon p-6 bg-gray-200/75 border border-black rounded shadow-[0px_10px_5px_10px_rgba(0,0,0,0.3)] w-full max-w-md mx-auto sm:max-w-lg lg:max-w-xl">
      <h1 className="text-2xl font-black text-center mb-4">To-Do List</h1>
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a task"
          className="flex-1 p-2 border rounded sm:w-auto shadow-sm shadow-black indent-2 font-lemon font-thin text-blue-700"
        />
        <button
          onClick={addTask}
          className="p-2 bg-blue-500 text-white rounded w-full sm:w-auto shadow-sm shadow-black"
        >
          Add
        </button>
      </div>

      <div className="flex justify-between mb-4 flex-wrap gap-2">
        {["All", "Completed", "Pending"].map((val) => (
          <button
            key={val}
            onClick={() => setFilter(val)}
            className={`px-3 py-1 rounded ${
              filter === val
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-blue-500 hover:text-white"
            } shadow-sm shadow-black`}
          >
            {val}
          </button>
        ))}
      </div>

      <div className="overflow-y-scroll p-2 scrollbar-custom h-[300px] sm:h-[200px] border-t border-gray-200">
        <ul className="space-y-2">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center gap-3 p-2 border-b last:border-none bg-gray-50 rounded-lg shadow-sm shadow-black"
            >
              {editingTaskId === task.id ? (
                <div className="flex items-center flex-1">
                  <textarea
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="flex-1 indent-2 text-blue-700 p-1 border-none focus:border-0 rounded mr-2"
                  />
                  <button
                    onClick={() => saveTask(task.id)}
                    className="text-green-500 hover:text-green-700"
                  >
                    <Icon
                      className="text-2xl"
                      icon="mdi:tick-box-multiple-outline"
                    />
                  </button>
                </div>
              ) : (
                <div className="flex items-center flex-1 w-full">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => checkComplete(task.id)}
                    className="mr-2 scale-125"
                  />
                  <span
                    className={`${
                      task.completed ? "line-through text-gray-500" : ""
                    } w-[240px] sm:w-[300px] md:w-[320px] lg:w-[400px] break-words`}
                  >
                    {task.text}
                  </span>
                </div>
              )}
              <div className="flex gap-2">
                {!task.completed && editingTaskId !== task.id && (
                  <button
                    onClick={() => startEditing(task.id, task.text)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Icon className="text-2xl" icon="raphael:edit" />
                  </button>
                )}
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Icon className="text-2xl" icon="mdi:remove-box" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
