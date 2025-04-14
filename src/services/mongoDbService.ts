
// Browser-compatible MongoDB service using localStorage

interface Document {
  [key: string]: any;
  _id?: string;
}

interface InsertOneResult {
  insertedId: string;
}

interface Collection {
  findOne: (query: object) => Promise<Document | null>;
  find: (query: object) => {
    sort: (sort: object) => {
      toArray: () => Promise<Document[]>;
    };
  };
  insertOne: (doc: Document) => Promise<InsertOneResult>;
  updateOne: (query: object, update: object) => Promise<{ modifiedCount: number }>;
  deleteOne: (query: object) => Promise<{ deletedCount: number }>;
}

class LocalMongoDBService {
  private static instance: LocalMongoDBService | null = null;
  private collections: { [name: string]: Document[] } = {};
  private initializedCollections: Set<string> = new Set();

  // Private constructor to enforce singleton
  private constructor() {
    this.loadFromLocalStorage();
  }

  static getInstance(): LocalMongoDBService {
    if (!this.instance) {
      this.instance = new LocalMongoDBService();
    }
    return this.instance;
  }

  // Load data from localStorage
  private loadFromLocalStorage(): void {
    try {
      const storedData = localStorage.getItem('eco-skin-mongodb');
      if (storedData) {
        this.collections = JSON.parse(storedData);
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      // Initialize with empty collections if there's an error
      this.collections = {};
    }
  }

  // Save data to localStorage
  private saveToLocalStorage(): void {
    try {
      localStorage.setItem('eco-skin-mongodb', JSON.stringify(this.collections));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }

  // Get or initialize a collection
  async getCollection(name: string): Promise<Collection> {
    // Initialize the collection if it doesn't exist
    if (!this.collections[name]) {
      this.collections[name] = [];
    }

    // Initialize demo data for collections if they're new
    if (!this.initializedCollections.has(name)) {
      this.initializedCollections.add(name);
      if (name === 'users' && this.collections[name].length === 0) {
        // Create a demo user
        const demoUserId = this.generateId();
        this.collections[name].push({
          _id: demoUserId,
          email: 'demo@example.com',
          name: 'Demo User',
          password: '$2b$10$abcdefghijklmnopqrst.e9HtZFPTJ9cFwdnOKWvDl9h45lGkrm7p', // password: "password123"
          createdAt: new Date().toISOString()
        });
      }
      this.saveToLocalStorage();
    }

    // Return collection interface
    return {
      findOne: async (query: object): Promise<Document | null> => {
        const results = this.queryDocuments(name, query);
        return results.length > 0 ? this.cloneDocument(results[0]) : null;
      },
      find: (query: object) => {
        return {
          sort: (sort: object) => {
            return {
              toArray: async (): Promise<Document[]> => {
                const results = this.queryDocuments(name, query);
                const sortField = Object.keys(sort)[0];
                const sortOrder = sort[sortField];
                
                if (sortField) {
                  results.sort((a, b) => {
                    const valueA = a[sortField];
                    const valueB = b[sortField];
                    return sortOrder === 1 
                      ? (valueA > valueB ? 1 : -1) 
                      : (valueA < valueB ? 1 : -1);
                  });
                }
                
                return results.map(doc => this.cloneDocument(doc));
              }
            };
          }
        };
      },
      insertOne: async (doc: Document): Promise<InsertOneResult> => {
        const _id = doc._id || this.generateId();
        const docWithId = { ...doc, _id };
        this.collections[name].push(docWithId);
        this.saveToLocalStorage();
        return { insertedId: _id };
      },
      updateOne: async (query: object, update: object): Promise<{ modifiedCount: number }> => {
        const index = this.collections[name].findIndex(doc => this.matchesQuery(doc, query));
        
        if (index !== -1) {
          const updateObj = update as { $set?: object };
          if (updateObj.$set) {
            this.collections[name][index] = {
              ...this.collections[name][index],
              ...updateObj.$set
            };
            this.saveToLocalStorage();
            return { modifiedCount: 1 };
          }
        }
        
        return { modifiedCount: 0 };
      },
      deleteOne: async (query: object): Promise<{ deletedCount: number }> => {
        const initialLength = this.collections[name].length;
        this.collections[name] = this.collections[name].filter(doc => !this.matchesQuery(doc, query));
        const deletedCount = initialLength - this.collections[name].length;
        
        if (deletedCount > 0) {
          this.saveToLocalStorage();
        }
        
        return { deletedCount };
      }
    };
  }

  // Helper to query documents
  private queryDocuments(collectionName: string, query: object): Document[] {
    return this.collections[collectionName].filter(doc => this.matchesQuery(doc, query));
  }

  // Check if a document matches a query
  private matchesQuery(doc: Document, query: object): boolean {
    return Object.entries(query).every(([key, value]) => {
      if (key === '_id' && typeof value === 'string') {
        return doc._id === value;
      }
      return JSON.stringify(doc[key]) === JSON.stringify(value);
    });
  }

  // Clone document to avoid references
  private cloneDocument(doc: Document): Document {
    return JSON.parse(JSON.stringify(doc));
  }

  // Generate unique ID
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}

export const mongoDbService = LocalMongoDBService.getInstance();
