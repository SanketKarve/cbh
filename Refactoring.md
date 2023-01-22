# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

1. Refactoring the code structure:
   1. The purpose it to make the code more structure and reusable
   2. Move the constant at one place as it's can be used in test cases or the other file globally.
   3. Moving the reusable to the utils file like encrypt the string function
2. if the event is not give in input the default candidate value is return.
3. TRIVIAL_PARTITION_KEY is assigned as candidate is it reduce 1 assignment of variable
4. Making the encryptString more generic and reusable function and can use same function in test cases.