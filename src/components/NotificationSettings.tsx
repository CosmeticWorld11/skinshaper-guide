
import React, { useState, useEffect } from 'react';
import { Bell, Clock, Calendar, Sparkles, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { notificationService } from '@/services/notificationService';
import { useToast } from '@/hooks/use-toast';

interface NotificationPreferences {
  routineReminders: boolean;
  productRecommendations: boolean;
  appointmentReminders: boolean;
  morningRoutineTime: string;
  eveningRoutineTime: string;
  reminderFrequency: 'daily' | 'weekly';
  pushEnabled: boolean;
}

const NotificationSettings: React.FC = () => {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    routineReminders: false,
    productRecommendations: false,
    appointmentReminders: false,
    morningRoutineTime: '08:00',
    eveningRoutineTime: '20:00',
    reminderFrequency: 'daily',
    pushEnabled: false
  });

  useEffect(() => {
    loadPreferences();
    checkNotificationPermission();
  }, []);

  const loadPreferences = () => {
    const stored = localStorage.getItem('notificationPreferences');
    if (stored) {
      setPreferences({ ...preferences, ...JSON.parse(stored) });
    }
  };

  const savePreferences = (newPreferences: NotificationPreferences) => {
    setPreferences(newPreferences);
    localStorage.setItem('notificationPreferences', JSON.stringify(newPreferences));
  };

  const checkNotificationPermission = async () => {
    const permission = await notificationService.requestPermission();
    setPreferences(prev => ({ ...prev, pushEnabled: permission === 'granted' }));
  };

  const handleEnablePushNotifications = async () => {
    const permission = await notificationService.requestPermission();
    
    if (permission === 'granted') {
      const newPreferences = { ...preferences, pushEnabled: true };
      savePreferences(newPreferences);
      
      toast({
        title: "Push notifications enabled! 🔔",
        description: "You'll now receive beauty routine reminders",
        duration: 3000,
      });
    } else {
      toast({
        title: "Permission required",
        description: "Please allow notifications to receive reminders",
        duration: 3000,
      });
    }
  };

  const handleTestNotification = async () => {
    const success = await notificationService.showNotification({
      title: '🌿 Test Notification',
      body: 'Your notifications are working perfectly!',
      icon: '/favicon.ico'
    });

    if (success) {
      toast({
        title: "Test notification sent! ✨",
        description: "Check your notifications",
        duration: 3000,
      });
    }
  };

  const scheduleRoutineReminders = async () => {
    if (!preferences.pushEnabled || !preferences.routineReminders) return;

    // Schedule morning routine
    const morningTime = new Date();
    const [morningHours, morningMinutes] = preferences.morningRoutineTime.split(':');
    morningTime.setHours(parseInt(morningHours), parseInt(morningMinutes), 0, 0);
    
    if (morningTime < new Date()) {
      morningTime.setDate(morningTime.getDate() + 1);
    }

    await notificationService.scheduleRoutineReminder(
      'Morning Skincare',
      morningTime,
      preferences.reminderFrequency
    );

    // Schedule evening routine
    const eveningTime = new Date();
    const [eveningHours, eveningMinutes] = preferences.eveningRoutineTime.split(':');
    eveningTime.setHours(parseInt(eveningHours), parseInt(eveningMinutes), 0, 0);
    
    if (eveningTime < new Date()) {
      eveningTime.setDate(eveningTime.getDate() + 1);
    }

    await notificationService.scheduleRoutineReminder(
      'Evening Skincare',
      eveningTime,
      preferences.reminderFrequency
    );

    toast({
      title: "Routine reminders scheduled! ⏰",
      description: `You'll be reminded ${preferences.reminderFrequency}`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Push Notification Permission */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Push Notifications</h3>
                <Badge variant={preferences.pushEnabled ? "default" : "secondary"}>
                  {preferences.pushEnabled ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Allow notifications to receive beauty reminders
              </p>
            </div>
            {!preferences.pushEnabled && (
              <Button onClick={handleEnablePushNotifications} size="sm">
                Enable
              </Button>
            )}
          </div>

          {preferences.pushEnabled && (
            <>
              {/* Routine Reminders */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-medium">Routine Reminders</span>
                  </div>
                  <Switch
                    checked={preferences.routineReminders}
                    onCheckedChange={(checked) => {
                      const newPreferences = { ...preferences, routineReminders: checked };
                      savePreferences(newPreferences);
                      if (checked) scheduleRoutineReminders();
                    }}
                  />
                </div>

                {preferences.routineReminders && (
                  <div className="ml-6 space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Morning Routine</label>
                        <Select 
                          value={preferences.morningRoutineTime}
                          onValueChange={(value) => savePreferences({ ...preferences, morningRoutineTime: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="07:00">7:00 AM</SelectItem>
                            <SelectItem value="08:00">8:00 AM</SelectItem>
                            <SelectItem value="09:00">9:00 AM</SelectItem>
                            <SelectItem value="10:00">10:00 AM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Evening Routine</label>
                        <Select 
                          value={preferences.eveningRoutineTime}
                          onValueChange={(value) => savePreferences({ ...preferences, eveningRoutineTime: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="19:00">7:00 PM</SelectItem>
                            <SelectItem value="20:00">8:00 PM</SelectItem>
                            <SelectItem value="21:00">9:00 PM</SelectItem>
                            <SelectItem value="22:00">10:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Frequency</label>
                      <Select 
                        value={preferences.reminderFrequency}
                        onValueChange={(value: 'daily' | 'weekly') => savePreferences({ ...preferences, reminderFrequency: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>

              {/* Product Recommendations */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="font-medium">Product Recommendations</span>
                </div>
                <Switch
                  checked={preferences.productRecommendations}
                  onCheckedChange={(checked) => savePreferences({ ...preferences, productRecommendations: checked })}
                />
              </div>

              {/* Appointment Reminders */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-medium">Appointment Reminders</span>
                </div>
                <Switch
                  checked={preferences.appointmentReminders}
                  onCheckedChange={(checked) => savePreferences({ ...preferences, appointmentReminders: checked })}
                />
              </div>

              {/* Test Notification */}
              <div className="pt-4 border-t">
                <Button onClick={handleTestNotification} variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Test Notification
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSettings;
