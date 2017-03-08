Feature: Request statistic
  As a sysadmin I would like to see
  a statistic about the requests

  Scenario: Check the statistics
    Given the system get an Incoming request
    When the request statistic is calculated
    Then I see "1" processed message
    Then I see "1" for "totalIncomingRequests" in the statistics

  Scenario: Recalculate the statistic
    Given the system get an Incoming request
    When the system recalculate the requests
    Then I see "1" for "totalIncomingRequests" in the statistics


