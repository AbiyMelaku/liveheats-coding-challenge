// src/components/RaceDisplay/RaceDisplay.js

import React, { useState } from "react";
import "./RaceDisplay.css"; // Import the component-specific CSS

// Helper to format the names with commas and an ampersand before the last name
const formatNames = (names) => {
    if (names.length === 1) {
        return names[0]; // Just one name
    } else if (names.length === 2) {
        return `${names[0]} & ${names[1]}`; // Two names joined by &
    } else {
        // Three or more names: "a, b & c"
        return `${names.slice(0, -1).join(", ")} & ${names[names.length - 1]}`;
    }
};

// Helper to convert place numbers to ordinal text
const getPlaceText = (place) => {
    switch (place) {
        case "1":
            return "1st";
        case "2":
            return "2nd";
        case "3":
            return "3rd";
        default:
            return `${place}th`;
    }
};

const RaceDisplay = ({ results, onReset, onEditResults }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedResults, setEditedResults] = useState([...results]);

    // Handle changes to place values in edit mode
    const handlePlaceChange = (index, event) => {
        const newResults = [...editedResults];
        newResults[index].place = event.target.value;
        setEditedResults(newResults);
    };

    // Save the edited results and exit edit mode
    const handleSaveChanges = () => {
        onEditResults(editedResults);
        setIsEditMode(false);
    };

    // Group students by their place for display mode
    const groupByPlace = (results) => {
        return results.reduce((acc, result) => {
            const place = result.place;
            if (!acc[place]) acc[place] = [];
            acc[place].push(result.student.name);
            return acc;
        }, {});
    };

    if (isEditMode) {
        // Render edit mode: list each student with an input to edit their place
        return (
            <div className="race-display-container">
                <h3>Edit Race Results</h3>
                <ul className="race-results-list">
                    {editedResults.map((result, index) => (
                        <li
                            key={index}
                            className="race-result-item other-place"
                        >
                            <span>{result.student.name} - </span>
                            <input
                                type="number"
                                value={result.place}
                                onChange={(e) => handlePlaceChange(index, e)}
                                data-testid={`place-input-${index}`}
                            />
                        </li>
                    ))}
                </ul>
                <div className="buttons-container">
                    <button onClick={handleSaveChanges} className="save-btn">
                        Save Changes
                    </button>
                    <button
                        onClick={onReset}
                        className="race-display-reset-btn"
                    >
                        Start New Race
                    </button>
                </div>
            </div>
        );
    }

    // Render display mode: group and format race results
    const groupedResults = groupByPlace(results);

    return (
        <div className="race-display-container">
            <h3>Final Race Results</h3>
            <ul className="race-results-list">
                {Object.keys(groupedResults)
                    .sort((a, b) => a - b)
                    .map((place) => (
                        <li
                            key={place}
                            className={`race-result-item ${
                                place === "1"
                                    ? "first-place"
                                    : place === "2"
                                    ? "second-place"
                                    : place === "3"
                                    ? "third-place"
                                    : "other-place"
                            }`}
                        >
                            {getPlaceText(place)} -{" "}
                            {formatNames(groupedResults[place])}
                        </li>
                    ))}
            </ul>
            <div className="buttons-container">
                <button
                    onClick={() => setIsEditMode(true)}
                    className="edit-btn"
                >
                    Edit Results
                </button>
                <button onClick={onReset} className="race-display-reset-btn">
                    Start New Race
                </button>
            </div>
        </div>
    );
};

export default RaceDisplay;
