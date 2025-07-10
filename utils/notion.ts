/**
 * Notion API Integration for SoulScript
 * 
 * This module provides comprehensive integration with Notion API for:
 * - Creating and managing documentation pages
 * - Syncing project data (issues, tasks, features)
 * - Automating workspace setup
 * - Real-time project updates
 * 
 * @author SoulScript Team
 * @version 1.0.0
 * @since 2024-06-09
 */

import axios from 'axios';

// Notion API Configuration
const NOTION_API_TOKEN = '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';
const NOTION_API_BASE_URL = 'https://api.notion.com/v1';

// API Client Configuration
const notionClient = axios.create({
  baseURL: NOTION_API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${NOTION_API_TOKEN}`,
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json'
  }
});

/**
 * Notion Page Types for SoulScript
 */
export interface NotionPage {
  id: string;
  title: string;
  type: 'page' | 'database';
  url: string;
  created_time: string;
  last_edited_time: string;
  properties?: Record<string, any>;
}

/**
 * Notion Database Types for SoulScript
 */
export interface NotionDatabase {
  id: string;
  title: string;
  properties: Record<string, any>;
  description?: string;
}

/**
 * SoulScript Issue/Bug Entry
 */
export interface SoulScriptIssue {
  title: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  type: 'Bug' | 'Feature' | 'Enhancement' | 'Documentation';
  assignee?: string;
  reporter?: string;
  description?: string;
  labels?: string[];
  dueDate?: string;
}

/**
 * SoulScript Development Task
 */
export interface SoulScriptTask {
  title: string;
  status: 'To Do' | 'In Progress' | 'Review' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
  sprint: 'Current' | 'Next' | 'Backlog';
  assignee?: string;
  storyPoints?: number;
  dueDate?: string;
  description?: string;
  acceptanceCriteria?: string;
}

/**
 * SoulScript Feature Request
 */
export interface SoulScriptFeature {
  title: string;
  status: 'Proposed' | 'Approved' | 'In Development' | 'Released';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  requestedBy?: string;
  targetRelease?: string;
  userImpact: 'Low' | 'Medium' | 'High';
  technicalComplexity: 'Low' | 'Medium' | 'High';
  description?: string;
  userStories?: string;
  technicalRequirements?: string;
}

/**
 * SoulScript Documentation Page
 */
export interface SoulScriptDocumentation {
  title: string;
  category: 'Technical' | 'User' | 'API' | 'Design';
  status: 'Draft' | 'Review' | 'Published' | 'Archived';
  author?: string;
  version?: string;
  tags?: string[];
  content?: string;
}

/**
 * Notion API Integration Class
 */
export class NotionIntegration {
  private workspaceId?: string;

  constructor() {
    this.initializeWorkspace();
  }

  /**
   * Initialize workspace and verify API access
   */
  private async initializeWorkspace(): Promise<void> {
    try {
      const response = await notionClient.get('/users/me');
      console.log('✅ Notion API connected successfully');
      console.log('👤 User:', response.data.name);
    } catch (error) {
      console.error('❌ Failed to connect to Notion API:', error);
      throw new Error('Notion API authentication failed');
    }
  }

  /**
   * Create a new page in Notion
   */
  async createPage(parentId: string, title: string, content?: string): Promise<NotionPage> {
    try {
      const response = await notionClient.post('/pages', {
        parent: { database_id: parentId },
        properties: {
          'Title': {
            title: [
              {
                text: {
                  content: title
                }
              }
            ]
          }
        },
        children: content ? [
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: content
                  }
                }
              ]
            }
          }
        ] : []
      });

      return {
        id: response.data.id,
        title: title,
        type: 'page',
        url: response.data.url,
        created_time: response.data.created_time,
        last_edited_time: response.data.last_edited_time
      };
    } catch (error) {
      console.error('❌ Failed to create Notion page:', error);
      throw error;
    }
  }

  /**
   * Create a new database in Notion
   */
  async createDatabase(parentId: string, title: string, properties: Record<string, any>): Promise<NotionDatabase> {
    try {
      const response = await notionClient.post('/databases', {
        parent: { page_id: parentId },
        title: [
          {
            text: {
              content: title
            }
          }
        ],
        properties: properties
      });

      return {
        id: response.data.id,
        title: title,
        properties: response.data.properties
      };
    } catch (error) {
      console.error('❌ Failed to create Notion database:', error);
      throw error;
    }
  }

  /**
   * Create SoulScript Issues Database
   */
  async createIssuesDatabase(parentId: string): Promise<NotionDatabase> {
    const properties = {
      'Title': {
        title: {}
      },
      'Status': {
        select: {
          options: [
            { name: 'Open', color: 'red' },
            { name: 'In Progress', color: 'yellow' },
            { name: 'Resolved', color: 'green' },
            { name: 'Closed', color: 'gray' }
          ]
        }
      },
      'Priority': {
        select: {
          options: [
            { name: 'Low', color: 'blue' },
            { name: 'Medium', color: 'yellow' },
            { name: 'High', color: 'orange' },
            { name: 'Critical', color: 'red' }
          ]
        }
      },
      'Type': {
        select: {
          options: [
            { name: 'Bug', color: 'red' },
            { name: 'Feature', color: 'green' },
            { name: 'Enhancement', color: 'blue' },
            { name: 'Documentation', color: 'purple' }
          ]
        }
      },
      'Assignee': {
        people: {}
      },
      'Reporter': {
        people: {}
      },
      'Created Date': {
        date: {}
      },
      'Due Date': {
        date: {}
      },
      'Labels': {
        multi_select: {
          options: [
            { name: 'frontend', color: 'blue' },
            { name: 'backend', color: 'green' },
            { name: 'ui/ux', color: 'purple' },
            { name: 'security', color: 'red' },
            { name: 'performance', color: 'orange' }
          ]
        }
      },
      'Description': {
        rich_text: {}
      }
    };

    return await this.createDatabase(parentId, 'Issues & Bugs', properties);
  }

  /**
   * Create SoulScript Tasks Database
   */
  async createTasksDatabase(parentId: string): Promise<NotionDatabase> {
    const properties = {
      'Task Name': {
        title: {}
      },
      'Status': {
        select: {
          options: [
            { name: 'To Do', color: 'gray' },
            { name: 'In Progress', color: 'yellow' },
            { name: 'Review', color: 'blue' },
            { name: 'Done', color: 'green' }
          ]
        }
      },
      'Priority': {
        select: {
          options: [
            { name: 'Low', color: 'blue' },
            { name: 'Medium', color: 'yellow' },
            { name: 'High', color: 'red' }
          ]
        }
      },
      'Sprint': {
        select: {
          options: [
            { name: 'Current', color: 'green' },
            { name: 'Next', color: 'yellow' },
            { name: 'Backlog', color: 'gray' }
          ]
        }
      },
      'Assignee': {
        people: {}
      },
      'Story Points': {
        number: {
          format: 'number'
        }
      },
      'Due Date': {
        date: {}
      },
      'Dependencies': {
        relation: {
          database_id: 'self',
          type: 'single_property'
        }
      },
      'Description': {
        rich_text: {}
      },
      'Acceptance Criteria': {
        rich_text: {}
      }
    };

    return await this.createDatabase(parentId, 'Development Tasks', properties);
  }

  /**
   * Create SoulScript Features Database
   */
  async createFeaturesDatabase(parentId: string): Promise<NotionDatabase> {
    const properties = {
      'Feature Name': {
        title: {}
      },
      'Status': {
        select: {
          options: [
            { name: 'Proposed', color: 'gray' },
            { name: 'Approved', color: 'blue' },
            { name: 'In Development', color: 'yellow' },
            { name: 'Released', color: 'green' }
          ]
        }
      },
      'Priority': {
        select: {
          options: [
            { name: 'Low', color: 'blue' },
            { name: 'Medium', color: 'yellow' },
            { name: 'High', color: 'orange' },
            { name: 'Critical', color: 'red' }
          ]
        }
      },
      'Requested By': {
        people: {}
      },
      'Target Release': {
        select: {
          options: [
            { name: 'v1.0', color: 'blue' },
            { name: 'v1.1', color: 'green' },
            { name: 'v1.2', color: 'yellow' },
            { name: 'v2.0', color: 'purple' }
          ]
        }
      },
      'User Impact': {
        select: {
          options: [
            { name: 'Low', color: 'blue' },
            { name: 'Medium', color: 'yellow' },
            { name: 'High', color: 'red' }
          ]
        }
      },
      'Technical Complexity': {
        select: {
          options: [
            { name: 'Low', color: 'green' },
            { name: 'Medium', color: 'yellow' },
            { name: 'High', color: 'red' }
          ]
        }
      },
      'Description': {
        rich_text: {}
      },
      'User Stories': {
        rich_text: {}
      },
      'Technical Requirements': {
        rich_text: {}
      }
    };

    return await this.createDatabase(parentId, 'Feature Requests', properties);
  }

  /**
   * Add an issue to the Issues database
   */
  async addIssue(databaseId: string, issue: SoulScriptIssue): Promise<NotionPage> {
    try {
      const response = await notionClient.post('/pages', {
        parent: { database_id: databaseId },
        properties: {
          'Title': {
            title: [
              {
                text: {
                  content: issue.title
                }
              }
            ]
          },
          'Status': {
            select: {
              name: issue.status
            }
          },
          'Priority': {
            select: {
              name: issue.priority
            }
          },
          'Type': {
            select: {
              name: issue.type
            }
          },
          'Created Date': {
            date: {
              start: new Date().toISOString()
            }
          },
          'Due Date': issue.dueDate ? {
            date: {
              start: issue.dueDate
            }
          } : undefined,
          'Labels': issue.labels ? {
            multi_select: issue.labels.map(label => ({ name: label }))
          } : undefined,
          'Description': issue.description ? {
            rich_text: [
              {
                text: {
                  content: issue.description
                }
              }
            ]
          } : undefined
        }
      });

      return {
        id: response.data.id,
        title: issue.title,
        type: 'page',
        url: response.data.url,
        created_time: response.data.created_time,
        last_edited_time: response.data.last_edited_time
      };
    } catch (error) {
      console.error('❌ Failed to add issue:', error);
      throw error;
    }
  }

  /**
   * Add a task to the Tasks database
   */
  async addTask(databaseId: string, task: SoulScriptTask): Promise<NotionPage> {
    try {
      const response = await notionClient.post('/pages', {
        parent: { database_id: databaseId },
        properties: {
          'Task Name': {
            title: [
              {
                text: {
                  content: task.title
                }
              }
            ]
          },
          'Status': {
            select: {
              name: task.status
            }
          },
          'Priority': {
            select: {
              name: task.priority
            }
          },
          'Sprint': {
            select: {
              name: task.sprint
            }
          },
          'Story Points': task.storyPoints ? {
            number: task.storyPoints
          } : undefined,
          'Due Date': task.dueDate ? {
            date: {
              start: task.dueDate
            }
          } : undefined,
          'Description': task.description ? {
            rich_text: [
              {
                text: {
                  content: task.description
                }
              }
            ]
          } : undefined,
          'Acceptance Criteria': task.acceptanceCriteria ? {
            rich_text: [
              {
                text: {
                  content: task.acceptanceCriteria
                }
              }
            ]
          } : undefined
        }
      });

      return {
        id: response.data.id,
        title: task.title,
        type: 'page',
        url: response.data.url,
        created_time: response.data.created_time,
        last_edited_time: response.data.last_edited_time
      };
    } catch (error) {
      console.error('❌ Failed to add task:', error);
      throw error;
    }
  }

  /**
   * Add a feature request to the Features database
   */
  async addFeature(databaseId: string, feature: SoulScriptFeature): Promise<NotionPage> {
    try {
      const response = await notionClient.post('/pages', {
        parent: { database_id: databaseId },
        properties: {
          'Feature Name': {
            title: [
              {
                text: {
                  content: feature.title
                }
              }
            ]
          },
          'Status': {
            select: {
              name: feature.status
            }
          },
          'Priority': {
            select: {
              name: feature.priority
            }
          },
          'Target Release': feature.targetRelease ? {
            select: {
              name: feature.targetRelease
            }
          } : undefined,
          'User Impact': {
            select: {
              name: feature.userImpact
            }
          },
          'Technical Complexity': {
            select: {
              name: feature.technicalComplexity
            }
          },
          'Description': feature.description ? {
            rich_text: [
              {
                text: {
                  content: feature.description
                }
              }
            ]
          } : undefined,
          'User Stories': feature.userStories ? {
            rich_text: [
              {
                text: {
                  content: feature.userStories
                }
              }
            ]
          } : undefined,
          'Technical Requirements': feature.technicalRequirements ? {
            rich_text: [
              {
                text: {
                  content: feature.technicalRequirements
                }
              }
            ]
          } : undefined
        }
      });

      return {
        id: response.data.id,
        title: feature.title,
        type: 'page',
        url: response.data.url,
        created_time: response.data.created_time,
        last_edited_time: response.data.last_edited_time
      };
    } catch (error) {
      console.error('❌ Failed to add feature:', error);
      throw error;
    }
  }

  /**
   * Query database entries
   */
  async queryDatabase(databaseId: string, filter?: any, sorts?: any[]): Promise<any[]> {
    try {
      const response = await notionClient.post(`/databases/${databaseId}/query`, {
        filter: filter,
        sorts: sorts
      });

      return response.data.results;
    } catch (error) {
      console.error('❌ Failed to query database:', error);
      throw error;
    }
  }

  /**
   * Update a page
   */
  async updatePage(pageId: string, properties: Record<string, any>): Promise<void> {
    try {
      await notionClient.patch(`/pages/${pageId}`, {
        properties: properties
      });
    } catch (error) {
      console.error('❌ Failed to update page:', error);
      throw error;
    }
  }

  /**
   * Delete a page
   */
  async deletePage(pageId: string): Promise<void> {
    try {
      await notionClient.patch(`/pages/${pageId}`, {
        archived: true
      });
    } catch (error) {
      console.error('❌ Failed to delete page:', error);
      throw error;
    }
  }

  /**
   * Get workspace information
   */
  async getWorkspaceInfo(): Promise<any> {
    try {
      const response = await notionClient.get('/users/me');
      return response.data;
    } catch (error) {
      console.error('❌ Failed to get workspace info:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const notionIntegration = new NotionIntegration();

// Export utility functions
export const createSoulScriptWorkspace = async (parentPageId: string) => {
  const notion = new NotionIntegration();
  
  try {
    console.log('🚀 Creating SoulScript Notion workspace...');
    
    // Create main databases
    const issuesDb = await notion.createIssuesDatabase(parentPageId);
    console.log('✅ Issues database created:', issuesDb.id);
    
    const tasksDb = await notion.createTasksDatabase(parentPageId);
    console.log('✅ Tasks database created:', tasksDb.id);
    
    const featuresDb = await notion.createFeaturesDatabase(parentPageId);
    console.log('✅ Features database created:', featuresDb.id);
    
    console.log('🎉 SoulScript Notion workspace setup complete!');
    
    return {
      issuesDatabaseId: issuesDb.id,
      tasksDatabaseId: tasksDb.id,
      featuresDatabaseId: featuresDb.id
    };
  } catch (error) {
    console.error('❌ Failed to create SoulScript workspace:', error);
    throw error;
  }
}; 