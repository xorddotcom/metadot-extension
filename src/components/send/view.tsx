import '@polkadot/api-augment';
import React from 'react';
import Header from '../common/header';
import Button from '../common/button';
import { MainContent, CenterContent, MultisigBoxDiv } from './style';
import ConfirmSend from '../common/modals/confirmSend';
import { images, fonts } from '../../utils';

import FromInput from '../common/from-input';
import ToInput from '../common/to-input';
import AmountInput from '../common/amount-input';
import EDC from './components/existential-deposit';
import { SendViewProps } from './types';
import { SubHeading, MainText } from '../common/text';
import { MyAccounts } from '../common/modals';

const { dropdownIcon } = images;
const { mainHeadingfontFamilyClass } = fonts;
const SignatoryBox: React.FunctionComponent = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    return (
        <>
            <MainText className={mainHeadingfontFamilyClass}>
                Signatory
            </MainText>
            <MultisigBoxDiv onClick={() => setIsModalOpen(true)}>
                <SubHeading
                    color="#FAFAFA"
                    opacity="0.6"
                    fontSize="15px"
                    lineHeight="0px"
                    ml="18px"
                >
                    Add Signatory
                </SubHeading>
                <img
                    src={dropdownIcon}
                    alt="dropdown"
                    style={{
                        height: '7px',
                        width: '12px',
                        marginRight: '20px',
                    }}
                    aria-hidden="true"
                />
            </MultisigBoxDiv>
            <MyAccounts
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
                onSelection={() => console.log('a')}
                style={{
                    position: 'relative',
                    width: '300px',
                    background: '#141414',
                    pb: 3,
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    marginTop: '144px',
                }}
            />
        </>
    );
};

const SendView: React.FunctionComponent<SendViewProps> = (props) => {
    const {
        toInput,
        amountInput,
        ED,
        nextBtn,
        confirmSend,
        fromInput,
        multisig,
    } = props;
    console.log(multisig, 'is it multisig');
    return (
        <>
            <FromInput {...fromInput} />
            <MainContent>
                <ToInput {...toInput} />
                {multisig && <SignatoryBox />}
                <AmountInput {...amountInput} />

                <EDC {...ED} />
            </MainContent>
            <CenterContent>
                <Button {...nextBtn} />
            </CenterContent>

            <ConfirmSend {...confirmSend} />
        </>
    );
};

export default SendView;
