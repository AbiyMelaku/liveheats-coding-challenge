import React, { useState } from "react";
import "./RaceResults.css"; // Import the component-specific CSS

const RaceResults = ({ race, onResultsSubmit }) => {
    const [results, setResults] = useState(
        race.map((student) => ({ student, place: "" }))
    );

    const handlePlaceChange = (index, event) => {
        const newResults = [...results];
        newResults[index].place = event.target.value;
        setResults(newResults);
    };

    const handleSubmit = () => {
        // Ensure all places are filled
        if (results.some((result) => result.place === "")) {
            alert("Please fill in all race positions.");
            return;
        }

        // Allow ties, no need for unique place validation

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
                        min="1"
                        placeholder="Place"
                        value={result.place}
                        onChange={(e) => handlePlaceChange(index, e)}
                        className="race-results-input"
                    />
                </div>
            ))}
            <button onClick={handleSubmit} className="race-results-submit-btn">
                Submit Results
            </button>
        </div>
    );
};

export default RaceResults;
