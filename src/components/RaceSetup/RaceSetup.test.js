import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import RaceSetup from "./RaceSetup";

describe("RaceSetup Component", () => {
    const mockRaceCreate = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    // Mock window.alert for tests
    beforeAll(() => {
        jest.spyOn(window, "alert").mockImplementation(() => {}); // Mock window.alert
    });

    test("does not allow negative lane numbers", () => {
        render(<RaceSetup onRaceCreate={mockRaceCreate} />);

        // Add a second student to avoid the "A race must have at least two students" error
        fireEvent.click(screen.getByText("Add Student"));

        fireEvent.change(screen.getByPlaceholderText("Student 1 Name"), {
            target: { value: "Alice" },
        });

        // Use getAllByPlaceholderText for multiple lane inputs
        const laneInputs = screen.getAllByPlaceholderText("Lane");

        // Enter a negative lane number for the first student
        fireEvent.change(laneInputs[0], {
            target: { value: "-1" },
        });

        // Set the second student name
        fireEvent.change(screen.getByPlaceholderText("Student 2 Name"), {
            target: { value: "Bob" },
        });

        // Enter a valid lane number for the second student
        fireEvent.change(laneInputs[1], {
            target: { value: "2" },
        });

        // Try to submit the form
        fireEvent.click(screen.getByRole("button", { name: "Setup Race" }));

        // Expect that the form submission is prevented due to negative lane number
        expect(mockRaceCreate).not.toHaveBeenCalled();
        expect(window.alert).toHaveBeenCalledWith(
            "Lane numbers must be positive."
        );
    });
});
