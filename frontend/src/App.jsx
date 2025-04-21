import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [department, setDepartment] = useState("");
  const [section, setSection] = useState("");
  const [day, setDay] = useState("");
  const [timeTable, setTimeTable] = useState(null);
  const [error, setError] = useState(null);

  const handleFetchTimetable = async () => {
    if (!department || !section || !day) {
      setError("Please select Department, Section, and Day.");
      setTimeTable(null);
      return;
    }
  
    try {
      const response = await axios.get(
        `http://localhost:3000/timetable/get-timetable?department=${department}&section=${section}&day=${day}`
      );
      setTimeTable(response.data);
      setError(null);
    } catch (err) {
      setError("Time table not found or error occurred!");
      setTimeTable(null);
    }
  };

  const getSectionOptions = () => {
    if (department === "CSE") {
      return ["A", "B", "C", "D"];
    } else if (department === "ECE" || department === "Civil") {
      return ["A", "B"];
    }
    return [];
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Search Timetable</h1>

        <div className="mb-4">
          <label htmlFor="department" className="block text-gray-700 font-medium">Department</label>
          <select
            id="department"
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setSection(""); // reset section when department changes
            }}
            className="border-2 p-2 w-full mt-2 rounded-md"
          >
            <option value="">Select Department</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="Civil">Civil</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="section" className="block text-gray-700 font-medium">Section</label>
          <select
            id="section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="border-2 p-2 w-full mt-2 rounded-md"
            disabled={!department}
          >
            <option value="">Select Section</option>
            {getSectionOptions().map((sec) => (
              <option key={sec} value={sec}>{sec}</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="day" className="block text-gray-700 font-medium">Day</label>
          <select
            id="day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="border-2 p-2 w-full mt-2 rounded-md"
          >
            <option value="">Select Day</option>
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleFetchTimetable}
          className="bg-blue-500 text-white py-2 px-4 rounded-md w-full hover:bg-blue-700 transition duration-200"
        >
          Get Timetable
        </button>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {timeTable && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-center mb-4">
              Timetable for {timeTable.department} - {timeTable.section} on {timeTable.day}
            </h2>
            <div className="space-y-4">
              {timeTable.timetable.map((period, index) => (
                <div key={index} className="flex justify-between border-b py-2">
                  <span>{period.time}</span>
                  <span>{period.subject}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
