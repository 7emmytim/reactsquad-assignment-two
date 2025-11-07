# Testing

## 5 Questions Every Unit Test Must Answer

A failing test should be a good bug report.

1. what unit of the project are you testing?
2. what feature of that unit are you testing?
3. what is the expected output?
4. what is the actual output?
5. how do you reproduce?

const comp = <Component />

## RITEway

Readable - should be easily understandable, having descriptions
Integrated/Isolated - Integrated relates more with integration test. isolated relates more with unit testing. => reminder to write integration tests, all tests should be able to run in isolation
Thorough - it would mean the test should capture every possible case scenerios.
Explicit - everything about your test should be well spelt out. nothing hidden.

Why is it good that test cases run in isolation (of other test cases = their setup / teardown doesn't bleed into other tests, no shared mutable state etc.)?

To make it deterministic. Why is it good to have deterministic tests?

You can be sure of the root cause if there is an issue.

Test failures don't bleed into other tests.

If tests are isolated, you can run them in ANY order. And if you can run them
in any order that means, you can run them in PARALLEL.

=> allows to always have your CI/CD be under 10 minutes, even for large projects
with thousands of tests.

Why do you want to keep your CI/CD under 10 minutes? Avoid context switches.

If you just made a PR and you KNOW the CI/CD pipeline is just 10 minutes, you can go for a walk, use the restroom, grab a coffee, and by the time you're back, you have feedback.

On average the brain needs 20 minutes to fully engulf in a task.
