/// <reference types="cypress" />

const username = "Username Of The App";
const email = "neaps.drawn0k@icloud.com";
const password = "ValidPassword123";

describe("paying customer app", () => {
  beforeEach(() => {
    // cy.logout();
    cy.login(email, password);
  });

  afterEach(() => {
    // cy.logout();
  });

  it("Login to the app", () => {
    cy.contains("Dobro došli");
    cy.url().should("include", "subscription");
  });
});
