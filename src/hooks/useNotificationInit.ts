
import { useEffect } from 'react';
import { notificationService } from '@/services/notificationService';

export const useNotificationInit = () => {
  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        await notificationService.initialize();
        console.log('Notification service initialized successfully');
      } catch (error) {
        console.error('Failed to initialize notifications:', error);
        // Don't throw the error, just log it to prevent app crashes
      }
    };

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(initializeNotifications, 100);
    
    return () => clearTimeout(timer);
  }, []);
};
