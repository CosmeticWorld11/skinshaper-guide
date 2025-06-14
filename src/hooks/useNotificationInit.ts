
import { useEffect } from 'react';
import { notificationService } from '@/services/notificationService';

export const useNotificationInit = () => {
  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        await notificationService.initialize();
      } catch (error) {
        console.error('Failed to initialize notifications:', error);
      }
    };

    initializeNotifications();
  }, []);
};
