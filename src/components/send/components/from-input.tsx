import React from 'react';
import { useSelector } from 'react-redux';
import { Balance, FromAccount, PlainIcon } from '../style';
import { MainText } from '../../common/text';
import {
    VerticalContentDiv,
    HorizontalContentDiv,
} from '../../common/wrapper/index';
import { fonts, helpers } from '../../../utils';
import { RootState } from '../../../redux/store';

const { addressModifier } = helpers;

const FromInput: React.FunctionComponent = () => {
    const { accountName, publicKey } = useSelector(
        (state: RootState) => state.activeAccount
    );
    const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

    const mainText = {
        className: mainHeadingfontFamilyClass,
        ls: '0.02em',
        lh: '16px',
        mb: '2px',
        fs: '15px',
        mt: '-4px',
    };
    return (
        <VerticalContentDiv mb="20px">
            <MainText className={mainHeadingfontFamilyClass}>From</MainText>
            <FromAccount id="from-account">
                <HorizontalContentDiv>
                    <PlainIcon />
                    <VerticalContentDiv>
                        <MainText id="account-name" {...mainText}>
                            {accountName}
                        </MainText>
                        <Balance
                            id="public-key"
                            className={subHeadingfontFamilyClass}
                        >
                            {addressModifier(publicKey)}
                        </Balance>
                    </VerticalContentDiv>
                </HorizontalContentDiv>
            </FromAccount>
        </VerticalContentDiv>
    );
};

export default FromInput;
