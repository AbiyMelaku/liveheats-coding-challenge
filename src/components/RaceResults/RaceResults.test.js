import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import RaceResults from "./RaceResults";

describe("RaceResults Component", () => {
    const mockOnResultsSubmit = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("allows multiple students to have the same place (ties)", () => {
        const race = [
            { name: "John Doe" },
            { name: "Jane Doe" },
            { name: "Mickey Mouse" },
        ];

        render(
            <RaceResults race={race} onResultsSubmit={mockOnResultsSubmit} />
        );

        const placeInputs = screen.getAllByPlaceholderText("Place");

        // Assign the same place to John and Jane (1st place tie)
        fireEvent.change(placeInputs[0], {
            target: { value: "1" },
        });
        fireEvent.change(placeInputs[1], {
            target: { value: "1" },
        });

        // Assign Mickey Mouse a different place
        fireEvent.change(placeInputs[2], {
            target: { value: "2" },
        });

        fireEvent.click(screen.getByText("Submit Results"));

        expect(mockOnResultsSubmit).toHaveBeenCalledWith([
            { student: { name: "John Doe" }, place: "1" },
            { student: { name: "Jane Doe" }, place: "1" },
            { student: { name: "Mickey Mouse" }, place: "2" },
        ]);
    });

    test("displays an error message for invalid place values (less than 1)", () => {
        const race = [
            { name: "John Doe" },
            { name: "Jane Doe" },
            { name: "Mickey Mouse" },
        ];

        render(
            <RaceResults race={race} onResultsSubmit={mockOnResultsSubmit} />
        );

        const placeInputs = screen.getAllByPlaceholderText("Place");

        // Assign invalid place (0) to John
        fireEvent.change(placeInputs[0], {
            target: { value: "0" },
        });

        // Assign valid places to others
        fireEvent.change(placeInputs[1], {
            target: { value: "2" },
        });
        fireEvent.change(placeInputs[2], {
            target: { value: "3" },
        });

        fireEvent.click(screen.getByText("Submit Results"));

        // Check for the error message
        expect(
            screen.getByText("Place values must be at least 1.")
        ).toBeInTheDocument();

        // Ensure onResultsSubmit has not been called due to the validation error
        expect(mockOnResultsSubmit).not.toHaveBeenCalled();
    });

    test("does not submit if any student is missing a place", () => {
        const race = [{ name: "John Doe" }, { name: "Jane Doe" }];

        render(
            <RaceResults race={race} onResultsSubmit={mockOnResultsSubmit} />
        );

        const placeInputs = screen.getAllByPlaceholderText("Place");

        // Assign place to only one student
        fireEvent.change(placeInputs[0], {
            target: { value: "1" },
        });

        // Leave the second student without a place
        fireEvent.click(screen.getByText("Submit Results"));

        // Check for the error message
        expect(
            screen.getByText("All students must have a finishing place.")
        ).toBeInTheDocument();

        // Ensure onResultsSubmit has not been called due to the validation error
        expect(mockOnResultsSubmit).not.toHaveBeenCalled();
    });
});
