# SoulScript Architecture Documentation

## 🏗️ System Overview

SoulScript is built as a modern, scalable web application following the JAMstack architecture with serverless functions. The system is designed for high availability, security, and user privacy while providing real-time AI-powered therapeutic insights.

## 🎯 Architecture Principles

### Core Principles
- **Privacy-First**: User data is encrypted and never shared without consent
- **Trauma-Informed**: All features designed with mental health safety in mind
- **Scalable**: Built to handle growth from hundreds to millions of users
- **Accessible**: WCAG 2.1 AA compliant with full voice support
- **Resilient**: Graceful degradation and offline capabilities

### Design Patterns
- **Serverless Architecture**: API routes for backend functionality
- **Component-Based UI**: Reusable, accessible React components
- **Event-Driven**: Real-time updates and notifications
- **Microservices Ready**: Modular design for future scaling

## 🏛️ High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client Layer  │    │   API Layer     │    │  External APIs  │
│                 │    │                 │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │   Browser   │ │◄──►│ │ Next.js API │ │◄──►│ │   Mistral   │ │
│ │   Mobile    │ │    │ │   Routes    │ │    │ │   OpenAI    │ │
│ │   Desktop   │ │    │ └─────────────┘ │    │ └─────────────┘ │
│ └─────────────┘ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│                 │    │ │  Middleware │ │    │ │   MongoDB   │ │
│ ┌─────────────┐ │    │ │   (Auth,    │ │    │ │   Atlas     │ │
│ │   PWA       │ │    │ │ Validation) │ │    │ │             │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🧩 Component Architecture

### Frontend Layer (Next.js 15.3.5)

#### Page Structure
```
pages/
├── index.tsx              # Landing page
├── journal.tsx            # Main journaling interface
├── dashboard.tsx          # Analytics dashboard
├── notion-setup.tsx       # Notion workspace setup
└── api/                   # API routes
    ├── journal.ts         # Journal CRUD operations
    ├── prompt.ts          # AI prompt generation
    ├── dashboard.ts       # Analytics data
    ├── notion-setup.ts    # Notion integration
    └── voice/             # Voice processing
        ├── transcribe.ts
        └── synthesize.ts
```

#### Component Hierarchy
```
App
├── Layout
│   ├── Header
│   ├── Navigation
│   └── Footer
├── Pages
│   ├── Journal
│   │   ├── MoodSlider
│   │   ├── JournalTextarea
│   │   ├── VoiceRecorder
│   │   └── AIReflection
│   ├── Dashboard
│   │   ├── MoodChart
│   │   ├── ThemeAnalysis
│   │   └── ExportButton
│   └── NotionSetup
│       ├── SetupForm
│       └── ProgressTracker
└── UI Components
    ├── Button
    ├── Card
    ├── Slider
    ├── Textarea
    └── Label
```

### Backend Layer (Next.js API Routes)

#### API Route Structure
```typescript
// Core journaling functionality
/api/journal
├── POST    # Create new entry
├── GET     # Retrieve entries
└── PUT     # Update entry

// AI integration
/api/prompt
└── GET     # Get daily prompt

// Analytics
/api/dashboard
└── GET     # Get analytics data

// Voice features
/api/voice
├── /transcribe  # Speech-to-text
└── /synthesize  # Text-to-speech

// Notion integration
/api/notion
├── /setup       # Initialize workspace
├── /issue       # Create issues
└── /task        # Create tasks
```

#### Middleware Stack
```typescript
// Request flow
Client Request
├── Rate Limiting
├── Authentication (future)
├── Input Validation
├── Business Logic
├── Database Operations
├── AI Processing
└── Response
```

## 🗄️ Data Architecture

### Database Schema (MongoDB)

#### JournalEntry Collection
```typescript
{
  _id: ObjectId,
  userId: string | null,        // User or session ID
  entry: string,                // Journal text (encrypted)
  mood: number,                 // Mood rating 1-5
  aiReflection: string,         // AI-generated summary
  followUpQuestion: string,     // AI-generated question
  voiceData: {                  // Voice recording metadata
    duration: number,
    transcription: string,
    confidence: number
  },
  safetyFlags: {                // Crisis detection
    riskLevel: 'low' | 'medium' | 'high',
    flaggedKeywords: string[],
    checkedAt: Date
  },
  metadata: {
    wordCount: number,
    readingTime: number,
    themes: string[]
  },
  createdAt: Date,
  updatedAt: Date
}
```

