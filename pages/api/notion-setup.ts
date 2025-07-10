/**
 * Notion Workspace Setup API Endpoint
 * 
 * This endpoint initializes the SoulScript Notion workspace with:
 * - Core databases (Issues, Tasks, Features, Documentation)
 * - Template pages
 * - Workspace structure
 * - Initial project documentation
 * 
 * @route POST /api/notion-setup
 * @access Private (requires API key)
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { notionIntegration, createSoulScriptWorkspace } from '../../utils/notion';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    console.log('🚀 Starting SoulScript Notion workspace setup...');

    // Get workspace info to verify API connection
    const workspaceInfo = await notionIntegration.getWorkspaceInfo();
    console.log('✅ Connected to Notion workspace:', workspaceInfo.name);

    // For now, we'll create a parent page first
    // In a real implementation, you'd get the parent page ID from the request
    const parentPageId = req.body.parentPageId || 'your-parent-page-id';

    if (!parentPageId || parentPageId === 'your-parent-page-id') {
      return res.status(400).json({
        success: false,
        error: 'Parent page ID is required. Please provide a valid Notion page ID where the SoulScript workspace should be created.'
      });
    }

    // Create the SoulScript workspace
    const workspaceData = await createSoulScriptWorkspace(parentPageId);

    // Create initial documentation pages
    const documentationPages = await createInitialDocumentation(workspaceData);

    // Create sample data
    const sampleData = await createSampleData(workspaceData);

    console.log('🎉 SoulScript Notion workspace setup completed successfully!');

    return res.status(200).json({
      success: true,
      message: 'SoulScript Notion workspace created successfully',
      data: {
        workspace: workspaceData,
        documentation: documentationPages,
        samples: sampleData
      }
    });

  } catch (error: any) {
    console.error('❌ Notion workspace setup failed:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Failed to create Notion workspace',
      details: error.message
    });
  }
}

/**
 * Create initial documentation pages
 */
async function createInitialDocumentation(workspaceData: any) {
  const pages = [];

  try {
    // Create Project Overview page
    const overviewPage = await notionIntegration.createPage(
      workspaceData.featuresDatabaseId,
      'SoulScript Project Overview',
      `# SoulScript - AI-Driven Therapy Journal Platform

## 🎯 Mission
SoulScript is a trauma-informed AI-driven therapy journal platform designed for emotional healing, self-awareness, and transformation.

## 🏗️ Architecture
- **Frontend**: Next.js 15.3.5 with TypeScript
- **Backend**: Next.js API routes (Node.js/Express style)
- **Database**: MongoDB with Mongoose ODM
- **AI**: Mistral API (configurable to OpenAI GPT-4 Turbo)
- **UI**: TailwindCSS + Custom Components

## 🚀 Core Features
1. **Journal Interface**: Daily AI prompts, mood tracking, voice input/output
2. **Analytics Dashboard**: Mood analytics, theme clustering, PDF export
3. **Safety Features**: Panic button, crisis keyword detection
4. **Voice Features**: Speech-to-text and text-to-speech

## 📊 Current Status
- ✅ Core journaling functionality
- ✅ AI integration (Mistral/OpenAI)
- ✅ Voice input/output features
- ✅ Basic analytics dashboard
- 🔄 Advanced analytics (in progress)
- 📋 Mobile app development (planned)

## 🔗 Quick Links
- [GitHub Repository](https://github.com/M-K-World-Wide/SoulScript)
- [Live Demo](http://localhost:3000)
- [API Documentation](./api-docs)
- [Development Guide](./dev-guide)`
    );
    pages.push(overviewPage);

    // Create API Documentation page
    const apiPage = await notionIntegration.createPage(
      workspaceData.featuresDatabaseId,
      'API Documentation',
      `# SoulScript API Documentation

## 🔗 Endpoints

### POST /api/journal
Save journal entry with AI reflection.

**Request:**
\`\`\`json
{
  "entry": "string (required)",
  "mood": "number (1-5, required)"
}
\`\`\`

**Response:**
\`\`\`json
{
  "id": "string",
  "aiReflection": "string",
  "followUpQuestion": "string"
}
\`\`\`

### GET /api/prompt
Get daily AI-generated prompt.

### GET /api/dashboard
Get analytics data.

## 🔒 Authentication
Currently supports anonymous mode. OAuth2 integration planned.

## 📊 Rate Limits
- 100 requests per minute per IP
- 1000 requests per hour per user (when auth is implemented)`
    );
    pages.push(apiPage);

    // Create Development Guide page
    const devGuidePage = await notionIntegration.createPage(
      workspaceData.featuresDatabaseId,
      'Development Guide',
      `# SoulScript Development Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Mistral API key (or OpenAI API key)

### Installation
\`\`\`bash
git clone https://github.com/M-K-World-Wide/SoulScript
cd SolScript
npm install
\`\`\`

### Environment Setup
Create \`.env.local\`:
\`\`\`env
MONGODB_URI=your-mongodb-connection-string
MISTRAL_API_KEY=your-mistral-api-key
OPENAI_API_KEY=your-openai-api-key (optional)
\`\`\`

### Development
\`\`\`bash
npm run dev
# Visit http://localhost:3000
\`\`\`

## 🏗️ Project Structure
\`\`\`
SolScript/
├── components/ui/          # Reusable UI components
├── lib/                    # Utility libraries
├── models/                 # MongoDB schemas
├── pages/                  # Next.js pages & API routes
├── utils/                  # Utility functions
└── docs/                   # Documentation
\`\`\`

## 🧪 Testing
- Unit tests: \`npm test\`
- E2E tests: \`npm run test:e2e\`
- Linting: \`npm run lint\`

## 🚀 Deployment
- Build: \`npm run build\`
- Start: \`npm run start\`
- Deploy to Vercel: \`vercel --prod\``
    );
    pages.push(devGuidePage);

  } catch (error) {
    console.error('❌ Failed to create documentation pages:', error);
  }

  return pages;
}

