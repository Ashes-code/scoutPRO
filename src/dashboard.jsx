import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase.js"; 
import leftIcon from "./images/vector.png";
import rightIcon from "./images/vector (1).png";
import CardOne from "./cardOne.jsx";
import hamburger from "./images/hamburger.png";
import { Plus } from "lucide-react";
import TaskCardModal from "./taskModal.jsx";
import Modal from "./modal.jsx";
import matchIcon from "./images/match.png";
import fullIcon from "./images/full.png";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Flag, Settings, Trash2, Repeat } from "lucide-react";
import Loader from "./loader";

const Dashboard = ({ toggleAside }) => {
  const scrollContainerRef = useRef(null);
  const [taskCards, setTaskCards] = useState([]);
  const [currentTaskCardId, setCurrentTaskCardId] = useState(null);
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [isTaskCardModalOpen, setIsTaskCardModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const priorityLevels = ["High", "Medium", "Low"];
  const priorityColors = {
    High: "bg-red-500",
    Medium: "bg-yellow-500",
    Low: "bg-green-500",
  };

  // Fetch task cards from Firestore
  useEffect(() => {
    const fetchTaskCards = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "taskCards"));
        setTaskCards(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching task cards:", error);
      }finally {
        setLoading(false);
      }
    };
    fetchTaskCards();
  }, []);

  // Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const fetchedUsers = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          typeImage: doc.data().type === "Match" ? matchIcon : fullIcon,
        }));
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Function to add a new user
  const addUser = async (newUser) => {
    if (!currentTaskCardId) {
      alert("Error: No task card selected.");
      return;
    }
    setLoading(true);
  
    try {
      const taskDocRef = doc(db, "taskCards", currentTaskCardId);
  
      // Find the correct task card
      const selectedTaskCard = taskCards.find(card => card.id === currentTaskCardId);
      
      // Ensure tasks array exists before updating
      const updatedTasks = [...(selectedTaskCard?.tasks || []), { id: Date.now().toString(), ...newUser }];
      
      // Update Firestore document
      await updateDoc(taskDocRef, { tasks: updatedTasks });
  
      // Update state to reflect the change
      setTaskCards(prevCards =>
        prevCards.map(card =>
          card.id === currentTaskCardId ? { ...card, tasks: updatedTasks } : card
        )
      );
  
      alert(`Task: ${newUser.name} added to ${selectedTaskCard.assignedTo}'s card.`);
      setIsModalOpen(false);
      setCurrentTaskCardId(null); // Reset selection
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Check Firebase rules.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const userRef = doc(db, "users", id);
      const userSnap = await getDoc(userRef);
  
      if (!userSnap.exists()) {
        console.error(`User with ID ${id} does not exist in Firestore.`);
        alert("Error: User does not exist.");
        return;
      }
  
      await deleteDoc(userRef);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
    setLoading(false);
  };
  

  const handlePriorityChange = async (id, currentPriority) => {
    try {
      const userRef = doc(db, "users", id);
      const userSnap = await getDoc(userRef); // Check if the document exists
  
      if (!userSnap.exists()) {
        console.error(`User with ID ${id} does not exist in Firestore.`);
        alert("Error: User does not exist.");
        return;
      }
  
      const newPriority = priorityLevels[(priorityLevels.indexOf(currentPriority) + 1) % priorityLevels.length];
  
      await updateDoc(userRef, { priority: newPriority });
  
      setUsers(users.map(user => (user.id === id ? { ...user, priority: newPriority } : user)));
    } catch (error) {
      console.error("Error updating priority:", error);
      alert("Failed to update priority.");
    }
  };

  const handleTypeChange = async (id, currentType) => {
    try {
      const userRef = doc(db, "users", id);
      const userSnap = await getDoc(userRef);
  
      if (!userSnap.exists()) {
        console.error(`User with ID ${id} does not exist in Firestore.`);
        alert("Error: User does not exist.");
        return;
      }
  
      const newType = currentType === "Match" ? "Full" : "Match";
      const newIcon = newType === "Match" ? matchIcon : fullIcon;
  
      await updateDoc(userRef, { type: newType, typeImage: newIcon });
  
      setUsers(users.map(user => (user.id === id ? { ...user, type: newType, typeImage: newIcon } : user)));
    } catch (error) {
      console.error("Error updating type:", error);
      alert("Failed to update type.");
    }
  };

  

  // Scroll functions
  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  // Function to add a new task card
  const addTaskCard = async (newCard) => {
    try {
      console.log("New Task Card:", newCard);
      const docRef = await addDoc(collection(db, "taskCards"), newCard);
      setTaskCards(prevCards => [...prevCards, { id: docRef.id, ...newCard }]);
      setIsTaskCardModalOpen(false); // FIXED: Correct modal state
    } catch (error) {
      console.error("Error adding task card:", error);
      alert("Failed to add task card. Check Firebase rules.");
    }
  };

  return (
    <div className="h-screen">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Loader />
        </div>
      )}
      <div className="flex justify-between border border-x-0 border-b-[#1D1D1D] border-b-2 p-2 border-t-0">
        <h1 className="text-lg lg:text-2xl font-semibold flex items-center">Dashboard</h1>
        <img src={hamburger} alt="hamburger icon" className="h-6 flex cursor-pointer lg:hidden" onClick={toggleAside} />
        <div className="hidden lg:flex gap-7">
          <Link to="/dashboard" className="text-black bg-[#BCEE31] flex items-center rounded-3xl py-2 px-3">Scouting Plan</Link>
          <Link to="/reports" className="rounded-3xl py-2 px-3 flex items-center">Report Statistics</Link>
        </div>
      </div>
      
      {/* Scouting Plan Section */}
      <div className="flex justify-between p-3">
        <h3>Scouting Plan</h3>
        <div className="flex gap-3">
          <button onClick={scrollLeft}><img src={rightIcon} alt="Next" className="bg-[#1D1D1D] rounded-full py-2 px-3" /></button>
          <button onClick={scrollRight}><img src={leftIcon} alt="Previous" className="bg-[#BCEE31] rounded-full py-2 px-3" /></button>
        </div>
      </div>

      {/* Card Container */}
      <div ref={scrollContainerRef} className="max-w-full overflow-x-auto custom-scrollbar scroll-smooth scrollbar-hide">
        <div className="flex gap-8 w-max">
          <CardOne />

          
          {taskCards.map((card) => (
            <div key={card.id} className="bg-[#1D1D1D] p-4 w-80 rounded-2xl mx-auto max-h-[32rem] overflow-y-auto text-white custom-scrollbar">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{card.assignedTo}</h3>
                <button
                  className="flex bg-[#2B2B2B] p-2 rounded-full"
                  onClick={() => {
                    setIsModalOpen(true);
                    setCurrentTaskCardId(card.id); // Track which card the modal was opened for
                  }}
                >
                  <Plus size={20} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mt-4">
                {["Today", "Tomorrow", "Reserve"].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-1 rounded-full text-sm ${card.day === tab ? "bg-[#2B2B2B] text-[#FFFF]" : "bg-none"}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Task List */}
              <div className="mt-4">
                {card.tasks && card.tasks.length > 0 ? (
                  card.tasks.map((task) => (
                    <div key={task.id} className="bg-[#2B2B2B] p-4 rounded-xl relative mb-4">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{task.name}</h3>
                        <Menu as="div" className="ml-auto relative">
                          <MenuButton className="p-2 rounded-full hover:bg-gray-700">
                            <Settings size={18} />
                          </MenuButton>
                          <MenuItems className="absolute right-0 mt-2 w-40 bg-black shadow-lg rounded-xl p-2 z-10">
                            <MenuItem>
                              {({ active }) => (
                                <button className={`flex items-center w-full p-2 rounded-md text-sm gap-1 ${active ? "bg-gray-700" : ""}`} 
                                  onClick={() => handlePriorityChange(task.id, task.priority)}>
                                  <Flag size={12} /> Change priority
                                </button>
                              )}
                            </MenuItem>
                            <MenuItem>
                              {({ active }) => (
                                <button className={`flex items-center gap-2 w-full p-2 rounded-md ${active ? "bg-gray-700" : ""}`} 
                                  onClick={() => handleTypeChange(task.id, task.type)}>
                                  <Repeat size={12} /> Change type
                                </button>
                              )}
                            </MenuItem>
                            <MenuItem>
                              {({ active }) => (
                                <button className={`flex items-center gap-2 w-full p-2 rounded-md text-red-500 ${active ? "bg-red-700 text-white" : ""}`} 
                                  onClick={() => handleDelete(task.id)}>
                                  <Trash2 size={12} /> Delete
                                </button>
                              )}
                            </MenuItem>
                          </MenuItems>
                        </Menu>
                      </div>

                      {/* Priority & Type */}
                      <div className="flex justify-between mt-2 flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-400">Priority</p>
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full text-white ${priorityColors[task.priority]}`}>
                            {task.priority}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-xs text-gray-400">Type</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-white">{task.type}</span>
                            <img src={task.typeImage} alt={task.type} className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm mt-2">No tasks added yet.</p>
                )}
              </div>
            </div>
          ))}



          <div className="flex items-center justify-center">
            <button className="flex rounded-full bg-[#1D1D1D] p-2" onClick={() => setIsTaskCardModalOpen(true)}>
              <Plus size={50} />
            </button>
          </div> 
        </div>
      </div>

      {/* <div className="mt-6 space-y-4">
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
      </div> */}

      {/* Modals */}
      <TaskCardModal isOpen={isTaskCardModalOpen} onClose={() => setIsTaskCardModalOpen(false)} onSave={addTaskCard} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={addUser} />
    </div>
  );
};

export default Dashboard;
