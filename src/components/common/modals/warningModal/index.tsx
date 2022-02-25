import React from 'react';
import { WarningModalProps } from './types';
import WarningModalView from './view';

const WarningModal: React.FunctionComponent<WarningModalProps> = (props) => {
    return <WarningModalView {...props} />;
};

export default WarningModal;
