Feature: Cache

  As a programmer I want to use the cache

  Scenario: I increment a value
  When I increment an undefined value
  Then I should get 1
