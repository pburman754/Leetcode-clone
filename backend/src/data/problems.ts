export interface TestCase {
  input: any[];
  expected: any;
}

export interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints?: string[];
  starterCode: {
    javascript: string;
    python: string;
  };
  testCases: TestCase[];
  functionName: string;
  category: string[];
}

export const problems: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: ["Array", "Hash Table"],
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
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9"
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
    category: ["Math"],
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
      { input: [10], expected: false },
      { input: [0], expected: true }
    ],
    functionName: "isPalindrome"
  },
  {
    id: 3,
    title: "Reverse Integer",
    difficulty: "Medium",
    category: ["Math"],
    description: `Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.`,
    examples: [
      {
        input: "x = 123",
        output: "321"
      },
      {
        input: "x = -123",
        output: "-321"
      },
      {
        input: "x = 120",
        output: "21"
      }
    ],
    starterCode: {
      javascript: `function reverse(x) {
  // Your code here
}`,
      python: `def reverse(x):
    # Your code here
    pass`
    },
    testCases: [
      { input: [123], expected: 321 },
      { input: [-123], expected: -321 },
      { input: [120], expected: 21 },
      { input: [0], expected: 0 }
    ],
    functionName: "reverse"
  },
  {
    id: 4,
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: ["String", "Stack"],
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      {
        input: 's = "()"',
        output: "true"
      },
      {
        input: 's = "()[]{}"',
        output: "true"
      },
      {
        input: 's = "(]"',
        output: "false"
      }
    ],
    starterCode: {
      javascript: `function isValid(s) {
  // Your code here
}`,
      python: `def isValid(s):
    # Your code here
    pass`
    },
    testCases: [
      { input: ["()"], expected: true },
      { input: ["()[]{}"], expected: true },
      { input: ["(]"], expected: false },
      { input: ["([)]"], expected: false },
      { input: ["{[]}"], expected: true }
    ],
    functionName: "isValid"
  },
  {
    id: 5,
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    category: ["Linked List", "Recursion"],
    description: `You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

Note: For this problem, use arrays to represent linked lists.`,
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]"
      },
      {
        input: "list1 = [], list2 = []",
        output: "[]"
      }
    ],
    starterCode: {
      javascript: `function mergeTwoLists(list1, list2) {
  // Your code here
}`,
      python: `def mergeTwoLists(list1, list2):
    # Your code here
    pass`
    },
    testCases: [
      { input: [[1,2,4], [1,3,4]], expected: [1,1,2,3,4,4] },
      { input: [[], []], expected: [] },
      { input: [[], [0]], expected: [0] }
    ],
    functionName: "mergeTwoLists"
  },
  {
    id: 6,
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: ["Array", "Dynamic Programming"],
    description: `Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.`,
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "[4,-1,2,1] has the largest sum = 6."
      },
      {
        input: "nums = [1]",
        output: "1"
      }
    ],
    starterCode: {
      javascript: `function maxSubArray(nums) {
  // Your code here
}`,
      python: `def maxSubArray(nums):
    # Your code here
    pass`
    },
    testCases: [
      { input: [[-2,1,-3,4,-1,2,1,-5,4]], expected: 6 },
      { input: [[1]], expected: 1 },
      { input: [[5,4,-1,7,8]], expected: 23 }
    ],
    functionName: "maxSubArray"
  },
  {
    id: 7,
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: ["Dynamic Programming", "Math"],
    description: `You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    examples: [
      {
        input: "n = 2",
        output: "2",
        explanation: "There are two ways to climb to the top: 1. 1 step + 1 step, 2. 2 steps"
      },
      {
        input: "n = 3",
        output: "3",
        explanation: "1+1+1, 1+2, 2+1"
      }
    ],
    starterCode: {
      javascript: `function climbStairs(n) {
  // Your code here
}`,
      python: `def climbStairs(n):
    # Your code here
    pass`
    },
    testCases: [
      { input: [2], expected: 2 },
      { input: [3], expected: 3 },
      { input: [4], expected: 5 },
      { input: [5], expected: 8 }
    ],
    functionName: "climbStairs"
  },
  {
    id: 8,
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    category: ["Array", "Dynamic Programming"],
    description: `You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.`,
    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5."
      }
    ],
    starterCode: {
      javascript: `function maxProfit(prices) {
  // Your code here
}`,
      python: `def maxProfit(prices):
    # Your code here
    pass`
    },
    testCases: [
      { input: [[7,1,5,3,6,4]], expected: 5 },
      { input: [[7,6,4,3,1]], expected: 0 },
      { input: [[2,4,1]], expected: 2 }
    ],
    functionName: "maxProfit"
  },
  {
    id: 9,
    title: "Binary Search",
    difficulty: "Easy",
    category: ["Array", "Binary Search"],
    description: `Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.`,
    examples: [
      {
        input: "nums = [-1,0,3,5,9,12], target = 9",
        output: "4"
      },
      {
        input: "nums = [-1,0,3,5,9,12], target = 2",
        output: "-1"
      }
    ],
    starterCode: {
      javascript: `function search(nums, target) {
  // Your code here
}`,
      python: `def search(nums, target):
    # Your code here
    pass`
    },
    testCases: [
      { input: [[-1,0,3,5,9,12], 9], expected: 4 },
      { input: [[-1,0,3,5,9,12], 2], expected: -1 },
      { input: [[5], 5], expected: 0 }
    ],
    functionName: "search"
  },
  {
    id: 10,
    title: "Reverse Linked List",
    difficulty: "Easy",
    category: ["Linked List", "Recursion"],
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.

Note: For this problem, use arrays to represent linked lists.`,
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]"
      }
    ],
    starterCode: {
      javascript: `function reverseList(head) {
  // Your code here
}`,
      python: `def reverseList(head):
    # Your code here
    pass`
    },
    testCases: [
      { input: [[1,2,3,4,5]], expected: [5,4,3,2,1] },
      { input: [[1,2]], expected: [2,1] },
      { input: [[]], expected: [] }
    ],
    functionName: "reverseList"
  },
  {
    id: 11,
    title: "Contains Duplicate",
    difficulty: "Easy",
    category: ["Array", "Hash Table"],
    description: `Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.`,
    examples: [
      {
        input: "nums = [1,2,3,1]",
        output: "true"
      },
      {
        input: "nums = [1,2,3,4]",
        output: "false"
      }
    ],
    starterCode: {
      javascript: `function containsDuplicate(nums) {
  // Your code here
}`,
      python: `def containsDuplicate(nums):
    # Your code here
    pass`
    },
    testCases: [
      { input: [[1,2,3,1]], expected: true },
      { input: [[1,2,3,4]], expected: false },
      { input: [[1,1,1,3,3,4,3,2,4,2]], expected: true }
    ],
    functionName: "containsDuplicate"
  },
  {
    id: 12,
    title: "Valid Anagram",
    difficulty: "Easy",
    category: ["Hash Table", "String", "Sorting"],
    description: `Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    examples: [
      {
        input: 's = "anagram", t = "nagaram"',
        output: "true"
      },
      {
        input: 's = "rat", t = "car"',
        output: "false"
      }
    ],
    starterCode: {
      javascript: `function isAnagram(s, t) {
  // Your code here
}`,
      python: `def isAnagram(s, t):
    # Your code here
    pass`
    },
    testCases: [
      { input: ["anagram", "nagaram"], expected: true },
      { input: ["rat", "car"], expected: false },
      { input: ["a", "ab"], expected: false }
    ],
    functionName: "isAnagram"
  },
  {
    id: 13,
    title: "Majority Element",
    difficulty: "Easy",
    category: ["Array", "Hash Table", "Sorting"],
    description: `Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.`,
    examples: [
      {
        input: "nums = [3,2,3]",
        output: "3"
      },
      {
        input: "nums = [2,2,1,1,1,2,2]",
        output: "2"
      }
    ],
    starterCode: {
      javascript: `function majorityElement(nums) {
  // Your code here
}`,
      python: `def majorityElement(nums):
    # Your code here
    pass`
    },
    testCases: [
      { input: [[3,2,3]], expected: 3 },
      { input: [[2,2,1,1,1,2,2]], expected: 2 },
      { input: [[1]], expected: 1 }
    ],
    functionName: "majorityElement"
  },
  {
    id: 14,
    title: "Move Zeroes",
    difficulty: "Easy",
    category: ["Array", "Two Pointers"],
    description: `Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

Note that you must do this in-place without making a copy of the array.`,
    examples: [
      {
        input: "nums = [0,1,0,3,12]",
        output: "[1,3,12,0,0]"
      }
    ],
    starterCode: {
      javascript: `function moveZeroes(nums) {
  // Your code here (modify nums in-place and return it)
  return nums;
}`,
      python: `def moveZeroes(nums):
    # Your code here
    pass`
    },
    testCases: [
      { input: [[0,1,0,3,12]], expected: [1,3,12,0,0] },
      { input: [[0]], expected: [0] },
      { input: [[1,2,3]], expected: [1,2,3] }
    ],
    functionName: "moveZeroes"
  },
  {
    id: 15,
    title: "Single Number",
    difficulty: "Easy",
    category: ["Array", "Bit Manipulation"],
    description: `Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.`,
    examples: [
      {
        input: "nums = [2,2,1]",
        output: "1"
      },
      {
        input: "nums = [4,1,2,1,2]",
        output: "4"
      }
    ],
    starterCode: {
      javascript: `function singleNumber(nums) {
  // Your code here
}`,
      python: `def singleNumber(nums):
    # Your code here
    pass`
    },
    testCases: [
      { input: [[2,2,1]], expected: 1 },
      { input: [[4,1,2,1,2]], expected: 4 },
      { input: [[1]], expected: 1 }
    ],
    functionName: "singleNumber"
  }
];