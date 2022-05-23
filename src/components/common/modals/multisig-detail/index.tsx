import React from 'react';
import { WarningModalProps } from './types';
import MultisiglDetailsView from './view';

const MultisigDetail: React.FunctionComponent<WarningModalProps> = (props) => {
    return <MultisiglDetailsView {...props} />;
};

export default MultisigDetail;
