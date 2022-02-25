import { useDispatch } from 'react-redux';

interface GenericIdentityFn {
    (): any;
}

const useDispatcher = (): ((v1: GenericIdentityFn) => void) => {
    const dispatch = useDispatch();

    return (action: GenericIdentityFn): void => dispatch(action());
};

export default useDispatcher;
