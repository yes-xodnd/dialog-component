import { useMemo } from 'react';
import { create } from 'zustand';
import { DialogMessage } from '../components/Dialog';

export interface DialogStore {
  messages: DialogMessage[];
  show: (message: DialogMessage) => Promise<boolean>;
  close: () => void;
}

export const useDialogStore = create<DialogStore>((set) => {
  const show = async (message: DialogMessage) => {
    return new Promise<boolean>((resolve) => {
      const onConfirm = () => {
        message.onConfirm?.();
        resolve(true);
      };

      const onCancel = () => {
        message.onCancel?.();
        resolve(false);
      };

      set((state) => ({
        messages: [...state.messages, { ...message, onConfirm, onCancel }],
      }));
    });
  };

  const close = () => {
    set((state) => ({ messages: state.messages.slice(1) }));
  };

  return {
    messages: [],
    show,
    close,
  };
});

export const useDialog = () => {
  const { show, close } = useDialogStore();
  return useMemo(() => ({ show, close }), [show, close]);
};
