import { addNotification } from './notificationSlice';

// Add  notification to state
export const handleNotification = (notification) => (dispatch) => {
  dispatch(addNotification(notification));
};
