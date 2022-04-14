import React from 'react';

import { useSelector } from 'react-redux';
import SwapView from './view';
import SelectTokenModal from '../common/modals/selectToken';
import { Token } from '../common/modals/selectToken/types';

import { RootState } from '../../redux/store';

const Swap: React.FunctionComponent = (): JSX.Element => {
    const { balances } = useSelector((state: RootState) => state.activeAccount);

    const [tokenList, setTokenList] = React.useState<Token[]>([]);
    const [selectTokenModalState, setSelectTokenModalState] = React.useState({
        open: false,
        tokenType: 'tokenFrom',
    });

    const [tokenFrom, setTokenFrom] = React.useState<Token>();
    const [tokenTo, setTokenTo] = React.useState<Token>();

    React.useEffect(() => {
        if (balances.length > 1) {
            if (!tokenFrom) setTokenFrom(balances[0]);
            if (!tokenTo) setTokenTo(balances[1]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [balances]);

    React.useEffect(() => {
        if (tokenFrom && tokenTo) {
            const TokenList = balances.filter((token) => {
                return (
                    token.name !== tokenFrom.name && token.name !== tokenTo.name
                );
            });
            setTokenList(TokenList);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenFrom, tokenTo]);

    const handleOpen = (tokenType: string): void => {
        setSelectTokenModalState({
            open: true,
            tokenType,
        });
    };

    const handleClose = (): void => {
        setSelectTokenModalState({
            ...selectTokenModalState,
            open: false,
        });
    };

    const handleSelect = (token: Token): void => {
        if (selectTokenModalState.tokenType === 'tokenFrom')
            setTokenFrom(token);
        else {
            setTokenTo(token);
        }

        handleClose();
    };

    return (
        <>
            <SwapView
                handleOpen={handleOpen}
                tokenFrom={tokenFrom}
                tokenTo={tokenTo}
            />
            <SelectTokenModal
                open={selectTokenModalState.open}
                handleClose={handleClose}
                tokenList={tokenList}
                handleSelect={handleSelect}
                style={{
                    position: 'relative',
                    width: '326px',
                    height: '386px',
                    background: '#141414',
                    pb: 3,
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    marginBottom: '220px',
                }}
            />
        </>
    );
};

export default Swap;
