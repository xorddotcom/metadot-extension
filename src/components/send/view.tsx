import '@polkadot/api-augment';
import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../common/header';
import Button from '../common/button';
import { MainContent, CenterContent, MultisigBoxDiv } from './style';
import ConfirmSend from '../common/modals/confirmSend';
import { images, fonts } from '../../utils';

import FromInput from '../common/from-input';
import ToInput from '../common/to-input';
import AmountInput from '../common/amount-input';
import EDC from './components/existential-deposit';
import { SendViewProps, SignatoryBoxProps } from './types';
import { SubHeading, MainText } from '../common/text';
import { MyAccounts } from '../common/modals';
import { Input } from '../common';
import { RootState } from '../../redux/store';

const { dropdownIcon } = images;
const { mainHeadingfontFamilyClass } = fonts;
const SignatoryBox: React.FunctionComponent<SignatoryBoxProps> = (props) => {
    const { signatoryToSign, setSignatoryToSign } = props;
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const handleSelection = (acc: any): void => {
        console.log('chala');
        setSignatoryToSign(acc.publicKey);
        setIsModalOpen(false);
        console.log('the end chala');
    };

    const { activeAccount } = useSelector((state: RootState) => state);
    const thisAccount = useSelector(
        (state: RootState) => state.accounts[activeAccount.publicKey]
    );

    const onChangeHandler = (e: string): void => {
        setSignatoryToSign(e);
    };
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
                    {signatoryToSign
                        ? `${signatoryToSign.slice(
                              0,
                              5
                          )} ... ${signatoryToSign.slice(-5)}`
                        : 'Add Signatory'}
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

            {/* <Input
                onChange={(e) => setSignatoryToSign(e)}
                value={signatoryToSign}
                id="name"
                placeholder="Signatory Address"
                rightIconDropDown
                topPosition="30px"
                rightPosition="20px"
                rightIconDropDownHandler={() => setIsModalOpen(true)}
                // onClick={() => setIsModalOpen(true)}
            /> */}

            <MyAccounts
                open={isModalOpen}
                accountList={thisAccount?.multisigDetails?.members || []}
                handleClose={() => setIsModalOpen(false)}
                onSelection={handleSelection}
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
        signatoryToSign,
        setSignatoryToSign,
    } = props;
    console.log(multisig, 'is it multisig');
    const signatoryBox = {
        signatoryToSign,
        setSignatoryToSign,
    };
    return (
        <>
            <FromInput {...fromInput} />
            <MainContent>
                <ToInput {...toInput} />
                {multisig && <SignatoryBox {...signatoryBox} />}
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
