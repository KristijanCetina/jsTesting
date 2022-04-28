/// <reference types="cypress" />

const username = "Username Of The App";
const email = "neaps.drawn0k@icloud.com";
const password = "ValidPassword123";

describe("paying customer app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
  });

  it("displays front page elements by default", () => {
    // check if logo is there
    cy.get(".navbar-brand > img").should("exist");

    //check tagline
    cy.contains("Make your payments easier");

    // check login button
    cy.get('[href="/login"]')
      .first()
      .should("have.text", "Login");

    //check sign up button
    cy.get('[href="/signup"]')
      .first()
      .should("have.text", "Sign up");
  });

  it("sign up a new user", () => {
    //Click Sign up
    cy.get('[href="/signup"]').click();
    cy.url().should("include", "signup");

    cy.get("#Name").type(username);
    cy.get("#emailAdress").type(email);
    cy.get("#password").type(password);
    cy.get("#repeatedPassword").type(password);

    cy.get("#TermsCheck").click();

    cy.get(":nth-child(7) > .btn")
      .should("contain", "Sign In")
      .click();
  });
});
