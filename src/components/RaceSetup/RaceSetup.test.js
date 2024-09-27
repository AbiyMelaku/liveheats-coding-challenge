import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import RaceSetup from "./RaceSetup";

describe("RaceSetup Component", () => {
    const mockRaceCreate = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
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

        // Check if the error message is displayed in the UI
        expect(
            screen.getByText("Lane numbers must be positive.")
        ).toBeInTheDocument();
    });

    test("does not allow form submission with fewer than two students", () => {
        render(<RaceSetup onRaceCreate={mockRaceCreate} />);

        fireEvent.change(screen.getByPlaceholderText("Student 1 Name"), {
            target: { value: "Alice" },
        });
        fireEvent.change(screen.getByPlaceholderText("Lane"), {
            target: { value: "1" },
        });

        // Try to submit the form with only one student
        fireEvent.click(screen.getByRole("button", { name: "Setup Race" }));

        // Expect form submission to be blocked
        expect(mockRaceCreate).not.toHaveBeenCalled();

        // Check for the error message in the UI
        expect(
            screen.getByText("A race must have at least two students.")
        ).toBeInTheDocument();
    });

    test("displays error message for duplicate lane numbers", () => {
        render(<RaceSetup onRaceCreate={mockRaceCreate} />);

        fireEvent.change(screen.getByPlaceholderText("Student 1 Name"), {
            target: { value: "Alice" },
        });
        fireEvent.change(screen.getByPlaceholderText("Lane"), {
            target: { value: "1" },
        });

        fireEvent.click(screen.getByText("Add Student"));

        fireEvent.change(screen.getByPlaceholderText("Student 2 Name"), {
            target: { value: "Bob" },
        });
        fireEvent.change(screen.getAllByPlaceholderText("Lane")[1], {
            target: { value: "1" }, // Duplicate lane
        });

        // Try to submit the form
        fireEvent.click(screen.getByRole("button", { name: "Setup Race" }));

        // Check for duplicate lane error message
        expect(
            screen.getByText("Each student must have a unique lane.")
        ).toBeInTheDocument();
        expect(mockRaceCreate).not.toHaveBeenCalled();
    });

    test("submits the form with valid data", () => {
        render(<RaceSetup onRaceCreate={mockRaceCreate} />);

        fireEvent.change(screen.getByPlaceholderText("Student 1 Name"), {
            target: { value: "Alice" },
        });
        fireEvent.change(screen.getByPlaceholderText("Lane"), {
            target: { value: "1" },
        });

        fireEvent.click(screen.getByText("Add Student"));

        fireEvent.change(screen.getByPlaceholderText("Student 2 Name"), {
            target: { value: "Bob" },
        });
        fireEvent.change(screen.getAllByPlaceholderText("Lane")[1], {
            target: { value: "2" },
        });

        // Submit the form
        fireEvent.click(screen.getByRole("button", { name: "Setup Race" }));

        // Check if the form was submitted successfully
        expect(mockRaceCreate).toHaveBeenCalledWith([
            { name: "Alice", lane: "1" },
            { name: "Bob", lane: "2" },
        ]);
    });
});
