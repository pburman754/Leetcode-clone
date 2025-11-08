"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.problems = void 0;
exports.problems = [
    {
        id: 1,
        title: "Two Sum",
        difficulty: "Easy",
        description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
        examples: [
            {
                input: "nums = [2,7,11,15], target = 9",
                output: "[0,1]",
                explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
            },
            {
                input: "nums = [3,2,4], target = 6",
                output: "[1,2]"
            }
        ],
        starterCode: {
            javascript: `function twoSum(nums, target) {
  // Your code here
}`,
            python: `def twoSum(nums, target):
    # Your code here
    pass`
        },
        testCases: [
            { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
            { input: [[3, 2, 4], 6], expected: [1, 2] },
            { input: [[3, 3], 6], expected: [0, 1] }
        ],
        functionName: "twoSum"
    },
    {
        id: 2,
        title: "Palindrome Number",
        difficulty: "Easy",
        description: `Given an integer x, return true if x is a palindrome, and false otherwise.`,
        examples: [
            {
                input: "x = 121",
                output: "true",
                explanation: "121 reads as 121 from left to right and from right to left."
            },
            {
                input: "x = -121",
                output: "false",
                explanation: "From left to right, it reads -121. From right to left, it becomes 121-."
            }
        ],
        starterCode: {
            javascript: `function isPalindrome(x) {
  // Your code here
}`,
            python: `def isPalindrome(x):
    # Your code here
    pass`
        },
        testCases: [
            { input: [121], expected: true },
            { input: [-121], expected: false },
            { input: [10], expected: false }
        ],
        functionName: "isPalindrome"
    },
    {
        id: 3,
        title: "Reverse String",
        difficulty: "Easy",
        description: `Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.`,
        examples: [
            {
                input: 's = ["h","e","l","l","o"]',
                output: '["o","l","l","e","h"]'
            },
            {
                input: 's = ["H","a","n","n","a","h"]',
                output: '["h","a","n","n","a","H"]'
            }
        ],
        starterCode: {
            javascript: `function reverseString(s) {
  // Your code here
}`,
            python: `def reverseString(s):
    # Your code here
    pass`
        },
        testCases: [
            { input: [["h", "e", "l", "l", "o"]], expected: ["o", "l", "l", "e", "h"] },
            { input: [["H", "a", "n", "n", "a", "h"]], expected: ["h", "a", "n", "n", "a", "H"] }
        ],
        functionName: "reverseString"
    }
];
