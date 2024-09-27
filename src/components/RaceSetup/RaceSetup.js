import React, { useState } from "react";
import "./RaceSetup.css"; // Import the component-specific CSS

const RaceSetup = ({ onRaceCreate }) => {
    const [students, setStudents] = useState([{ name: "", lane: "" }]);
    const [error, setError] = useState(""); // Error state

    // Handle adding a new student
    const handleAddStudent = () => {
        setStudents([...students, { name: "", lane: "" }]);
        setError(""); // Clear error when adding a new student
    };

    // Handle removing a student
    const handleRemoveStudent = (index) => {
        const newStudents = students.filter((_, i) => i !== index);
        setStudents(newStudents);
        setError(""); // Clear error when removing a student
    };

    // Handle input change for a student's name or lane
    const handleInputChange = (index, event, field) => {
        const newStudents = [...students];
        newStudents[index][field] = event.target.value;
        setStudents(newStudents);
        setError(""); // Clear error when editing a field
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Ensure at least two students are added
        if (students.length < 2) {
            setError("A race must have at least two students.");
            return;
        }

        // Validate that all student names and lane numbers are filled in
        if (
            students.some(
                (student) =>
                    student.name.trim() === "" || student.lane.trim() === ""
            )
        ) {
            setError("Please fill in all student names and assign lanes.");
            return;
        }

        // Validate that lane numbers are unique and positive
        const lanes = students.map((student) => student.lane);
        if (new Set(lanes).size !== lanes.length) {
            setError("Each student must have a unique lane.");
            return;
        }

        // Validate that all lane numbers are positive
        if (students.some((student) => parseInt(student.lane, 10) < 1)) {
            setError("Lane numbers must be positive.");
            return;
        }

        onRaceCreate(students);
    };

    return (
        <div className="race-setup">
            <h3>Setup Race</h3>
            <form onSubmit={handleSubmit}>
                {students.map((student, index) => (
                    <div key={index} className="student-entry">
                        <input
                            type="text"
                            placeholder={`Student ${index + 1} Name`}
                            value={student.name}
                            onChange={(event) =>
                                handleInputChange(index, event, "name")
                            }
                            className="styled-input"
                        />
                        <input
                            type="number"
                            min="1" // Ensures the lane number cannot be negative
                            placeholder="Lane"
                            value={student.lane}
                            onChange={(event) =>
                                handleInputChange(index, event, "lane")
                            }
                            className="lane-input"
                        />
                        {students.length > 1 && (
                            <button
                                type="button"
                                onClick={() => handleRemoveStudent(index)}
                                className="remove-btn"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                {/* Display error message if there's an error */}
                {error && <p className="error-message">{error}</p>}
                <div className="buttons-container">
                    <button
                        type="button"
                        onClick={handleAddStudent}
                        className="add-btn"
                    >
                        Add Student
                    </button>
                    <button type="submit" className="submit-btn">
                        Setup Race
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RaceSetup;
