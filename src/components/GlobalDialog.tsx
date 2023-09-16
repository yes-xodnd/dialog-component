import { useDialogStore } from '../store/dialogStore';
import Dialog from './Dialog';

const GlobalDialog = () => {
  const dialogStore = useDialogStore();
  const message = dialogStore.messages[0];

  return (
    <>{message && <Dialog message={message} close={dialogStore.close} />}</>
  );
};

export default GlobalDialog;
