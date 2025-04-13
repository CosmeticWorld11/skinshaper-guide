
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Plus, Save, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { routineService, RoutineItem } from "@/services/routineService";
import { toast } from "sonner";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const CustomRoutineBuilder = () => {
  const { user } = useAuth();
  const [routineItems, setRoutineItems] = useState<RoutineItem[]>([]);
  const [currentDay, setCurrentDay] = useState("Monday");
  const [currentTime, setCurrentTime] = useState("");
  const [currentTreatment, setCurrentTreatment] = useState("");
  const [currentNotes, setCurrentNotes] = useState("");
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRoutine = async () => {
      if (!user?._id) return;
      
      try {
        setIsLoading(true);
        const routine = await routineService.getUserRoutine(user._id);
        
        if (routine) {
          setRoutineItems(routine.items);
        }
      } catch (error) {
        console.error("Error loading routine:", error);
        toast.error("Failed to load your routine");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadRoutine();
  }, [user]);

  const addRoutineItem = () => {
    if (!currentTreatment || !currentTime) return;
    
    const newItem: RoutineItem = {
      id: Date.now().toString(),
      day: currentDay,
      time: currentTime,
      treatment: currentTreatment,
      notes: currentNotes,
      completed: false
    };
    
    setRoutineItems([...routineItems, newItem]);
    setCurrentTreatment("");
    setCurrentNotes("");
    setSaved(false);
  };

  const removeRoutineItem = (id: string) => {
    setRoutineItems(routineItems.filter(item => item.id !== id));
    setSaved(false);
  };

  const toggleComplete = (id: string) => {
    setRoutineItems(
      routineItems.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
    setSaved(false);
  };

  const saveRoutine = async () => {
    if (!user?._id) {
      toast.error("You must be logged in to save a routine");
      return;
    }
    
    try {
      await routineService.saveRoutine({
        userId: user._id,
        items: routineItems,
        name: "My Custom Routine"
      });
      
      setSaved(true);
      toast.success("Routine saved successfully");
      
      // Reset saved state after 3 seconds
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Error saving routine:", error);
      toast.error("Failed to save routine");
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-skin-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-xl font-serif font-medium mb-6">Build Your Custom Routine</h3>
      
      <div className="grid md:grid-cols-5 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Day</label>
          <select 
            className="w-full rounded-md border border-input bg-background px-3 py-2"
            value={currentDay}
            onChange={(e) => setCurrentDay(e.target.value)}
          >
            {weekdays.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Time</label>
          <Input
            type="time"
            value={currentTime}
            onChange={(e) => setCurrentTime(e.target.value)}
            placeholder="Select Time"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-muted-foreground mb-1">Treatment</label>
          <Input 
            value={currentTreatment}
            onChange={(e) => setCurrentTreatment(e.target.value)}
            placeholder="e.g., Avocado Mask, Exfoliation"
          />
        </div>
        
        <div className="flex items-end">
          <Button onClick={addRoutineItem} className="w-full gap-1">
            <Plus className="h-4 w-4" />
            Add Treatment
          </Button>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-muted-foreground mb-1">Notes (Optional)</label>
        <Input 
          value={currentNotes}
          onChange={(e) => setCurrentNotes(e.target.value)}
          placeholder="e.g., Use gentle strokes, Focus on T-zone"
        />
      </div>
      
      {routineItems.length > 0 ? (
        <div>
          <h4 className="font-medium text-lg mb-3">Your Weekly Plan</h4>
          
          <div className="space-y-2 mb-6">
            {weekdays.map(day => {
              const dayItems = routineItems.filter(item => item.day === day);
              if (dayItems.length === 0) return null;
              
              return (
                <div key={day} className="border rounded-lg p-3">
                  <h5 className="font-medium mb-2">{day}</h5>
                  
                  <div className="space-y-2">
                    {dayItems.map(item => (
                      <div 
                        key={item.id} 
                        className={cn(
                          "flex items-center justify-between p-2 rounded-md", 
                          item.completed ? "bg-green-50 line-through" : "bg-blush-50"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            checked={item.completed}
                            onChange={() => toggleComplete(item.id!)}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{item.treatment}</span>
                              <span className="text-xs bg-white px-2 py-0.5 rounded-full flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {item.time}
                              </span>
                            </div>
                            {item.notes && (
                              <p className="text-xs text-muted-foreground">{item.notes}</p>
                            )}
                          </div>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeRoutineItem(item.id!)}
                          className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={saveRoutine} 
              className="gap-2"
              variant={saved ? "secondary" : "default"}
            >
              <Save className="h-4 w-4" />
              {saved ? "Saved!" : "Save Routine"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 border border-dashed rounded-lg bg-muted/5">
          <Calendar className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground">
            Your custom routine will appear here. <br />
            Add treatments to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomRoutineBuilder;
