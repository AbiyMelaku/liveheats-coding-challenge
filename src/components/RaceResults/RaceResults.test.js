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

        // Use getAllByPlaceholderText to handle multiple inputs
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
});