#### User Collection (Future)
```typescript
{
  _id: ObjectId,
  email: string,                // Encrypted
  name: string,                 // Encrypted
  preferences: {
    voiceEnabled: boolean,
    notifications: boolean,
    theme: 'light' | 'dark' | 'auto',
    accessibility: {
      fontSize: 'small' | 'medium' | 'large',
      highContrast: boolean,
      screenReader: boolean
    }
  },
  safetySettings: {
    crisisDetection: boolean,
    emergencyContacts: string[],
    therapistInfo: {
      name: string,
      contact: string,
      consent: boolean
    }
  },
  analytics: {
    totalEntries: number,
    streakDays: number,
    averageMood: number,
    lastEntryDate: Date
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Data Flow

#### Journal Entry Creation
```
1. User Input
   ├── Text entry
   ├── Mood rating
   └── Voice recording (optional)

2. Client Processing
   ├── Input validation
   ├── Voice transcription
   └── Safety keyword check

3. API Processing
   ├── Rate limiting
   ├── Data encryption
   ├── AI reflection generation
   └── Database storage

4. Response
   ├── AI reflection
   ├── Follow-up question
   └── Safety resources (if needed)
```

#### Analytics Generation
```
1. Data Aggregation
   ├── Mood trends
   ├── Theme clustering
   └── Pattern recognition

2. AI Analysis
   ├── Sentiment analysis
   ├── Topic modeling
   └── Insight generation

3. Visualization
   ├── Chart data preparation
   ├── Export formatting
   └── Real-time updates
