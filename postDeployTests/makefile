.PHONY: all clean run
.DEFAULT_GOAL := run

run:
	npm run test

clean:
	@$(RM) -rf allure-results/
	@$(RM) -rf playwright-report/
	@$(RM) -rf test-results/
	@$(RM) "Condition History"*.pdf

install:
	npm install && npx playwright install
