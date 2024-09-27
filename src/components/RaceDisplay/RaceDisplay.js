import React from "react";
import "./RaceDisplay.css"; // Import the component-specific CSS

const groupByPlace = (results) => {
    return results.reduce((acc, result) => {
        const place = result.place;
        if (!acc[place]) acc[place] = [];
        acc[place].push(result.student.name);
        return acc;
    }, {});
};

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

const RaceDisplay = ({ results, onReset }) => {
    // Group students by place
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
            <button onClick={onReset} className="race-display-reset-btn">
                Start New Race
            </button>
        </div>
    );
};

export default RaceDisplay;
