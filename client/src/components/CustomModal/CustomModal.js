import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CustomModal = ({ modal, toggleModal, modalHandler = () => { }, textHeader = '', textSubmit = 'Ok', textCancel = 'Cancel', children }) => {
    const [modifyChildren, setModifyChildren] = useState();
    const [isSubmit, setIsSubmit] = useState(false);

    const handleSubmit = (args) => {
        setIsSubmit(false);
        if(args){
            modalHandler(args);
        }
    }

    useEffect(() => {
        setModifyChildren(React.cloneElement(children, { isSubmit, handleSubmit }));
    }, [children, isSubmit]);

    return (
        <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>{textHeader}</ModalHeader>
            <ModalBody>
                {modifyChildren}
            </ModalBody>
            <ModalFooter>
                <Button color='primary' onClick={()=>setIsSubmit(true)}>{textSubmit}</Button>{' '}
                <Button color='secondary' onClick={toggleModal}>{textCancel}</Button>
            </ModalFooter>
        </Modal>
    );
};

export default CustomModal;