# SoulScript API Documentation

## 🔗 Overview

The SoulScript API provides a comprehensive interface for AI-driven therapy journaling, analytics, and project management. All endpoints return JSON responses and use standard HTTP status codes.

**Base URL**: `https://your-domain.com/api` (or `http://localhost:3000/api` for development)

## 🔐 Authentication

Currently, SoulScript supports anonymous mode. OAuth2 authentication is planned for future releases.

### Headers
```http
Content-Type: application/json
```

## 📝 Core Endpoints

### POST /api/journal

Save a journal entry with AI-generated reflection and follow-up question.

#### Request Body
```json
{
  "entry": "string (required) - Journal entry text",
  "mood": "number (required) - Mood rating 1-5"
}
```

#### Response (200)
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "entry": "Today I felt grateful for the support of my friends...",
    "mood": 4,
    "aiReflection": "It's beautiful to see you recognizing the importance of connection and support in your life. Gratitude is a powerful emotion that can shift our perspective and strengthen our relationships...",
    "followUpQuestion": "What specific qualities do you appreciate most about the people who support you?",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Error Responses
```json
// 400 - Validation Error
{
  "success": false,
  "error": "VALIDATION_ERROR",
  "message": "Entry is required and must be at least 10 characters long"
}

// 500 - Server Error
{
  "success": false,
  "error": "INTERNAL_ERROR",
  "message": "Failed to process journal entry"
}
```

---

### GET /api/prompt

Get a daily AI-generated therapeutic prompt.

#### Response (200)
```json
{
  "success": true,
  "data": {
    "prompt": "Reflect on a moment today when you felt truly seen or heard. What made that experience meaningful?",
    "category": "connection",
    "difficulty": "medium",
    "estimatedTime": "10-15 minutes"
  }
}
```

---

### GET /api/dashboard

Get analytics data for the dashboard.

#### Query Parameters
- `period` (optional): `week` | `month` | `year` (default: `week`)
- `userId` (optional): User identifier for personalized data

#### Response (200)
```json
{
  "success": true,
  "data": {
    "moodData": {
      "labels": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      "values": [3, 4, 2, 5, 4, 3, 4],
      "average": 3.57
    },
    "themes": [
      {
        "name": "gratitude",
        "frequency": 12,
        "sentiment": "positive"
      },
      {
        "name": "anxiety",
        "frequency": 8,
        "sentiment": "neutral"
      }
    ],
    "insights": [
      "Your mood has improved 20% this week compared to last week",
      "Gratitude appears frequently in your entries, which is excellent for mental health"
    ],
    "stats": {
      "totalEntries": 45,
      "streakDays": 7,
      "averageEntryLength": 150
    }
  }
}
```

---

### GET /api/journal/entries

Get paginated journal entries.

#### Query Parameters
- `page` (optional): Page number (default: 1)
- `limit` (optional): Entries per page (default: 10, max: 50)
- `sort` (optional): `newest` | `oldest` | `mood` (default: `newest`)

