Feature: Request security reports
  As a sysadmin I would like to see
  security reports about the requests

  Scenario: Catch malicious request
  	Given security monitoring is initialized
    When the system get an Incoming request with an url "/iamahacker"
    When the security check is performed
    Then I see "1" for key "maliciousRequests" in security statistics
