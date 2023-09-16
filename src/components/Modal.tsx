import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';

export type ModalProps = {
  onOverlayClick?: () => void;
};

const Modal = ({ children, onOverlayClick }: PropsWithChildren<ModalProps>) => {
  return createPortal(
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      onClick={onOverlayClick}
    >
      {children}
    </Overlay>,
    document.body,
  );
};

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000080;
  z-index: 10;
`;

export default Modal;
