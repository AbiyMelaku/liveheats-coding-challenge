describe("Race Setup", () => {
    beforeEach(() => {
        cy.visit("/"); // Visit the homepage, since there's no routing
    });

    it("should display the race setup form", () => {
        cy.get(".race-setup").should("exist");
    });

    it("should not allow submitting without at least two students", () => {
        cy.get(".submit-btn").click();
        cy.get(".error-message").should(
            "contain",
            "A race must have at least two students."
        );
    });

    it("should allow adding students and lanes", () => {
        cy.get(".add-btn").click(); // Add a second student

        // Fill in student names and lanes
        cy.get(".student-entry").eq(0).find('input[type="text"]').type("John");
        cy.get(".student-entry").eq(0).find('input[type="number"]').type("1");
        cy.get(".student-entry").eq(1).find('input[type="text"]').type("Jane");
        cy.get(".student-entry").eq(1).find('input[type="number"]').type("2");

        // Submit the race setup form
        cy.get(".submit-btn").click();

        // Ensure the RaceResults component is now displayed
        cy.get(".race-results-container").should("exist");
    });
});

describe("Race Setup Edge Cases", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("should not allow submitting with empty fields", () => {
        cy.get(".add-btn").click(); // Add second student

        // Leave fields empty and attempt to submit
        cy.get(".submit-btn").click();
        cy.get(".error-message").should(
            "contain",
            "Please fill in all student names and assign lanes."
        );
    });

    it("should prevent duplicate lane numbers", () => {
        cy.get(".add-btn").click(); // Add second student

        // Fill in names but use the same lane number for both students
        cy.get(".student-entry").eq(0).find('input[type="text"]').type("John");
        cy.get(".student-entry").eq(0).find('input[type="number"]').type("1");
        cy.get(".student-entry").eq(1).find('input[type="text"]').type("Jane");
        cy.get(".student-entry").eq(1).find('input[type="number"]').type("1"); // Duplicate lane

        // Attempt to submit
        cy.get(".submit-btn").click();
        cy.get(".error-message").should(
            "contain",
            "Each student must have a unique lane."
        );
    });
});
