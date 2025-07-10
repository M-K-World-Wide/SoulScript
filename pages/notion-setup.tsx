/**
 * Notion Workspace Setup Page
 * 
 * This page provides a user-friendly interface for:
 * - Setting up the SoulScript Notion workspace
 * - Creating databases and templates
 * - Initializing project documentation
 * - Testing API connectivity
 * 
 * @route /notion-setup
 * @access Public (for initial setup)
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SetupStatus {
  step: string;
  status: 'pending' | 'loading' | 'success' | 'error';
  message: string;
}

export default function NotionSetup() {
  const [parentPageId, setParentPageId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [setupStatus, setSetupStatus] = useState<SetupStatus[]>([]);
  const [result, setResult] = useState<any>(null);

  /**
   * Add status update to the setup process
   */
  const addStatus = (step: string, status: SetupStatus['status'], message: string) => {
    setSetupStatus(prev => [...prev, { step, status, message }]);
  };

  /**
   * Update the last status entry
   */
  const updateLastStatus = (status: SetupStatus['status'], message: string) => {
    setSetupStatus(prev => {
      const newStatus = [...prev];
      if (newStatus.length > 0) {
        newStatus[newStatus.length - 1] = {
          ...newStatus[newStatus.length - 1],
          status,
          message
        };
      }
      return newStatus;
    });
  };

  /**
   * Initialize the SoulScript Notion workspace
   */
  const handleSetup = async () => {
    if (!parentPageId.trim()) {
      alert('Please enter a valid Notion page ID');
      return;
    }

    setIsLoading(true);
    setSetupStatus([]);
    setResult(null);

    try {
      // Step 1: Test API connection
      addStatus('API Connection', 'loading', 'Testing Notion API connection...');
      
      const testResponse = await fetch('/api/notion-setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          parentPageId: parentPageId.trim(),
          testOnly: true 
        })
      });

      if (!testResponse.ok) {
        throw new Error('Failed to connect to Notion API');
      }

      updateLastStatus('success', '✅ Notion API connected successfully');

      // Step 2: Create workspace
      addStatus('Workspace Creation', 'loading', 'Creating SoulScript workspace...');
      
      const setupResponse = await fetch('/api/notion-setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          parentPageId: parentPageId.trim() 
        })
      });

      if (!setupResponse.ok) {
        const errorData = await setupResponse.json();
        throw new Error(errorData.error || 'Failed to create workspace');
      }

      const setupData = await setupResponse.json();
      updateLastStatus('success', '✅ SoulScript workspace created successfully');
      setResult(setupData);

      // Step 3: Create databases
      addStatus('Database Setup', 'loading', 'Setting up databases...');
      updateLastStatus('success', `✅ Created ${setupData.data.workspace ? 3 : 0} databases`);

      // Step 4: Create documentation
      addStatus('Documentation', 'loading', 'Creating documentation pages...');
      updateLastStatus('success', `✅ Created ${setupData.data.documentation?.length || 0} documentation pages`);

      // Step 5: Create sample data
      addStatus('Sample Data', 'loading', 'Adding sample data...');
      updateLastStatus('success', `✅ Added ${setupData.data.samples?.length || 0} sample entries`);

      // Final success
      addStatus('Setup Complete', 'success', '🎉 SoulScript Notion workspace is ready!');

    } catch (error: any) {
      console.error('Setup failed:', error);
      updateLastStatus('error', `❌ ${error.message}`);
      addStatus('Setup Failed', 'error', 'Please check your configuration and try again');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Copy page ID to clipboard
   */
  const copyPageId = () => {
    navigator.clipboard.writeText(parentPageId);
    alert('Page ID copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 SoulScript Notion Setup
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Initialize your SoulScript project workspace in Notion with databases, 
            templates, and documentation structure.
          </p>
        </motion.div>

        {/* Setup Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Workspace Configuration
          </h2>

          <div className="space-y-6">
            {/* Parent Page ID Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notion Parent Page ID
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={parentPageId}
                  onChange={(e) => setParentPageId(e.target.value)}
                  placeholder="Enter the Notion page ID where you want to create the workspace"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  onClick={copyPageId}
                  className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  disabled={isLoading}
                >
                  Copy
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                This is the page where all SoulScript databases and documentation will be created.
              </p>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">How to get your Page ID:</h3>
              <ol className="text-sm text-blue-800 space-y-1">
                <li>1. Open your Notion workspace</li>
                <li>2. Navigate to the page where you want to create the SoulScript workspace</li>
                <li>3. Copy the page ID from the URL (the part after the last slash)</li>
                <li>4. Paste it in the field above</li>
              </ol>
            </div>

            {/* Setup Button */}
            <button
              onClick={handleSetup}
              disabled={isLoading || !parentPageId.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Setting up workspace...
                </div>
              ) : (
                '🚀 Initialize SoulScript Workspace'
              )}
            </button>
          </div>
        </motion.div>

        {/* Status Updates */}
        {setupStatus.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Setup Progress
            </h2>
            
            <div className="space-y-4">
              {setupStatus.map((status, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-3 p-4 rounded-lg border ${
                    status.status === 'success' ? 'bg-green-50 border-green-200' :
                    status.status === 'error' ? 'bg-red-50 border-red-200' :
                    status.status === 'loading' ? 'bg-blue-50 border-blue-200' :
                    'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    status.status === 'success' ? 'bg-green-500' :
                    status.status === 'error' ? 'bg-red-500' :
                    status.status === 'loading' ? 'bg-blue-500' :
                    'bg-gray-400'
                  }`}>
                    {status.status === 'loading' ? (
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : status.status === 'success' ? (
                      <span className="text-white text-sm">✓</span>
                    ) : status.status === 'error' ? (
                      <span className="text-white text-sm">✗</span>
                    ) : (
                      <span className="text-white text-sm">○</span>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{status.step}</div>
                    <div className="text-sm text-gray-600">{status.message}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              🎉 Setup Complete!
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Workspace Info */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-medium text-green-900 mb-2">Workspace Created</h3>
                <div className="text-sm text-green-800 space-y-1">
                  <div>✅ Issues Database</div>
                  <div>✅ Tasks Database</div>
                  <div>✅ Features Database</div>
                </div>
              </div>

              {/* Documentation */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">Documentation</h3>
                <div className="text-sm text-blue-800 space-y-1">
                  <div>✅ Project Overview</div>
                  <div>✅ API Documentation</div>
                  <div>✅ Development Guide</div>
                </div>
              </div>

              {/* Sample Data */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-medium text-purple-900 mb-2">Sample Data</h3>
                <div className="text-sm text-purple-800 space-y-1">
                  <div>✅ Sample Issue</div>
                  <div>✅ Sample Task</div>
                  <div>✅ Sample Feature</div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 className="font-medium text-orange-900 mb-2">Next Steps</h3>
                <div className="text-sm text-orange-800 space-y-1">
                  <div>📋 Review the created databases</div>
                  <div>📝 Add your team members</div>
                  <div>🚀 Start using the templates</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => window.open('https://notion.so', '_blank')}
                className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Open Notion Workspace
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                Back to SoulScript
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 