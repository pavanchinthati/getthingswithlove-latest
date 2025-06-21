import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import "./Modal.scss";

const Modal = ({ isOpen, onClose, showCloseBtn = false, children }) => {
  const overlayRef = useRef();

  useEffect(() => {
    const handleClick = e => {
      if (e.target === overlayRef.current) onClose();
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  useEffect(() => {
    const handleKey = e => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const popIn = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 25, duration: 0.3 }
    },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="modal-content"
            variants={popIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {showCloseBtn && (
              <button className="modal-close" onClick={onClose}>
                &times;
              </button>
            )}

            <div className="modal-body">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;