
import { MongoClient, Db, ObjectId } from 'mongodb';
import { toast } from "sonner";

const uri = "mongodb+srv://ecoskin:ecoskin@cluster0.r8j4x9a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "eco-skin";

class MongoDbService {
  private static instance: MongoDbService;
  private client: MongoClient;
  private db: Db | null = null;
  private isConnecting: boolean = false;
  
  private constructor() {
    this.client = new MongoClient(uri);
  }
  
  static getInstance(): MongoDbService {
    if (!MongoDbService.instance) {
      MongoDbService.instance = new MongoDbService();
    }
    return MongoDbService.instance;
  }

  async connect(): Promise<Db> {
    if (this.db) return this.db;
    
    if (this.isConnecting) {
      // Wait for connection to complete
      return new Promise((resolve) => {
        const checkDb = () => {
          if (this.db) resolve(this.db);
          else setTimeout(checkDb, 100);
        };
        checkDb();
      });
    }
    
    try {
      this.isConnecting = true;
      console.log("Connecting to MongoDB...");
      await this.client.connect();
      console.log("Connected to MongoDB");
      this.db = this.client.db(dbName);
      this.isConnecting = false;
      return this.db;
    } catch (error) {
      this.isConnecting = false;
      console.error("Error connecting to MongoDB:", error);
      toast.error("Failed to connect to database");
      throw error;
    }
  }
  
  async close(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.db = null;
    }
  }
  
  async getCollection(collectionName: string) {
    const db = await this.connect();
    return db.collection(collectionName);
  }

  // Helper to convert string IDs to ObjectId when needed
  toObjectId(id: string): ObjectId {
    try {
      return new ObjectId(id);
    } catch (error) {
      console.error("Invalid ObjectId:", id);
      throw new Error("Invalid ID format");
    }
  }
}

export const mongoDbService = MongoDbService.getInstance();