```

## 🔒 Security Architecture

### Data Protection

#### Encryption
- **At Rest**: AES-256 encryption for all sensitive data
- **In Transit**: TLS 1.3 for all communications
- **Client-Side**: Local encryption for voice recordings

#### Privacy Measures
- **Data Minimization**: Only collect necessary data
- **Anonymization**: Optional anonymous mode
- **Consent Management**: Granular privacy controls
- **Right to Deletion**: Complete data removal capability

#### Crisis Safety
- **Keyword Detection**: Real-time crisis monitoring
- **Resource Integration**: Direct access to crisis hotlines
- **Professional Support**: Therapist integration options
- **Emergency Protocols**: Automated safety responses

### Authentication & Authorization

#### Current State
- **Anonymous Mode**: No registration required
- **Session-Based**: Temporary session identifiers
- **Rate Limiting**: Per-IP and per-session limits

#### Future Implementation
- **OAuth2**: Social login integration
- **JWT Tokens**: Secure session management
- **Role-Based Access**: User, therapist, admin roles
- **Multi-Factor Auth**: Enhanced security for sensitive features

## 🚀 Scalability Architecture

### Performance Optimization

#### Frontend
- **Code Splitting**: Dynamic imports for heavy libraries
- **Image Optimization**: Next.js automatic optimization
- **Caching**: Service worker for offline functionality
- **Lazy Loading**: Components loaded on demand

#### Backend
- **Database Indexing**: Optimized queries for common patterns
- **Connection Pooling**: Efficient database connections
- **Caching Layer**: Redis for frequently accessed data
- **CDN Integration**: Global content delivery

### Horizontal Scaling

#### Current Architecture
- **Serverless Functions**: Automatic scaling
- **MongoDB Atlas**: Managed database scaling
- **Vercel/Netlify**: Global edge deployment

#### Future Scaling
- **Microservices**: Separate services for different features
- **Message Queues**: Async processing for AI operations
- **Load Balancing**: Multiple server instances
- **Database Sharding**: Distributed data storage

## 🔧 Integration Architecture

### AI Integration

#### Mistral API
```typescript
// Primary AI provider
const mistralConfig = {
  model: 'mistral-small',
  temperature: 0.7,
  maxTokens: 1000,
  safetySettings: {
    crisisDetection: true,
    traumaInformed: true
  }
};
```

#### OpenAI Fallback
```typescript
// Backup AI provider
const openaiConfig = {
  model: 'gpt-4-turbo',
  temperature: 0.7,
  maxTokens: 1000,
  safetySettings: {
    crisisDetection: true,
    traumaInformed: true
  }
};
```

### Notion Integration

#### Workspace Management
```typescript
// Automated workspace setup
const notionSetup = {
  databases: ['Issues', 'Tasks', 'Features', 'Documentation'],
  templates: ['Bug Report', 'Feature Spec', 'Meeting Notes'],
  automation: ['Issue → Task linking', 'Documentation updates']
};
```

### Voice Processing

#### Web Speech API
```typescript
// Browser-based voice processing
const voiceConfig = {
  recognition: {
    continuous: true,
    interimResults: true,
    language: 'en-US'
  },
  synthesis: {
    rate: 1.0,
    pitch: 1.0,
    voice: 'default'
  }
};
```

## 📊 Monitoring & Observability

### Application Monitoring

#### Performance Metrics
- **Core Web Vitals**: LCP, FID, CLS
- **API Response Times**: P95, P99 latencies
- **Error Rates**: 4xx, 5xx error tracking
- **User Engagement**: Session duration, feature usage

#### Health Checks
- **Database Connectivity**: MongoDB connection status
- **AI Service Health**: Mistral/OpenAI availability
- **External Dependencies**: Notion API status
- **Voice Processing**: Web Speech API availability

### Logging Strategy

#### Log Levels
- **ERROR**: System failures, security incidents
- **WARN**: Performance issues, rate limiting
- **INFO**: User actions, feature usage
- **DEBUG**: Detailed debugging information

#### Log Structure
```typescript
{
  timestamp: string,
  level: 'error' | 'warn' | 'info' | 'debug',
  service: 'api' | 'frontend' | 'ai' | 'database',
  userId?: string,
  sessionId?: string,
  action: string,
  details: object,
  performance?: {
    duration: number,
    memory: number
  }
}
```

## 🔄 Deployment Architecture

### Environment Strategy

#### Development
- **Local Development**: `localhost:3000`
- **Hot Reloading**: Real-time code updates
- **Debug Tools**: Full debugging capabilities
- **Mock Data**: Local development data

#### Staging
- **Preview Deployments**: Automatic on PR
- **Integration Testing**: Full system testing
- **Performance Testing**: Load and stress testing
- **Security Scanning**: Automated security checks

#### Production
- **Global CDN**: Edge deployment worldwide
- **Auto-scaling**: Traffic-based scaling
- **Monitoring**: Real-time performance monitoring
- **Backup Strategy**: Automated data backups

### CI/CD Pipeline

```yaml
# GitHub Actions workflow
name: Deploy SoulScript
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Install dependencies
      - Run tests
      - Run linting
      - Security scan

  deploy-staging:
    needs: test
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    steps:
      - Deploy to staging
      - Run integration tests
      - Performance testing

  deploy-production:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - Deploy to production
      - Health checks
      - Monitoring setup
```

## 🎯 Future Architecture Considerations

### Planned Enhancements

#### Mobile Applications
- **React Native**: Cross-platform mobile app
- **Offline Support**: Local data storage and sync
- **Push Notifications**: Daily prompts and insights
- **Biometric Auth**: Secure device authentication

#### Advanced AI Features
- **Personalized Models**: User-specific AI training
- **Multi-Modal Input**: Image and video analysis
- **Predictive Analytics**: Mood prediction and early intervention
- **Therapist AI**: AI-assisted therapy sessions

#### Enterprise Features
- **Multi-Tenancy**: Organization-based deployments
- **Compliance**: HIPAA, GDPR, SOC 2 compliance
- **Integration APIs**: Third-party platform integration
- **Advanced Analytics**: Organization-wide insights

### Technical Debt & Improvements

#### Short Term
- **Type Safety**: Complete TypeScript coverage
- **Testing**: Comprehensive test suite
- **Documentation**: API and component documentation
- **Performance**: Core Web Vitals optimization

#### Long Term
- **Microservices**: Service decomposition
- **Event Sourcing**: Audit trail and data history
- **GraphQL**: Flexible data querying
- **Real-time**: WebSocket integration

---

*This architecture documentation is maintained in sync with the codebase. Last updated: 2024-06-09* 