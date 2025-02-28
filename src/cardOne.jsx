import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase.js";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Flag, Settings, Trash2, Repeat, Plus } from "lucide-react";
import matchIcon from "./images/match.png";
import fullIcon from "./images/full.png";
import "./index.css";
import Modal from "./modal.jsx";

const priorityLevels = ["High", "Medium", "Low"];
const priorityColors = {
  High: "bg-red-500",
  Medium: "bg-yellow-500",
  Low: "bg-green-500",
};

const defaultTasks = [
  {
    id: "default-1",
    name: "N'Golo Kante",
    priority: "High",
    type: "Match",
    typeImage: matchIcon,
  },
  {
    id: "default-2",
    name: "Andriy Lunin",
    priority: "Medium",
    type: "Full",
    typeImage: fullIcon,
  },
  {
    id: "default-3",
    name: "Mykhalio Mudryk",
    priority: "Low",
    type: "Match",
    typeImage: matchIcon,
  },
];

export default function CardOne() {
  const [selectedTab, setSelectedTab] = useState("Today");
  const [users, setUsers] = useState([...defaultTasks]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const fetchedUsers = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          typeImage: doc.data().type === "Match" ? matchIcon : fullIcon,
        }));
        setUsers(prevUsers => [...defaultTasks, ...fetchedUsers]);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const addUser = async (newUser) => {
    try {
      const docRef = await addDoc(collection(db, "users"), newUser);
      setUsers(prevUsers => [...prevUsers, { id: docRef.id, ...newUser }]);
      setIsModalOpen(false);
      alert(`Task: ${newUser.name} added to task card`)
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Check Firebase rules.");
    }
  };

  const handlePriorityChange = async (id, currentPriority) => {
    const newPriority = priorityLevels[(priorityLevels.indexOf(currentPriority) + 1) % priorityLevels.length];
    await updateDoc(doc(db, "users", id), { priority: newPriority });
    setUsers(users.map(user => (user.id === id ? { ...user, priority: newPriority } : user)));
  };

  const handleTypeChange = async (id, currentType) => {
    const newType = currentType === "Match" ? "Full" : "Match";
    const newIcon = newType === "Match" ? matchIcon : fullIcon;
    await updateDoc(doc(db, "users", id), { type: newType, typeImage: newIcon });
    setUsers(users.map(user => (user.id === id ? { ...user, type: newType, typeImage: newIcon } : user)));
  };

  const handleDelete = async (id) => {
    setUsers(users.filter(user => user.id !== id));
    if (!id.startsWith("default")) {
      await deleteDoc(doc(db, "users", id));
    }
  };

  return (
    <div className="bg-[#1D1D1D] text-[#A6A6A6] p-4 w-80 mx-auto rounded-2xl max-h-[32rem] overflow-y-auto custom-scrollbar">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Tim Smith</h2>
        <button className="flex rounded-full bg-[#2B2B2B] p-2" onClick={() => setIsModalOpen(true)}>
          <Plus size={20} />
        </button>
      </div>

      <div className="flex gap-2 mt-4">
        {["Today", "Tomorrow", "Reserve"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-1 rounded-full text-sm ${selectedTab === tab ? "bg-[#2B2B2B] text-[#FFFF]" : "bg-none"}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {users.map((user) => (
          <div key={user.id} className="bg-[#2B2B2B] p-4 rounded-xl relative">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <Menu as="div" className="ml-auto relative">
                <MenuButton className="p-2 rounded-full hover:bg-gray-700">
                  <Settings size={18} />
                </MenuButton>
                <MenuItems className="absolute right-0 mt-2 w-40 bg-black shadow-lg rounded-xl p-2 z-10">
                  <MenuItem>
                    {({ active }) => (
                      <button className={`flex items-center w-full p-2 rounded-md text-sm gap-1 ${active ? "bg-gray-700" : ""}`} onClick={() => handlePriorityChange(user.id, user.priority)}>
                        <Flag size={12} /> Change priority
                      </button>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button className={`flex items-center gap-2 w-full p-2 rounded-md ${active ? "bg-gray-700" : ""}`} onClick={() => handleTypeChange(user.id, user.type)}>
                        <Repeat size={12} /> Change type
                      </button>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button className={`flex items-center gap-2 w-full p-2 rounded-md text-red-500 ${active ? "bg-red-700 text-white" : ""}`} onClick={() => handleDelete(user.id)}>
                        <Trash2 size={12} /> Delete
                      </button>
                    )}
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
            <div className="flex justify-between mt-2 flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400">Priority</p>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full text-white ${priorityColors[user.priority]}`}>{user.priority}</span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <p className="text-xs text-gray-400">Type</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-white">{user.type}</span>
                  <img src={user.typeImage} alt={user.type} className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={addUser} />
    </div>
  );
}

// import { Link } from "react-router-dom";
// import hamburger from "./images/hamburger.png";

// const Reports = ({ toggleAside }) => {
//   return (
//     <div>
//       {/* Header */}
//       <div className="flex justify-between border border-x-0 border-b-[#1D1D1D] border-b-2 p-2 border-t-0">
//         <h1 className="text-lg lg:text-2xl font-semibold flex items-center">Reports</h1>

//         {/* Hamburger Icon */}
//         <img 
//           src={hamburger} 
//           alt="hamburger icon" 
//           className="h-6 flex cursor-pointer lg:hidden" 
//           onClick={toggleAside} 
//         />

//         {/* Navigation Links */}
//         <div className="hidden lg:flex gap-7">
//           <Link to="/dashboard" className="text-white rounded-3xl py-2 px-3">Scouting Plan</Link>
//           <Link to="/reports" className="rounded-3xl py-2 px-3 text-black bg-[#BCEE31]">Report Statistics</Link>
//         </div>
//       </div>

//       {/* Content Placeholder */}
//       <div className="p-5 text-white">
//         <h2 className="text-xl font-semibold">Reports Overview</h2>
//         <p className="mt-2 text-gray-400">This section will display reports and analytics.</p>
//       </div>

//       <div>
        
//       </div>
//     </div>
//   );
// };

// export default Reports;

