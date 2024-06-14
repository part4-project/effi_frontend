import Toast from '@components/toast/toast';
import { useToast } from '@hooks/use-toast';

const Toaster = () => {
  const { toasts } = useToast();

  return (
    <>
      {toasts.map((toast) => {
        return (
          <Toast key={toast.id} show={toast.show} error={toast.error}>
            {toast.message}
          </Toast>
        );
      })}
    </>
  );
};

export default Toaster;
