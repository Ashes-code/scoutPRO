import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ChevronDown } from 'lucide-react';
import { Link } from "react-router-dom";
import hamburger from "./images/hamburger.png";
import { useRef } from "react";

const reportData = [
    { day: 1, fullReports: 2, matchReports: 1 },
    { day: 5, fullReports: 5, matchReports: 3 },
    { day: 10, fullReports: 10, matchReports: 7 },
    { day: 15, fullReports: 15, matchReports: 10 },
    { day: 20, fullReports: 22, matchReports: 15 },
    { day: 25, fullReports: 30, matchReports: 20 },
    { day: 31, fullReports: 35, matchReports: 25 },
];

const scoutData = [
    { name: 1, ratings: 5 },
    { name: 2, ratings: 10 },
    { name: 3, ratings: 3 },
    { name: 4, ratings: 20 },
    { name: 5, ratings: 13 },
];

const Reports = ({ toggleAside }) => {
    
    const scrollContainerRef = useRef(null);

    return (
        <div className="bg-black text-white">
            {/* Header */}
            <div className="flex justify-between border border-x-0 border-b-[#1D1D1D] border-b-2 p-2 border-t-0">
                <h1 className="text-lg lg:text-2xl font-semibold flex items-center">Reports</h1>

                {/* Hamburger Icon */}
                <img 
                    src={hamburger} 
                    alt="hamburger icon" 
                    className="h-6 flex cursor-pointer lg:hidden" 
                    onClick={toggleAside} 
                />
                <div className="hidden lg:flex gap-7">
                    <Link to="/scoutPRO/dashboard" className="text-white flex items-center rounded-3xl py-2 px-3">Scouting Plan</Link>
                    <Link to="/scoutPRO/reports" className="text-black rounded-3xl bg-[#BCEE31] py-2 px-3 flex items-center">Report Statistics</Link>
                </div>
            </div>

            <div ref={scrollContainerRef} className="overflow-y-auto custom-scrollbar scroll-smooth scrollbar-hide h-[34rem]">
                {/* Reports Overview */}
                <div className="py-3 pl-2 text-white">
                    <h2 className="text-xl font-semibold">Reports Overview</h2>
                    <p className="mt-2 text-gray-400">This section will display reports and analytics.</p>
                </div>

           
                <div className="flex flex-col lg:flex-row justify-between mt-3">
                    <div>
                        <button className="px-4 py-2 border border-gray-500 rounded bg-[#1D1D1D] text-white flex items-center">
                            Reports <ChevronDown className="ml-2" />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2 lg:space-x-2 mt-2 lg:mt-0">
                        <button className="px-4 py-2 border border-gray-500 rounded bg-[#1D1D1D]">Month</button>
                        <button className="px-4 py-2 border border-gray-500 rounded bg-[#1D1D1D]">6 Months</button>
                        <button className="px-4 py-2 border border-gray-500 rounded bg-[#1D1D1D]">Year</button>
                        <button className="px-4 py-2 border border-gray-500 rounded bg-[#1D1D1D]">Custom range</button>
                    </div>
                </div>

                {/* Charts - Stack on Mobile */}
                <div className="flex flex-col lg:flex-row gap-5 mt-8 w-full">
                    {/* Line Chart */}
                    <div className="bg-[#1D1D1D] p-4 rounded-lg w-full">
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={reportData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                <XAxis dataKey="day" tick={{ fill: '#aaa' }} />
                                <YAxis tick={{ fill: '#aaa' }} />
                                <Tooltip wrapperStyle={{ backgroundColor: '#222', color: 'white' }} />
                                <Legend />
                                <Line type="monotone" dataKey="fullReports" stroke="#a4ff00" strokeWidth={3} />
                                <Line type="monotone" dataKey="matchReports" stroke="#ffffff" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Bar Chart */}
                    <div className="bg-[#1D1D1D] p-4 rounded-lg w-full">
                        <div>
                            <button className="mb-3 px-4 py-2 border border-gray-500 rounded bg-[#1D1D1D] text-white flex items-center">
                                Ratings <ChevronDown className="ml-1" />
                            </button>
                        </div>
                        
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={scoutData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                <XAxis dataKey="name" tick={{ fill: 'white' }} />
                                <YAxis tick={{ fill: '#aaa' }} />
                                <Tooltip wrapperStyle={{ backgroundColor: '#222', color: 'white' }} />
                                <Bar dataKey="ratings" fill="#a4ff00" stroke="#a4ff00" strokeWidth={2} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
