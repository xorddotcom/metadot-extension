import MUIButton from '@mui/material/Button';
import styled from 'styled-components';
import { ButtonInterface } from './types';

import { colors, fonts, dimension } from '../../../utils';

const { primaryBackground } = colors;
const { buttonFontSize } = fonts;
const { _height } = dimension.button;

export const Button = styled(MUIButton)<ButtonInterface>`
    &.myStyling {
        width: ${(props) => props.width || '288px'};
        height: ${(props) => props.height || _height};
        color: white;
        box-shadow: none !important;
        box-sizing: border-box;
        border-radius: ${(props) => props.br || '40px'};
        background: ${(props) =>
            !props.cancel ? primaryBackground : 'transparent'};
        font-size: ${buttonFontSize};
        text-transform: capitalize;
        font-weight: 500;
        border: ${(props) => props.border || `1px solid ${primaryBackground}`};
        /* border: 2px solid green; */
        &:hover {
            background-color: ${(props) =>
                !props.cancel ? primaryBackground : 'transparent'};
        }
        &:disabled {
            color: rgba(250, 250, 250, 0.8);
            background: rgba(46, 155, 155, 0.5);
            border: none;
        }
    }
`;
