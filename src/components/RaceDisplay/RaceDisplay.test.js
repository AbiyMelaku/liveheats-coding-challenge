import React from "react";
import { render, screen } from "@testing-library/react";
import RaceDisplay from "./RaceDisplay";

describe("RaceDisplay Component", () => {
    const mockOnReset = jest.fn();

    test("displays race results correctly for single students", () => {
        const mockResults = [
            { student: { name: "John Doe" }, place: "1" },
            { student: { name: "Jane Doe" }, place: "2" },
        ];

        render(<RaceDisplay results={mockResults} onReset={mockOnReset} />);

        expect(screen.getByText("1st - John Doe")).toBeInTheDocument();
        expect(screen.getByText("2nd - Jane Doe")).toBeInTheDocument();
    });

    test("displays race results with ampersand for two tied students", () => {
        const mockResults = [
            { student: { name: "John Doe" }, place: "1" },
            { student: { name: "Jane Doe" }, place: "1" },
        ];

        render(<RaceDisplay results={mockResults} onReset={mockOnReset} />);

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

        render(<RaceDisplay results={mockResults} onReset={mockOnReset} />);

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

        render(<RaceDisplay results={mockResults} onReset={mockOnReset} />);

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

        render(<RaceDisplay results={mockResults} onReset={mockOnReset} />);

        expect(screen.getByText("1st - John Doe")).toBeInTheDocument();
        expect(screen.getByText("2nd - Jane Doe")).toBeInTheDocument();
        expect(screen.getByText("3rd - Bob Smith")).toBeInTheDocument();
    });
});
