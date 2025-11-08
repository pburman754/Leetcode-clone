import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { api } from '../api/api';
import { useAuth } from '../context/AuthContext';
import type { Problem, TestResult } from '../types';
import './ProblemDetail.css';

export const ProblemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [results, setResults] = useState<TestResult[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'submissions' | 'notes'>('description');
  const [note, setNote] = useState('');
  const [submissions, setSubmissions] = useState<any[]>([]);

  useEffect(() => {
    fetchProblem();
    if (user) {
      fetchNote();
      fetchSubmissions();
    }
  }, [id, user]);

  const fetchProblem = async () => {
    try {
      const res = await api.getProblem(Number(id));
      setProblem(res.data);
      setCode(res.data.starterCode[language]);
    } catch (error) {
      console.error('Error fetching problem:', error);
    }
  };

  const fetchNote = async () => {
    try {
      const res = await api.getNote(Number(id));
      setNote(res.data.content || '');
    } catch (error) {
      console.error('Error fetching note:', error);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const res = await api.getSubmissions(Number(id));
      setSubmissions(res.data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    if (problem) {
      setCode(problem.starterCode?.[lang as keyof typeof problem.starterCode] || '');
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      alert('Please login to submit solutions');
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    setShowResults(false);
    
    try {
      const res = await api.submitSolution(Number(id), code, language);
      setResults(res.data.results);
      setSuccess(res.data.success);
      setShowResults(true);
      
      if (res.data.success) {
        await refreshUser();
        await fetchSubmissions();
        setTimeout(() => {
          alert(`🎉 Congratulations! All test cases passed!\n⏱️ Runtime: ${res.data.runtime}ms\n⭐ +1 point!`);
        }, 500);
      }
    } catch (error: any) {
      console.error('Error submitting solution:', error);
      alert(error.response?.data?.error || 'Error submitting solution');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveNote = async () => {
    try {
      await api.saveNote(Number(id), note);
      alert('✅ Note saved!');
    } catch (error) {
      alert('Failed to save note');
    }
  };

  if (!problem) {
    return <div className="loading">Loading...</div>;
  }

  const isSolved = user?.solvedProblems?.includes(problem.id);

  return (
    <div className="problem-detail">
      <div className="problem-description">
        <div className="problem-header">
          <button className="back-button" onClick={() => navigate('/')}>
            ← Back
          </button>
          {isSolved && <span className="solved-badge">✅ Solved</span>}
        </div>
        
        <h1>{problem.id}. {problem.title}</h1>
        
        <div className="problem-meta">
          <span className={`difficulty ${problem.difficulty?.toLowerCase()}`}>
            {problem.difficulty}
          </span>
          {problem.category?.map((cat, idx) => (
            <span key={idx} className="category-badge">{cat}</span>
          ))}
        </div>

        <div className="tabs">
          <button
            className={`tab ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`tab ${activeTab === 'submissions' ? 'active' : ''}`}
            onClick={() => setActiveTab('submissions')}
            disabled={!user}
          >
            Submissions
          </button>
          <button
            className={`tab ${activeTab === 'notes' ? 'active' : ''}`}
            onClick={() => setActiveTab('notes')}
            disabled={!user}
          >
            Notes
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'description' && (
            <div className="description-content">
              <p>{problem.description}</p>
              
              <h3>Examples:</h3>
              {problem.examples?.map((example, idx) => (
                <div key={idx} className="example">
                  <div><strong>Input:</strong> {example.input}</div>
                  <div><strong>Output:</strong> {example.output}</div>
                  {example.explanation && (
                    <div><strong>Explanation:</strong> {example.explanation}</div>
                  )}
                </div>
              ))}

              {problem.constraints && (
                <>
                  <h3>Constraints:</h3>
                  <ul className="constraints">
                    {problem.constraints.map((c, idx) => (
                      <li key={idx}>{c}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}

          {activeTab === 'submissions' && (
            <div className="submissions-list">
              {submissions.length === 0 ? (
                <p className="no-data">No submissions yet</p>
              ) : (
                submissions.map((sub) => (
                  <div key={sub.id} className={`submission-item ${sub.status.toLowerCase().replace(' ', '-')}`}>
                    <div className="submission-status">{sub.status}</div>
                    <div className="submission-info">
                      <span>{sub.language}</span>
                      {sub.runtime && <span>{sub.runtime}ms</span>}
                      <span>{new Date(sub.submitted_at).toLocaleString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="notes-section">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write your notes here..."
                className="notes-textarea"
              />
              <button onClick={handleSaveNote} className="save-note-btn">
                Save Note
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="code-section">
        <div className="editor-header">
          <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select>
          
          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? '⏳ Running...' : '▶️ Submit'}
          </button>
        </div>

        <Editor
          height="50vh"
          language={language}
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />

        {showResults && (
          <div className={`results ${success ? 'success' : 'failure'}`}>
            <h3>{success ? '✅ All Tests Passed!' : '❌ Some Tests Failed'}</h3>
            
            <div className="test-results">
              {results.map((result, idx) => (
                <div key={idx} className={`test-case ${result.passed ? 'passed' : 'failed'}`}>
                  <div className="test-header">
                    Test Case {result.testCase} {result.passed ? '✅' : '❌'}
                  </div>
                  <div className="test-details">
                    <div><strong>Input:</strong> <code>{JSON.stringify(result.input)}</code></div>
                    <div><strong>Expected:</strong> <code>{JSON.stringify(result.expected)}</code></div>
                    <div><strong>Output:</strong> <code>{JSON.stringify(result.output)}</code></div>
                    {result.error && (
                      <div className="error"><strong>Error:</strong> {result.error}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};