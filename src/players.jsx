import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { db } from "./firebase"; // Ensure Firebase is properly initialized
import { collection, addDoc, getDocs } from "firebase/firestore";
import hamburger from "./images/hamburger.png";

const Players = ({ toggleAside }) => {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState("");
  const scrollContainerRef = useRef(null);

  // Fetch players from Firestore
  useEffect(() => {
    const fetchPlayers = async () => {
      const querySnapshot = await getDocs(collection(db, "players"));
      const playersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setPlayers(playersList);
    };
    
    fetchPlayers();
  }, []);

  // Add a new player to Firestore
  const addPlayer = async () => {
    if (newPlayer.trim() === "") return;

    const docRef = await addDoc(collection(db, "players"), { name: newPlayer });
    setPlayers([...players, { id: docRef.id, name: newPlayer }]);
    setNewPlayer(""); // Clear input field
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between border border-x-0 border-b-[#1D1D1D] border-b-2 p-2 border-t-0">
        <h1 className="text-lg lg:text-2xl font-semibold flex items-center">All Players</h1>

        {/* Hamburger Icon */}
        <img 
          src={hamburger} 
          alt="hamburger icon" 
          className="h-6 flex cursor-pointer lg:hidden" 
          onClick={toggleAside} 
        />

        {/* Navigation Links */}
        <div className="hidden lg:flex gap-7">
          <Link to="/dashboard" className="text-white rounded-3xl py-2 px-3">Scouting Plan</Link>
          <Link to="/reports" className="rounded-3xl py-2 px-3">Report Statistics</Link>
        </div>
      </div>

      {/* Players Section */}
      <div className="py-5 px-2 text-white">
        <h2 className="text-xl font-semibold">Players Overview</h2>
        <p className="mt-2 text-gray-400">This section will display all players.</p>

        {/* Input to add new player */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
            placeholder="Enter player name"
            className="p-2 border border-gray-500 rounded bg-gray-800 text-white w-full"
          />
          <button onClick={addPlayer} className="px-4 py-2 bg-[#BCEE31] text-black rounded">Add</button>
        </div>

        {/* Players List */}
        <div ref={scrollContainerRef} className="mt-4 max-w-full overflow-x-auto custom-scrollbar scroll-smooth scrollbar-hide">
          <ul className="space-y-2">
            {players.map((player) => (
              <li key={player.id} className="p-2 bg-gray-900 rounded">{player.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Players;
