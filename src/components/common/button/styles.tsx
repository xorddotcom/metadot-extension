import MUIButton from '@mui/material/Button';
import styled from 'styled-components';
import { ButtonInterface } from './types';

import { colors, fonts, dimension } from '../../../utils';

const { primaryBackground } = colors;
const { buttonFontSize } = fonts;
const { _height } = dimension.button;

export const Button = styled(MUIButton)<ButtonInterface>`
    &.myStyling {
        /* width: 100%;
        height: ${_height}; */
        margin-bottom: 10px;
        color: white;
        box-shadow: none !important;
        box-sizing: border-box;
        /* border-radius: 40px; */
        background: ${(props) =>
            !props.lightBtn ? primaryBackground : 'transparent'};
        font-size: ${buttonFontSize};
        text-transform: capitalize;
        font-weight: 600;
        border: ${(props) =>
            props.lightBtn ? `1px solid ${primaryBackground}` : ''};
        &:hover {
            background: ${(props) =>
                !props.lightBtn ? primaryBackground : 'transparent'};
        }
        &:disabled {
            color: rgba(250, 250, 250, 0.8);
            background: rgba(46, 155, 155, 0.5);
            border: none;
        }
    }
`;
