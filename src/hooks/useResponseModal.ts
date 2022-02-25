import { useDispatch } from 'react-redux';
import {
    setIsResponseModalOpen,
    setResponseImage,
    setMainTextForSuccessModal,
    setSubTextForSuccessModal,
} from '../redux/slices/modalHandling';
import { useResponseModalProps } from './types';

const useResponseModal = (props: useResponseModalProps): (() => void) => {
    const { isOpen, modalImage, mainText, subText } = props;
    const dispatch = useDispatch();

    const openModal = (): void => {
        dispatch(setIsResponseModalOpen(isOpen));
        dispatch(setResponseImage(modalImage));
        dispatch(setMainTextForSuccessModal(mainText));
        dispatch(setSubTextForSuccessModal(subText));
    };

    return openModal;
};

export default useResponseModal;
