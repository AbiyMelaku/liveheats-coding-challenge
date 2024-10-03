describe("Race Display", () => {
    beforeEach(() => {
        // Visit homepage, set up race, and submit results first
        cy.visit("/");
        cy.get(".add-btn").click(); // Add a second student

        // Fill in student names and lanes
        cy.get(".student-entry").eq(0).find('input[type="text"]').type("John");
        cy.get(".student-entry").eq(0).find('input[type="number"]').type("1");
        cy.get(".student-entry").eq(1).find('input[type="text"]').type("Jane");
        cy.get(".student-entry").eq(1).find('input[type="number"]').type("2");

        // Submit the race setup form to show RaceResults
        cy.get(".submit-btn").click();

        // Fill out places for each student and submit results
        cy.get(".race-results-input").eq(0).type("1");
        cy.get(".race-results-input").eq(1).type("2");
        cy.get(".race-results-submit-btn").click();
    });

    it("should display final race results", () => {
        // Check that final results are displayed
        cy.get(".race-display-container").should("exist");
        cy.get(".race-results-list")
            .should("contain", "John")
            .and("contain", "Jane");
    });

    it("should allow editing the race results", () => {
        // Click edit button to switch to edit mode
        cy.get(".edit-btn").click();

        // Change the result for the first student
        cy.get('[data-testid="place-input-0"]').clear().type("2");

        // Save the changes
        cy.get(".save-btn").click();

        // Verify the updated results
        cy.get(".race-results-list").should("contain", "2nd - John");
    });

    it("should allow resetting the race", () => {
        // Click the reset button
        cy.get(".race-display-reset-btn").click();

        // Verify that the RaceSetup component is displayed again
        cy.get(".race-setup").should("exist");
    });
});

describe("Editing and Resetting Race Results", () => {
    beforeEach(() => {
        cy.visit("/");

        // Set up race
        cy.get(".add-btn").click();
        cy.get(".student-entry").eq(0).find('input[type="text"]').type("John");
        cy.get(".student-entry").eq(0).find('input[type="number"]').type("1");
        cy.get(".student-entry").eq(1).find('input[type="text"]').type("Jane");
        cy.get(".student-entry").eq(1).find('input[type="number"]').type("2");

        // Submit setup and enter race results
        cy.get(".submit-btn").click();
        cy.get(".race-results-input").eq(0).type("1");
        cy.get(".race-results-input").eq(1).type("2");
        cy.get(".race-results-submit-btn").click();
    });

    it("should allow editing race results", () => {
        cy.get(".edit-btn").click(); // Click the edit button

        // Change the result for the first student
        cy.get('[data-testid="place-input-0"]').clear().type("2");

        // Save changes
        cy.get(".save-btn").click();

        // Ensure the results reflect the change
        cy.get(".race-results-list").should("contain", "2nd - John");
    });

    it("should reset the race and return to setup", () => {
        cy.get(".race-display-reset-btn").click(); // Reset the race

        // Ensure the setup form is displayed again
        cy.get(".race-setup").should("exist");
        cy.get(".race-results-container").should("not.exist");
        cy.get(".race-display-container").should("not.exist");
    });
});
