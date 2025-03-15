import { useAppDispatch, useAppSelector } from '../Redux/Hooks';
import { setToasts } from '../Redux/slices/MeetingSlice';

const UseToast = () => {
  const toasts = useAppSelector((state) => state.meetings?.toasts || []);
  const dispatch = useAppDispatch();

  const createToast = ({ title, type = 'primary', message = '' }) => {
    const newToast = {
      id: new Date().toISOString(),
      title,
      color: type,
      message, 
    };

    dispatch(setToasts([...toasts, newToast]));
  };

  return createToast;
};

export default UseToast;

