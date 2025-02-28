import { useState } from "react";

export default function TaskCardModal({ isOpen, onClose, onSave }) {
  const [taskCardData, setTaskCardData] = useState({
    assignedTo: "",
    day: "Today",
  });

  const handleChange = (e) => {
    setTaskCardData({ ...taskCardData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!taskCardData.assignedTo) {
      alert("Please enter a name.");
      return;
    }
    
    onSave(taskCardData); // Pass data back to parent component
    setTaskCardData({ assignedTo: "", day: "Today" });
    onClose(); // Close modal
  };

  if (!isOpen) return null; // Prevent rendering if modal is closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center modal">
      <div className="bg-[#BCEE31] p-6 rounded-xl w-80 text-black">
        <h2 className="text-lg font-semibold mb-4">Create Task Card</h2>

        {/* Assigned To Input */}
        <input
          type="text"
          name="assignedTo"
          placeholder="Who is this assigned to?"
          className="w-full p-2 rounded bg-[#1D1D1D] text-white mb-5"
          value={taskCardData.assignedTo}
          onChange={handleChange}
        />

        {/* Day Dropdown */}
        <div className="mb-3">
          <label className="block text-sm mb-3">Task Day</label>
          <select
            name="day"
            className="w-full p-2 rounded bg-[#1D1D1D] text-white"
            value={taskCardData.day}
            onChange={handleChange}
          >
            <option value="Today">Today</option>
            <option value="Tomorrow">Tomorrow</option>
            <option value="Reserve">Reserve</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-3">
          <button className="px-4 py-2 bg-[#9a1818] rounded text-white" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-[#116d15] rounded text-white " onClick={handleSubmit}>
            Create Task Card
          </button>
        </div>
      </div>
    </div>
  );
}
