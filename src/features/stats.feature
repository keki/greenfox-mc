Feature: Statistics
    As a developer I want to get statistics about my API requests

Scenario: 
    When I make a request
    Then I see totalIncomingRequests increases to "1"
