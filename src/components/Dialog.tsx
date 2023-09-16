import { KeyboardEvent } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Modal from './Modal';
import Button from './Button';

export type DialogMessage = {
  type: 'alert' | 'confirm';
  content: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export type DialogProps = {
  message: DialogMessage;
  close: () => void;
};

export const DEFAULT_DIALOG_ACTION_LABEL = {
  confirm: '확인',
  cancel: '취소',
};

const Dialog = ({ message, close }: DialogProps) => {
  const handleCancelButtonClick = () => {
    message.onCancel?.();
    close();
  };

  const handleConfirmButtonClick = () => {
    message.onConfirm?.();
    close();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Escape') {
      return;
    }

    if (message.type === 'confirm') {
      handleCancelButtonClick();
      return;
    }

    if (message.type === 'alert') {
      handleConfirmButtonClick();
      return;
    }
  };

  return (
    <Modal>
      <Card
        className="dialog-card"
        key={Math.random().toString()}
        onKeyDown={handleKeyDown}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.15 }}
      >
        <p className="dialog-content">{message.content}</p>
        <div className="dialog-actions">
          {message.type === 'confirm' && (
            <Button
              className="dialog-cancel-button"
              onClick={handleCancelButtonClick}
            >
              {message.cancelLabel || DEFAULT_DIALOG_ACTION_LABEL.cancel}
            </Button>
          )}
          <Button
            className="dialog-confirm-button"
            onClick={handleConfirmButtonClick}
            $variant="primary"
            autoFocus
          >
            {message.confirmLabel || DEFAULT_DIALOG_ACTION_LABEL.confirm}
          </Button>
        </div>
      </Card>
    </Modal>
  );
};

export default Dialog;

const Card = styled(motion.div)`
  background-color: white;
  z-index: 2;
  padding: 16px;
  border-radius: 12px;
  width: 400px;

  .content {
    font-size: 1rem;
    color: black;
    white-space: pre-wrap;
  }

  .actions {
    margin-top: 24px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
  }
`;
