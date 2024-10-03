import React, { useState } from "react";
import "./RaceResults.css";

const RaceResults = ({ race, onResultsSubmit }) => {
    const [results, setResults] = useState(
        race.map((student) => ({ student, place: "" }))
    );
    const [error, setError] = useState(""); // Error state for validation

    const handlePlaceChange = (index, event) => {
        const newResults = [...results];
        const value = event.target.value;

        // Check if the entered place is less than 1 and show error
        if (value < 1) {
            setError("Place values must be at least 1.");
        } else {
            setError(""); // Clear error if the input is valid
        }

        newResults[index].place = value;
        setResults(newResults);

        // Log the current error state and place values
        console.log("Error state (after place change):", error);
        console.log("Results (after place change):", newResults);
    };

    const handleSubmit = () => {
        // Check for any blank place values
        if (results.some((result) => result.place.trim() === "")) {
            setError("All students must have a finishing place.");
            return;
        }

        // Check for invalid place values (less than 1)
        if (results.some((result) => parseInt(result.place) < 1)) {
            setError("Place values must be at least 1.");
            return;
        }

        onResultsSubmit(results);
    };

    return (
        <div className="race-results-container">
            <h3>Enter Race Results</h3>
            {results.map((result, index) => (
                <div key={index} className="race-results-student-row">
                    <span>{result.student.name}:</span>
                    <input
                        type="number"
                        placeholder="Place"
                        value={result.place}
                        onChange={(e) => handlePlaceChange(index, e)}
                        className="race-results-input"
                        min="1" // Prevents the user from entering values less than 1 via the UI
                    />
                </div>
            ))}
            {error && <p className="error-message">{error}</p>}
            <button onClick={handleSubmit} className="race-results-submit-btn">
                Submit Results
            </button>
        </div>
    );
};

export default RaceResults;
