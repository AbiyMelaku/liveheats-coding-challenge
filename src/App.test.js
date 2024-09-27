import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
    // Smoke test: The app renders without crashing
    test("renders the app without crashing", () => {
        render(<App />);
    });

    // Test: Header is rendered correctly
    test("renders the header with correct text", () => {
        render(<App />);
        const headerElement = screen.getByText(/Race Management System/i);
        expect(headerElement).toBeInTheDocument();
    });

    // Test: Paragraph is rendered correctly
    test("renders the paragraph with correct text", () => {
        render(<App />);
        const paragraphElement = screen.getByText(
            /Set up races, enter results, and manage race data!/i
        );
        expect(paragraphElement).toBeInTheDocument();
    });
});
