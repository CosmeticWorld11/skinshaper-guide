
import { toast } from "sonner";

// In a browser environment, we need to use a mock implementation
// We'll simulate data storage using localStorage for now
class MongoDbService {
  private static instance: MongoDbService;
  private collections: Record<string, any[]> = {};
  private isConnected: boolean = false;
  
  private constructor() {
    // Initialize collections from localStorage if available
    try {
      const storedData = localStorage.getItem('eco-skin-db');
      if (storedData) {
        this.collections = JSON.parse(storedData);
      } else {
        // Initialize with empty collections
        this.collections = {
          users: [],
          routines: [],
          fashionAnalysis: []
        };
        this.saveToLocalStorage();
      }
    } catch (error) {
      console.error("Error initializing local database:", error);
      this.collections = {
        users: [],
        routines: [],
        fashionAnalysis: []
      };
    }
  }
  
  static getInstance(): MongoDbService {
    if (!MongoDbService.instance) {
      MongoDbService.instance = new MongoDbService();
    }
    return MongoDbService.instance;
  }

  async connect(): Promise<any> {
    if (this.isConnected) return this;
    
    try {
      console.log("Connecting to local database...");
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 100));
      this.isConnected = true;
      console.log("Connected to local database");
      return this;
    } catch (error) {
      console.error("Error connecting to local database:", error);
      toast.error("Failed to connect to database");
      throw error;
    }
  }
  
  async close(): Promise<void> {
    this.isConnected = false;
    this.saveToLocalStorage();
  }
  
  private saveToLocalStorage(): void {
    try {
      localStorage.setItem('eco-skin-db', JSON.stringify(this.collections));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }
  
  async getCollection(collectionName: string) {
    await this.connect();
    
    // Create collection if it doesn't exist
    if (!this.collections[collectionName]) {
      this.collections[collectionName] = [];
    }
    
    // Return a collection-like interface
    return {
      find: (query = {}) => this.find(collectionName, query),
      findOne: (query = {}) => this.findOne(collectionName, query),
      insertOne: (document: any) => this.insertOne(collectionName, document),
      updateOne: (filter: any, update: any) => this.updateOne(collectionName, filter, update),
      deleteOne: (filter: any) => this.deleteOne(collectionName, filter)
    };
  }
  
  // Helper methods to simulate MongoDB operations
  private find(collectionName: string, query: any) {
    const collection = this.collections[collectionName] || [];
    let results = [...collection];
    
    if (query && Object.keys(query).length > 0) {
      results = results.filter(item => this.matchesQuery(item, query));
    }
    
    return {
      toArray: async () => results,
      sort: (sortOptions: any) => {
        // Simple sorting implementation
        if (sortOptions) {
          const [field, direction] = Object.entries(sortOptions)[0];
          results.sort((a, b) => {
            if (a[field] < b[field]) return direction === -1 ? 1 : -1;
            if (a[field] > b[field]) return direction === -1 ? -1 : 1;
            return 0;
          });
        }
        return { toArray: async () => results };
      }
    };
  }
  
  private async findOne(collectionName: string, query: any) {
    const collection = this.collections[collectionName] || [];
    
    if (query._id) {
      // Handle ObjectId strings
      const id = typeof query._id === 'string' ? query._id : query._id.toString();
      return collection.find(item => item._id === id || item._id.toString() === id);
    }
    
    return collection.find(item => this.matchesQuery(item, query));
  }
  
  private async insertOne(collectionName: string, document: any) {
    if (!this.collections[collectionName]) {
      this.collections[collectionName] = [];
    }
    
    // Generate a unique ID if not provided
    const _id = document._id || this.generateId();
    const newDocument = { ...document, _id };
    
    this.collections[collectionName].push(newDocument);
    this.saveToLocalStorage();
    
    return {
      insertedId: _id,
      acknowledged: true,
      insertedCount: 1
    };
  }
  
  private async updateOne(collectionName: string, filter: any, update: any) {
    if (!this.collections[collectionName]) {
      return { modifiedCount: 0, acknowledged: true };
    }
    
    const collection = this.collections[collectionName];
    const index = collection.findIndex(item => this.matchesQuery(item, filter));
    
    if (index !== -1) {
      if (update.$set) {
        // Handle $set operation
        this.collections[collectionName][index] = {
          ...collection[index],
          ...update.$set
        };
      } else {
        // Direct update
        this.collections[collectionName][index] = {
          ...collection[index],
          ...update
        };
      }
      
      this.saveToLocalStorage();
      return { modifiedCount: 1, acknowledged: true };
    }
    
    return { modifiedCount: 0, acknowledged: true };
  }
  
  private async deleteOne(collectionName: string, filter: any) {
    if (!this.collections[collectionName]) {
      return { deletedCount: 0, acknowledged: true };
    }
    
    const collection = this.collections[collectionName];
    const initialLength = collection.length;
    
    this.collections[collectionName] = collection.filter(
      item => !this.matchesQuery(item, filter)
    );
    
    this.saveToLocalStorage();
    
    return {
      deletedCount: initialLength - this.collections[collectionName].length,
      acknowledged: true
    };
  }
  
  private matchesQuery(item: any, query: any): boolean {
    return Object.entries(query).every(([key, value]) => {
      if (key === '_id') {
        const itemId = item._id?.toString();
        const queryId = typeof value === 'string' ? value : value.toString();
        return itemId === queryId;
      }
      return item[key] === value;
    });
  }
  
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }

  // Helper to simulate ObjectId conversion
  toObjectId(id: string): string {
    return id;
  }
}

export const mongoDbService = MongoDbService.getInstance();
