Feature: Statistics
    As a developer I want to get statistics about my API requests

Scenario: The stats service returns zero without previous trafic
    Then I see totalIncomingRequests increases to "0"

Scenario: The stats service returns correct statistics
	When I make "13" requests
    Then I see totalIncomingRequests increases to "13"
