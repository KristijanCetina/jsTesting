Cypress.Commands.add("login", (email, password) => {
  cy.visit("http://localhost:8080/login");
  cy.get("#emailAdress").type(email);
  cy.get("#exampleInputPassword1").type(password);
  cy.get("button[name='Login']").click();
});

Cypress.Commands.add("logout", () => {
  cy.visit("http://localhost:8080/login");
  cy.get("#dropdown-right__BV_toggle_").should("be.visible");

  cy.get("#dropdown-right__BV_toggle_").click();
  cy.get(":nth-child(2) > .dropdown-item").click();
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
