import React, { useState } from "react";
import "./RaceResults.css";

const RaceResults = ({ race, onResultsSubmit }) => {
    const [results, setResults] = useState(
        race.map((student) => ({ student, place: "" }))
    );
    const [error, setError] = useState(""); // Error state for validation

    const handlePlaceChange = (index, event) => {
        const newResults = [...results];
        newResults[index].place = event.target.value;
        setResults(newResults);
        setError(""); // Clear error on change
    };

    const handleSubmit = () => {
        // Check for any blank place values
        if (results.some((result) => result.place.trim() === "")) {
            setError("All students must have a finishing place.");
            return;
        }
        onResultsSubmit(results);
    };

    return (
        <div className="race-results-container">
            <h3>Enter Race Results</h3>
            {results.map((result, index) => (
                <div key={index} className="race-results-student-row">
                    {" "}
                    {/* Updated class */}
                    <span>{result.student.name}:</span>
                    <input
                        type="number"
                        placeholder="Place"
                        value={result.place}
                        onChange={(e) => handlePlaceChange(index, e)}
                        className="race-results-input" /* Updated class */
                        min="1"
                    />
                </div>
            ))}
            {error && <p className="error-message">{error}</p>}
            <button onClick={handleSubmit} className="race-results-submit-btn">
                {" "}
                {/* Updated class */}
                Submit Results
            </button>
        </div>
    );
};

export default RaceResults;
