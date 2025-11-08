import { TestCase } from '../data/problems';
import { spawnSync } from 'child_process';

export const executeCode = (
  code: string,
  testCases: TestCase[],
  language: string,
  functionName: string
): { success: boolean; results: any[]; error?: string } => {
  try {
    const results = testCases.map((testCase, index) => {
      try {
        let result;
        
        if (language === 'javascript') {
          // Create function from code
          const wrappedCode = `
            ${code}
            return ${functionName}(...arguments);
          `;
          const fn = new Function(wrappedCode);
          result = fn(...testCase.input);
        } else if (language === 'python') {
          const pythonCode = `
import json
${code}
args = ${JSON.stringify(testCase.input)}
result = ${functionName}(*args)
print(json.dumps(result))
`;
          const process = spawnSync('python', ['-c', pythonCode]);
          if (process.error) {
            throw process.error;
          }
          if (process.stderr.toString()) {
            throw new Error(process.stderr.toString());
          }
          result = JSON.parse(process.stdout.toString());
        } else {
          throw new Error('Language not supported');
        }

        // Deep equality check
        const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
        
        return {
          testCase: index + 1,
          input: testCase.input,
          expected: testCase.expected,
          output: result,
          passed
        };
      } catch (error: any) {
        return {
          testCase: index + 1,
          input: testCase.input,
          expected: testCase.expected,
          output: null,
          passed: false,
          error: error.message
        };
      }
    });

    const allPassed = results.every(r => r.passed);
    
    return {
      success: allPassed,
      results
    };
  } catch (error: any) {
    return {
      success: false,
      results: [],
      error: error.message
    };
  }
};