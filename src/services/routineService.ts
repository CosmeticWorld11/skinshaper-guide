
import { mongoDbService } from "./mongoDbService";
import { toast } from "sonner";

export interface RoutineItem {
  id?: string;
  day: string;
  time: string;
  treatment: string;
  notes: string;
  completed: boolean;
}

export interface Routine {
  _id?: string;
  userId: string;
  items: RoutineItem[];
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class RoutineService {
  private static instance: RoutineService | null = null;
  
  static getInstance(): RoutineService {
    if (!this.instance) {
      this.instance = new RoutineService();
    }
    return this.instance;
  }
  
  async saveRoutine(routine: Omit<Routine, "_id" | "createdAt" | "updatedAt">): Promise<Routine> {
    try {
      const routineCollection = await mongoDbService.getCollection("routines");
      
      // Check if user already has a routine
      const existingRoutine = await routineCollection.findOne({ userId: routine.userId });
      
      const now = new Date();
      
      if (existingRoutine) {
        // Update existing routine
        await routineCollection.updateOne(
          { _id: existingRoutine._id },
          { 
            $set: { 
              items: routine.items,
              name: routine.name,
              updatedAt: now
            } 
          }
        );
        
        return {
          ...routine,
          _id: existingRoutine._id.toString(),
          createdAt: existingRoutine.createdAt,
          updatedAt: now
        };
      } else {
        // Create new routine
        const newRoutine = {
          ...routine,
          createdAt: now,
          updatedAt: now
        };
        
        const result = await routineCollection.insertOne(newRoutine);
        return {
          ...newRoutine,
          _id: result.insertedId.toString()
        };
      }
    } catch (error) {
      console.error("Error saving routine:", error);
      toast.error("Failed to save routine");
      throw error;
    }
  }
  
  async getUserRoutine(userId: string): Promise<Routine | null> {
    try {
      const routineCollection = await mongoDbService.getCollection("routines");
      const routine = await routineCollection.findOne({ userId });
      
      if (!routine) {
        return null;
      }
      
      return {
        _id: routine._id.toString(),
        userId: routine.userId,
        items: routine.items,
        name: routine.name,
        createdAt: routine.createdAt,
        updatedAt: routine.updatedAt
      };
    } catch (error) {
      console.error("Error fetching user routine:", error);
      return null;
    }
  }
  
  async updateRoutineItem(userId: string, itemId: string, updates: Partial<RoutineItem>): Promise<boolean> {
    try {
      const routineCollection = await mongoDbService.getCollection("routines");
      const routine = await routineCollection.findOne({ userId });
      
      if (!routine) {
        return false;
      }
      
      const updatedItems = routine.items.map(item => 
        item.id === itemId ? { ...item, ...updates } : item
      );
      
      await routineCollection.updateOne(
        { _id: routine._id },
        { 
          $set: { 
            items: updatedItems,
            updatedAt: new Date()
          } 
        }
      );
      
      return true;
    } catch (error) {
      console.error("Error updating routine item:", error);
      return false;
    }
  }
  
  async deleteRoutine(userId: string): Promise<boolean> {
    try {
      const routineCollection = await mongoDbService.getCollection("routines");
      const result = await routineCollection.deleteOne({ userId });
      return result.deletedCount > 0;
    } catch (error) {
      console.error("Error deleting routine:", error);
      return false;
    }
  }
}

export const routineService = RoutineService.getInstance();
