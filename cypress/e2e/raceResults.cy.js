describe("Race Results", () => {
    beforeEach(() => {
        // Visit homepage and set up race first
        cy.visit("/");
        cy.get(".add-btn").click(); // Add a second student

        // Fill in student names and lanes
        cy.get(".student-entry").eq(0).find('input[type="text"]').type("John");
        cy.get(".student-entry").eq(0).find('input[type="number"]').type("1");
        cy.get(".student-entry").eq(1).find('input[type="text"]').type("Jane");
        cy.get(".student-entry").eq(1).find('input[type="number"]').type("2");

        // Submit the race setup form to show RaceResults
        cy.get(".submit-btn").click();
    });

    it("should display race results form", () => {
        cy.get(".race-results-container").should("exist");
        cy.get(".race-results-student-row").should("have.length", 2); // Two students
    });

    it("should not allow submission if places are missing", () => {
        // Try to submit without entering all places
        cy.get(".race-results-submit-btn").click();
        cy.get(".error-message").should(
            "contain",
            "All students must have a finishing place."
        );
    });

    it("should allow entering and submitting race results", () => {
        // Fill out places for each student
        cy.get(".race-results-input").eq(0).type("1");
        cy.get(".race-results-input").eq(1).type("2");

        // Submit results
        cy.get(".race-results-submit-btn").click();

        // Ensure the RaceDisplay component is now visible
        cy.get(".race-display-container").should("exist");
    });
});

describe("Race Results Validation", () => {
    beforeEach(() => {
        // Set up race
        cy.visit("/");
        cy.get(".add-btn").click(); // Add second student

        // Fill in student names and lanes
        cy.get(".student-entry").eq(0).find('input[type="text"]').type("John");
        cy.get(".student-entry").eq(0).find('input[type="number"]').type("1");
        cy.get(".student-entry").eq(1).find('input[type="text"]').type("Jane");
        cy.get(".student-entry").eq(1).find('input[type="number"]').type("2");

        // Submit race setup to reach RaceResults
        cy.get(".submit-btn").click();
    });

    it("should not allow submission if places are missing", () => {
        // Only fill in the first student's place
        cy.get(".race-results-input").eq(0).type("1");

        // Try to submit results
        cy.get(".race-results-submit-btn").click();

        // Expect error message
        cy.get(".error-message").should(
            "contain",
            "All students must have a finishing place."
        );
    });

    it("should allow valid places for all students", () => {
        // Enter valid places for both students
        cy.get(".race-results-input").eq(0).type("1");
        cy.get(".race-results-input").eq(1).type("2");

        // Submit the form
        cy.get(".race-results-submit-btn").click();

        // Expect the RaceDisplay component to be shown
        cy.get(".race-display-container").should("exist");
    });
});