/**
 * Create sample data for demonstration
 */
async function createSampleData(workspaceData: any) {
  const samples = [];

  try {
    // Add sample issue
    const sampleIssue = await notionIntegration.addIssue(workspaceData.issuesDatabaseId, {
      title: 'Voice input not working on Safari',
      status: 'Open',
      priority: 'High',
      type: 'Bug',
      description: 'Users report that voice input functionality is not working on Safari browsers. This affects the core journaling experience.',
      labels: ['frontend', 'voice-features'],
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
    });
    samples.push({ type: 'issue', data: sampleIssue });

    // Add sample task
    const sampleTask = await notionIntegration.addTask(workspaceData.tasksDatabaseId, {
      title: 'Implement theme clustering for analytics',
      status: 'To Do',
      priority: 'Medium',
      sprint: 'Current',
      storyPoints: 8,
      description: 'Use AI to cluster journal entries by themes and display insights in the dashboard.',
      acceptanceCriteria: '- AI analyzes journal entries for common themes\n- Dashboard displays theme clusters\n- Users can filter by themes\n- Export includes theme analysis'
    });
    samples.push({ type: 'task', data: sampleTask });

    // Add sample feature
    const sampleFeature = await notionIntegration.addFeature(workspaceData.featuresDatabaseId, {
      title: 'Mobile App Development',
      status: 'Proposed',
      priority: 'High',
      userImpact: 'High',
      technicalComplexity: 'High',
      description: 'Create native mobile apps for iOS and Android to provide a better user experience for mobile users.',
      userStories: 'As a mobile user, I want to journal on my phone so that I can capture thoughts anywhere.\nAs a user, I want offline functionality so that I can journal without internet connection.',
      technicalRequirements: '- React Native or Flutter implementation\n- Offline data sync\n- Push notifications for daily prompts\n- Biometric authentication\n- App store deployment'
    });
    samples.push({ type: 'feature', data: sampleFeature });

  } catch (error) {
    console.error('❌ Failed to create sample data:', error);
  }

  return samples;
} 