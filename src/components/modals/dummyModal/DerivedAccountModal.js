/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// Modal.js

import React, { useEffect, useRef } from 'react';
import styles from './styledComponent/style.module.css';

const DerivedModal = ({
  modalStyle, children, show, onClose, backdropStyle,
}) => {
  const modalRef = useRef(null);
  useEffect(
    () => {
      if (show) {
        modalRef.current.classList.add(styles.visible);
      } else {
        modalRef.current.classList.remove(styles.visible);
      }
    },
    [
      show,
    ],
  );
  return (
    <>
      <div
        onClick={onClose}
        ref={modalRef}
        style={backdropStyle}
        className={`${styles.modal__wrap}`}
      >

        <div style={modalStyle} className={styles.modal}>
          <button
            type="button"
            onClick={onClose}
            className={styles.close__btn}
            style={{
              width: 60, height: 40, position: 'absolute', top: 0, right: 0, margin: '1rem',
            }}
          >
            x
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default DerivedModal;

// How to call this modal

// { /* <DerivedModal
//           key={publicKeyy}
//           show={modalIsOpen}
//           onClose={closeModal}
//         >
//           <div className="content">
//             <img
//               src="https://cdn.pixabay.com/photo/2015/01/09/11/11/office-594132__340.jpg"
//               alt="Developer"
//             />
//             <div className="text">
//               <h2>{selectedProject && selectedProject.publicKey}</h2>
//               <p>
//                 {selectedProject && selectedProject.seed}
//               </p>
//             </div>
//           </div>
//         </DerivedModal> */ }
