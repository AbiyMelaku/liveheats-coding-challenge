import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RaceDisplay from "./RaceDisplay";

describe("RaceDisplay Component", () => {
    const mockOnReset = jest.fn();
    const mockOnEditResults = jest.fn();

    beforeEach(() => {
        mockOnReset.mockClear();
        mockOnEditResults.mockClear();
    });

    test("displays race results correctly for single students", () => {
        const mockResults = [
            { student: { name: "John Doe" }, place: "1" },
            { student: { name: "Jane Doe" }, place: "2" },
        ];

        render(
            <RaceDisplay
                results={mockResults}
                onReset={mockOnReset}
                onEditResults={mockOnEditResults}
            />
        );

        expect(screen.getByText("1st - John Doe")).toBeInTheDocument();
        expect(screen.getByText("2nd - Jane Doe")).toBeInTheDocument();
    });

    test("displays race results with ampersand for two tied students", () => {
        const mockResults = [
            { student: { name: "John Doe" }, place: "1" },
            { student: { name: "Jane Doe" }, place: "1" },
        ];

        render(
            <RaceDisplay
                results={mockResults}
                onReset={mockOnReset}
                onEditResults={mockOnEditResults}
            />
        );

        expect(
            screen.getByText("1st - John Doe & Jane Doe")
        ).toBeInTheDocument();
    });

    test("displays race results with commas and ampersand for three tied students", () => {
        const mockResults = [
            { student: { name: "John Doe" }, place: "1" },
            { student: { name: "Jane Doe" }, place: "1" },
            { student: { name: "Bob Smith" }, place: "1" },
        ];

        render(
            <RaceDisplay
                results={mockResults}
                onReset={mockOnReset}
                onEditResults={mockOnEditResults}
            />
        );

        expect(
            screen.getByText("1st - John Doe, Jane Doe & Bob Smith")
        ).toBeInTheDocument();
    });

    test("displays race results with commas and ampersand for four tied students", () => {
        const mockResults = [
            { student: { name: "John Doe" }, place: "1" },
            { student: { name: "Jane Doe" }, place: "1" },
            { student: { name: "Bob Smith" }, place: "1" },
            { student: { name: "Alice Green" }, place: "1" },
        ];

        render(
            <RaceDisplay
                results={mockResults}
                onReset={mockOnReset}
                onEditResults={mockOnEditResults}
            />
        );

        expect(
            screen.getByText(
                "1st - John Doe, Jane Doe, Bob Smith & Alice Green"
            )
        ).toBeInTheDocument();
    });

    test("displays race results for multiple places", () => {
        const mockResults = [
            { student: { name: "John Doe" }, place: "1" },
            { student: { name: "Jane Doe" }, place: "2" },
            { student: { name: "Bob Smith" }, place: "3" },
        ];

        render(
            <RaceDisplay
                results={mockResults}
                onReset={mockOnReset}
                onEditResults={mockOnEditResults}
            />
        );

        expect(screen.getByText("1st - John Doe")).toBeInTheDocument();
        expect(screen.getByText("2nd - Jane Doe")).toBeInTheDocument();
        expect(screen.getByText("3rd - Bob Smith")).toBeInTheDocument();
    });

    test("allows entering edit mode when 'Edit Results' is clicked", () => {
        const mockResults = [
            { student: { name: "John Doe" }, place: "1" },
            { student: { name: "Jane Doe" }, place: "2" },
        ];

        render(
            <RaceDisplay
                results={mockResults}
                onReset={mockOnReset}
                onEditResults={mockOnEditResults}
            />
        );

        // Click the "Edit Results" button to enter edit mode
        fireEvent.click(screen.getByText("Edit Results"));

        // Check that "Save Changes" button is displayed
        expect(screen.getByText("Save Changes")).toBeInTheDocument();

        // Check that input fields for places are rendered with correct initial values
        expect(screen.getByTestId("place-input-0")).toHaveValue(1); // Compare as number
        expect(screen.getByTestId("place-input-1")).toHaveValue(2); // Compare as number
    });

    test("updates place values when edited in edit mode", () => {
        const mockResults = [
            { student: { name: "John Doe" }, place: "1" },
            { student: { name: "Jane Doe" }, place: "2" },
        ];

        render(
            <RaceDisplay
                results={mockResults}
                onReset={mockOnReset}
                onEditResults={mockOnEditResults}
            />
        );

        // Enter edit mode
        fireEvent.click(screen.getByText("Edit Results"));

        // Change the place of "Jane Doe" from 2 to 1
        const janePlaceInput = screen.getByTestId("place-input-1");
        fireEvent.change(janePlaceInput, { target: { value: "1" } });

        // Verify that the input value has been updated (compare as number)
        expect(janePlaceInput).toHaveValue(1);
    });

    test("saves the updated results when 'Save Changes' is clicked", () => {
        const mockResults = [
            { student: { name: "John Doe" }, place: "1" },
            { student: { name: "Jane Doe" }, place: "2" },
        ];

        render(
            <RaceDisplay
                results={mockResults}
                onReset={mockOnReset}
                onEditResults={mockOnEditResults}
            />
        );

        // Enter edit mode
        fireEvent.click(screen.getByText("Edit Results"));

        // Change the place of "Jane Doe" from 2 to 1
        const janePlaceInput = screen.getByTestId("place-input-1");
        fireEvent.change(janePlaceInput, { target: { value: "1" } });

        // Click "Save Changes" to save the edits
        fireEvent.click(screen.getByText("Save Changes"));

        // Ensure the onEditResults callback is called with updated results
        expect(mockOnEditResults).toHaveBeenCalledWith([
            { student: { name: "John Doe" }, place: "1" },
            { student: { name: "Jane Doe" }, place: "1" },
        ]);

        // Verify that the component exits edit mode and displays the updated results
        expect(
            screen.getByText("1st - John Doe & Jane Doe")
        ).toBeInTheDocument();
        expect(screen.queryByText("Save Changes")).not.toBeInTheDocument();
    });

    test("does not call onEditResults if 'Save Changes' is not clicked", () => {
        const mockResults = [
            { student: { name: "John Doe" }, place: "1" },
            { student: { name: "Jane Doe" }, place: "2" },
        ];

        render(
            <RaceDisplay
                results={mockResults}
                onReset={mockOnReset}
                onEditResults={mockOnEditResults}
            />
        );

        // Enter edit mode
        fireEvent.click(screen.getByText("Edit Results"));

        // Change the place of "Jane Doe" from 2 to 1
        const janePlaceInput = screen.getByTestId("place-input-1");
        fireEvent.change(janePlaceInput, { target: { value: "1" } });

        // Do not click "Save Changes" and instead click "Start New Race"
        fireEvent.click(screen.getByText("Start New Race"));

        // Ensure the onEditResults callback is not called
        expect(mockOnEditResults).not.toHaveBeenCalled();
    });

    test("calls onReset when 'Start New Race' is clicked", () => {
        const mockResults = [
            { student: { name: "John Doe" }, place: "1" },
            { student: { name: "Jane Doe" }, place: "2" },
        ];

        render(
            <RaceDisplay
                results={mockResults}
                onReset={mockOnReset}
                onEditResults={mockOnEditResults}
            />
        );

        // Click the "Start New Race" button
        fireEvent.click(screen.getByText("Start New Race"));

        // Ensure the onReset callback is called
        expect(mockOnReset).toHaveBeenCalledTimes(1);
    });
});
