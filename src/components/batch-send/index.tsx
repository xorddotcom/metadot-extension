import React, { useState } from 'react';
import {
    Wrapper,
    VerticalContentDiv,
    HorizontalContentDiv,
} from '../common/wrapper';
import { fonts, helpers } from '../../utils';
import BatchSendView from './view';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const BatchSend: React.FunctionComponent = () => {
    return (
        <Wrapper width="88%">
            <BatchSendView />
        </Wrapper>
    );
};

export default BatchSend;
