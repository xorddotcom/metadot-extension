import BButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { colors, fonts, dimension } from '../../../utils';
import { ButtonInterface } from './types';

const { primaryBackground } = colors;
const { buttonFontSize } = fonts;
const { _height } = dimension.button;

export const Button = styled(BButton)`
    width: ${(props: ButtonInterface) => props.width || '288px'};
    height: ${(props: ButtonInterface) => props.height || _height};
    filter: drop-shadow(0px 10px 10px rgba(46, 155, 155, 0.07));
    box-sizing: border-box;
    border-radius: ${(props: ButtonInterface) => props.br || '40px'};
    background: ${(props: ButtonInterface) =>
        !props.cancel ? primaryBackground : 'transparent'};
    font-size: ${buttonFontSize};
    text-transform: capitalize;
    font-weight: 500;
    border: ${(props: ButtonInterface) =>
        props.border || `1px solid ${primaryBackground}`};
    &:hover {
        background-color: ${(props: ButtonInterface) =>
            !props.cancel ? primaryBackground : 'transparent'};
    }
    &:disabled {
        color: rgba(250, 250, 250, 0.8);
        background: rgba(46, 155, 155, 0.5);
        box-shadow: 0px 10px 10px rgba(46, 155, 155, 0.02);
        border: none;
    }
`;
