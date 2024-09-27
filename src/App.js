import React, { useState } from "react";
import "./App.css"; // Import the component-specific CSS
import RaceSetup from "./components/RaceSetup/RaceSetup";
import RaceResults from "./components/RaceResults/RaceResults";
import RaceDisplay from "./components/RaceDisplay/RaceDisplay";

function App() {
    const [raceData, setRaceData] = useState(null);
    const [raceResults, setRaceResults] = useState(null);

    // Handle race setup submission
    const handleRaceCreate = (students) => {
        setRaceData(students);
        setRaceResults(null); // Reset previous results
    };

    // Handle race results submission
    const handleResultsSubmit = (results) => {
        setRaceResults(results);
    };

    // Handle resetting the race
    const handleReset = () => {
        setRaceData(null);
        setRaceResults(null);
    };

    // Handle edited race results
    const handleEditResults = (updatedResults) => {
        setRaceResults(updatedResults);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Race Management System</h1>
                <p>Set up races, enter results, and manage race data!</p>
            </header>

            <main className="app-content">
                {!raceData && <RaceSetup onRaceCreate={handleRaceCreate} />}

                {raceData && !raceResults && (
                    <RaceResults
                        race={raceData}
                        onResultsSubmit={handleResultsSubmit}
                    />
                )}

                {raceResults && (
                    <RaceDisplay
                        results={raceResults}
                        onReset={handleReset}
                        onEditResults={handleEditResults} // Pass the handler here
                    />
                )}
            </main>
        </div>
    );
}

export default App;
