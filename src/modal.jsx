import { useState } from "react";

export default function Modal({ isOpen, onClose, onSave }) {
  const [taskData, setTaskData] = useState({
    name: "",
    type: "Match",
    priority: "High",
  });

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!taskData.name) {
      alert("Please enter a name.");
      return;
    }

    onSave(taskData); // Pass data back to parent component
    setTaskData({ name: "", type: "Match", priority: "High" }); 
    onClose(); // Close modal
  };

  if (!isOpen) return null; // Prevent rendering if modal is closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 shadow-2xl flex items-center justify-center modal">
      <div className="bg-[#BCEE31] p-6 rounded-xl w-80 text-black">
        <h2 className="text-lg font-semibold mb-4">Add Task</h2>

        {/* Name Input */}
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          className="w-full p-2 rounded bg-[#1D1D1D] text-white mb-3"
          value={taskData.name}
          onChange={handleChange}
        />

        {/* Type Dropdown */}
        <div className="mb-3">
          <label className="block text-sm mb-1">Type</label>
          <select
            name="type"
            className="w-full p-2 rounded bg-[#1D1D1D] text-white"
            value={taskData.type}
            onChange={handleChange}
          >
            <option value="Match">Match</option>
            <option value="Full">Full</option>
          </select>
        </div>

        {/* Priority Dropdown */}
        <div className="mb-3">
          <label className="block text-sm mb-1">Priority</label>
          <select
            name="priority"
            className="w-full p-2 rounded bg-[#1D1D1D] text-white"
            value={taskData.priority}
            onChange={handleChange}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 bg-[#000] rounded text-white" onClick={onClose}>
            Delete Card
          </button>
          <button className="px-4 py-2 bg-[#9a1818] rounded text-white" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-[#116d15] rounded text-white" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
