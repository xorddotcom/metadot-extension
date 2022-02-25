import React from 'react';
import { Props } from './types';

import TxCardView from './view';

const TxCard: React.FunctionComponent<Props> = (props) => {
    return <TxCardView {...props} />;
};

export default TxCard;
