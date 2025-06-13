
export interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}

export interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  requireInteraction?: boolean;
  actions?: NotificationAction[];
  data?: any;
}

// Service Worker specific notification options
interface ServiceWorkerNotificationOptions extends NotificationOptions {
  actions: NotificationAction[];
}

export interface ScheduledNotification {
  id: string;
  type: 'routine' | 'product' | 'reminder';
  scheduledTime: Date;
  options: NotificationOptions;
  recurring?: 'daily' | 'weekly' | 'monthly';
}

class NotificationService {
  private static instance: NotificationService | null = null;
  private registrationPromise: Promise<ServiceWorkerRegistration> | null = null;

  static getInstance(): NotificationService {
    if (!this.instance) {
      this.instance = new NotificationService();
    }
    return this.instance;
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return 'denied';
    }

    if (Notification.permission === 'granted') {
      return 'granted';
    }

    if (Notification.permission === 'denied') {
      return 'denied';
    }

    const permission = await Notification.requestPermission();
    return permission;
  }

  async showNotification(options: NotificationOptions): Promise<boolean> {
    const permission = await this.requestPermission();
    
    if (permission !== 'granted') {
      return false;
    }

    try {
      const registration = await this.getServiceWorkerRegistration();
      
      if (registration) {
        // Use service worker notification with actions support
        const swOptions: ServiceWorkerNotificationOptions = {
          body: options.body,
          icon: options.icon || '/favicon.ico',
          badge: options.badge || '/favicon.ico',
          tag: options.tag,
          requireInteraction: options.requireInteraction || false,
          actions: options.actions || [],
          data: options.data,
          title: options.title
        };
        
        await registration.showNotification(options.title, swOptions);
      } else {
        // Fallback to regular notification (no actions support)
        new Notification(options.title, {
          body: options.body,
          icon: options.icon || '/favicon.ico'
        });
      }
      
      return true;
    } catch (error) {
      console.error('Error showing notification:', error);
      return false;
    }
  }

  async scheduleNotification(notification: ScheduledNotification): Promise<boolean> {
    const now = new Date();
    const delay = notification.scheduledTime.getTime() - now.getTime();

    if (delay <= 0) {
      return false;
    }

    // Store scheduled notification
    this.saveScheduledNotification(notification);

    // Schedule the notification
    setTimeout(async () => {
      await this.showNotification(notification.options);
      
      // Handle recurring notifications
      if (notification.recurring) {
        const nextNotification = this.getNextRecurringNotification(notification);
        if (nextNotification) {
          await this.scheduleNotification(nextNotification);
        }
      }
      
      // Remove from storage if not recurring
      if (!notification.recurring) {
        this.removeScheduledNotification(notification.id);
      }
    }, delay);

    return true;
  }

  private getNextRecurringNotification(notification: ScheduledNotification): ScheduledNotification | null {
    const nextTime = new Date(notification.scheduledTime);
    
    switch (notification.recurring) {
      case 'daily':
        nextTime.setDate(nextTime.getDate() + 1);
        break;
      case 'weekly':
        nextTime.setDate(nextTime.getDate() + 7);
        break;
      case 'monthly':
        nextTime.setMonth(nextTime.getMonth() + 1);
        break;
      default:
        return null;
    }

    return {
      ...notification,
      id: `${notification.id}_${Date.now()}`,
      scheduledTime: nextTime
    };
  }

  private async getServiceWorkerRegistration(): Promise<ServiceWorkerRegistration | null> {
    if (!('serviceWorker' in navigator)) {
      return null;
    }

    if (!this.registrationPromise) {
      this.registrationPromise = navigator.serviceWorker.getRegistration();
    }

    return this.registrationPromise;
  }

  private saveScheduledNotification(notification: ScheduledNotification): void {
    const stored = localStorage.getItem('scheduledNotifications');
    const notifications: ScheduledNotification[] = stored ? JSON.parse(stored) : [];
    
    notifications.push(notification);
    localStorage.setItem('scheduledNotifications', JSON.stringify(notifications));
  }

  private removeScheduledNotification(id: string): void {
    const stored = localStorage.getItem('scheduledNotifications');
    if (!stored) return;
    
    const notifications: ScheduledNotification[] = JSON.parse(stored);
    const filtered = notifications.filter(n => n.id !== id);
    localStorage.setItem('scheduledNotifications', JSON.stringify(filtered));
  }

  // Beauty-specific notification methods
  async scheduleRoutineReminder(routineName: string, time: Date, recurring: 'daily' | 'weekly' = 'daily'): Promise<boolean> {
    const notification: ScheduledNotification = {
      id: `routine_${routineName}_${Date.now()}`,
      type: 'routine',
      scheduledTime: time,
      recurring,
      options: {
        title: '🌿 Beauty Routine Reminder',
        body: `Time for your ${routineName} routine!`,
        icon: '/favicon.ico',
        tag: `routine_${routineName}`,
        requireInteraction: true,
        actions: [
          { action: 'complete', title: '✅ Mark Complete' },
          { action: 'snooze', title: '⏰ Snooze 15min' }
        ],
        data: { type: 'routine', routineName }
      }
    };

    return this.scheduleNotification(notification);
  }

  async scheduleProductRecommendation(productName: string, time: Date): Promise<boolean> {
    const notification: ScheduledNotification = {
      id: `product_${productName}_${Date.now()}`,
      type: 'product',
      scheduledTime: time,
      options: {
        title: '💄 New Product Recommendation',
        body: `Check out ${productName} - perfect for your skin type!`,
        icon: '/favicon.ico',
        tag: 'product_recommendation',
        actions: [
          { action: 'view', title: '👀 View Product' },
          { action: 'dismiss', title: '❌ Not Interested' }
        ],
        data: { type: 'product', productName }
      }
    };

    return this.scheduleNotification(notification);
  }

  async scheduleAppointmentReminder(appointmentType: string, time: Date): Promise<boolean> {
    const reminderTime = new Date(time.getTime() - 60 * 60 * 1000); // 1 hour before
    
    const notification: ScheduledNotification = {
      id: `appointment_${appointmentType}_${Date.now()}`,
      type: 'reminder',
      scheduledTime: reminderTime,
      options: {
        title: '📅 Appointment Reminder',
        body: `Your ${appointmentType} appointment is in 1 hour`,
        icon: '/favicon.ico',
        tag: 'appointment_reminder',
        requireInteraction: true,
        actions: [
          { action: 'confirm', title: '✅ I\'m Ready' },
          { action: 'reschedule', title: '📅 Reschedule' }
        ],
        data: { type: 'appointment', appointmentType, originalTime: time }
      }
    };

    return this.scheduleNotification(notification);
  }
}

export const notificationService = NotificationService.getInstance();
