Feature: Message queue
  As a developer I want to be able to use
  message queues to create a "communication" layer
  between the processes.

Scenario: Publish a message
  When I publish "test" message to queue "test-queue"
  Then "test-queue" queue contains "1" message

Scenario: Consume a message
  Given I publish "test" message to queue "test-queue"
  When A process consume the queue "test-queue"
  Then I see "1" processed message

Scenario: Publish a message to an exchange
  Given I bind "bound-queue" to exchange "test-exchange"
  When I publish "test" message to exchange "test-exchange"
  Then "bound-queue" queue contains "1" message

Scenario: Consume a message from a queue bound to an exchange
  Given I bind "bound2-queue" to exchange "test-exchange"
  Given I publish "test" message to exchange "test-exchange"
  When A process consume the queue "bound2-queue"
  Then I see "1" processed message
