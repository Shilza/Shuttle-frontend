import {useCallback, useState} from "react";

const isFunction = (func) => func && typeof func === 'function';

export const useModal = (props = {}) => {

    const {onOpen, onClose} = props;
    const [isOpen, setIsOpen] = useState(false);

    const openModal = useCallback((data) => {
        setIsOpen(true);
        isFunction(onOpen) && onOpen(data);
    }, [onOpen]);

    const closeModal = useCallback((data) => {
        setIsOpen(false);
        isFunction(onClose) && onClose(data);
    }, [onClose]);

    return {
        isOpen,
        openModal,
        closeModal
    };
};
