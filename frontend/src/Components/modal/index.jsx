import React from 'react'
import Modal from 'react-modal'
const ModalComponent = ({openModal,onRequestClose,children,posTop,posLeft,justifyContent}) => {
    const customStyles = {
        content: {
            top: `${posTop}%`,
            left: `${posLeft}%`,
            maxHeight: '70vh',
            width: '300px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            padding: '20px',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: `${justifyContent}`,
            alignItems: 'center',
        },
        overlay: {
            backgroundColor: 'rgba(0,0,0,0.5)',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }
    }
  return (
    <Modal
        isOpen={openModal}
        onRequestClose={onRequestClose}
        style={customStyles}
        contentLabel="Modal"
    >
    {children}
    </Modal>

  )
}

export default ModalComponent