#### Response (200)
```json
{
  "success": true,
  "data": {
    "entries": [
      {
        "id": "507f1f77bcf86cd799439011",
        "entry": "Today I felt grateful for...",
        "mood": 4,
        "aiReflection": "Your reflection shows...",
        "followUpQuestion": "What specific aspects...",
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 45,
      "pages": 5,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

## 🎨 Notion Integration Endpoints

### POST /api/notion-setup

Initialize the SoulScript Notion workspace with databases and templates.

#### Request Body
```json
{
  "parentPageId": "string (required) - Notion page ID where workspace should be created"
}
```

#### Response (200)
```json
{
  "success": true,
  "message": "SoulScript Notion workspace created successfully",
  "data": {
    "workspace": {
      "issuesDatabaseId": "507f1f77bcf86cd799439011",
      "tasksDatabaseId": "507f1f77bcf86cd799439012",
      "featuresDatabaseId": "507f1f77bcf86cd799439013"
    },
    "documentation": [
      {
        "id": "507f1f77bcf86cd799439014",
        "title": "SoulScript Project Overview",
        "url": "https://notion.so/..."
      }
    ],
    "samples": [
      {
        "type": "issue",
        "data": {
          "id": "507f1f77bcf86cd799439015",
          "title": "Voice input not working on Safari"
        }
      }
    ]
  }
}
```

---

### POST /api/notion/issue

Create a new issue in the Notion Issues database.

#### Request Body
```json
{
  "title": "string (required) - Issue title",
  "description": "string (optional) - Issue description",
  "priority": "Low | Medium | High | Critical",
  "type": "Bug | Feature | Enhancement | Documentation",
  "labels": ["array of strings (optional) - Issue labels"]
}
```

#### Response (200)
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "title": "Voice input not working on Safari",
    "url": "https://notion.so/...",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### POST /api/notion/task

Create a new development task in the Notion Tasks database.

#### Request Body
```json
{
  "title": "string (required) - Task title",
  "description": "string (optional) - Task description",
  "priority": "Low | Medium | High",
  "sprint": "Current | Next | Backlog",
  "storyPoints": "number (optional) - Story points estimate",
  "acceptanceCriteria": "string (optional) - Acceptance criteria"
}
```

## 🎯 Voice Features Endpoints

### POST /api/voice/transcribe

Transcribe audio to text for voice journaling.

#### Request
```http
POST /api/voice/transcribe
Content-Type: multipart/form-data

audio: [audio file]
```

#### Response (200)
```json
{
  "success": true,
  "data": {
    "text": "Today I felt grateful for the beautiful weather...",
    "confidence": 0.95,
    "duration": 15.2
  }
}
```

---

### POST /api/voice/synthesize

Convert text to speech for reading prompts and reflections.

#### Request Body
```json
{
  "text": "string (required) - Text to convert to speech",
  "voice": "string (optional) - Voice preference (default: 'default')",
  "speed": "number (optional) - Speech rate 0.5-2.0 (default: 1.0)"
}
```

#### Response (200)
```json
{
  "success": true,
  "data": {
    "audioUrl": "https://your-domain.com/audio/abc123.mp3",
    "duration": 12.5,
    "text": "Today I felt grateful for..."
  }
}
```

## 🛡️ Safety & Crisis Endpoints

### POST /api/safety/check

Check journal entry for crisis keywords and provide safety resources.

#### Request Body
```json
{
  "entry": "string (required) - Journal entry text to analyze"
}
```

#### Response (200)
```json
{
  "success": true,
  "data": {
    "riskLevel": "low | medium | high",
    "flaggedKeywords": ["suicide", "self-harm"],
    "safetyResources": [
      {
        "name": "National Suicide Prevention Lifeline",
        "number": "988",
        "description": "24/7 crisis support"
      }
    ],
    "recommendations": [
      "Consider reaching out to a mental health professional",
      "You're not alone - help is available 24/7"
    ]
  }
}
```

---

### GET /api/safety/resources

Get crisis resources and grounding techniques.

#### Response (200)
```json
{
  "success": true,
  "data": {
    "crisisHotlines": [
      {
        "name": "National Suicide Prevention Lifeline",
        "number": "988",
        "description": "24/7 crisis support",
        "url": "https://988lifeline.org"
      }
    ],
    "groundingTechniques": [
      {
        "name": "5-4-3-2-1 Exercise",
        "description": "Name 5 things you can see, 4 you can touch...",
        "duration": "2-3 minutes"
      }
    ],
    "emergencyContacts": [
      {
        "name": "Emergency Services",
        "number": "911",
        "description": "Immediate emergency assistance"
      }
    ]
  }
}
```

## 📊 Analytics Endpoints

### GET /api/analytics/mood

Get detailed mood analytics and trends.

#### Query Parameters
- `period`: `week | month | year | all` (default: `month`)
- `groupBy`: `day | week | month` (default: `day`)

#### Response (200)
```json
{
  "success": true,
  "data": {
    "trends": {
      "overall": "improving",
      "change": 15.5,
      "volatility": "low"
    },
    "patterns": [
      {
        "dayOfWeek": "Monday",
        "averageMood": 3.2,
        "frequency": 8
      }
    ],
    "insights": [
      "Your mood tends to be lower on Mondays",
      "You've shown consistent improvement over the past month"
    ]
  }
}
```

---

### GET /api/analytics/themes

Get theme analysis and clustering results.

#### Query Parameters
- `limit`: Number of themes to return (default: 10)
- `minFrequency`: Minimum frequency threshold (default: 2)

#### Response (200)
```json
{
  "success": true,
  "data": {
    "themes": [
      {
        "name": "gratitude",
        "frequency": 25,
        "sentiment": "positive",
        "keywords": ["thankful", "blessed", "appreciate"],
        "trend": "increasing",
        "relatedThemes": ["relationships", "work"]
      }
    ],
    "clusters": [
      {
        "name": "Personal Growth",
        "themes": ["gratitude", "learning", "goals"],
        "strength": 0.85
      }
    ]
  }
}
```

## ⚠️ Error Handling

All endpoints follow a consistent error response format:

### Error Response Format
```json
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Human-readable error message",
  "details": "Additional error details (optional)",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Common Error Codes
| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Request validation failed |
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |
| `SERVICE_UNAVAILABLE` | 503 | Service temporarily unavailable |

### Rate Limiting
- **Anonymous users**: 100 requests per hour
- **Authenticated users**: 1000 requests per hour
- **Headers included**:
  ```http
  X-RateLimit-Limit: 1000
  X-RateLimit-Remaining: 999
  X-RateLimit-Reset: 1642233600
  ```

## 🔧 SDK & Libraries

### JavaScript/TypeScript
```bash
npm install soulscript-client
```

```javascript
import { SoulScriptClient } from 'soulscript-client';

const client = new SoulScriptClient({
  baseUrl: 'https://your-domain.com/api',
  apiKey: 'your-api-key' // optional
});

// Save journal entry
const entry = await client.journal.create({
  entry: "Today I felt grateful...",
  mood: 4
});

// Get analytics
const analytics = await client.analytics.getDashboard();
```

### cURL Examples
```bash
# Save journal entry
curl -X POST https://your-domain.com/api/journal \
  -H "Content-Type: application/json" \
  -d '{"entry": "Today I felt grateful...", "mood": 4}'

# Get daily prompt
curl -X GET https://your-domain.com/api/prompt

# Get dashboard data
curl -X GET "https://your-domain.com/api/dashboard?period=week"
```

## 📈 Webhooks

SoulScript supports webhooks for real-time notifications:

### Webhook Events
- `journal.entry.created` - New journal entry
- `journal.entry.updated` - Entry updated
- `crisis.detected` - Crisis keywords detected
- `analytics.insight.generated` - New insight available

### Webhook Configuration
```json
{
  "url": "https://your-domain.com/webhooks/soulscript",
  "events": ["journal.entry.created", "crisis.detected"],
  "secret": "your-webhook-secret"
}
```

## 🔒 Security Considerations

- **HTTPS Required**: All production endpoints require HTTPS
- **Input Validation**: All inputs are validated and sanitized
- **Rate Limiting**: Prevents abuse and ensures fair usage
- **CORS**: Configured for secure cross-origin requests
- **Data Encryption**: All sensitive data encrypted in transit and at rest

## 📞 Support

For API support and questions:
- **Documentation**: [docs/](./)
- **Issues**: [GitHub Issues](https://github.com/M-K-World-Wide/SoulScript/issues)
- **Email**: api-support@soulscript.app

---

*This API documentation is maintained in sync with the codebase. Last updated: 2024-06-09* 