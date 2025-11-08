"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCode = void 0;
const executeCode = (code, testCases, language, functionName) => {
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
                }
                else {
                    throw new Error('Python execution not implemented in this demo');
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
            }
            catch (error) {
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
    }
    catch (error) {
        return {
            success: false,
            results: [],
            error: error.message
        };
    }
};
exports.executeCode = executeCode;
