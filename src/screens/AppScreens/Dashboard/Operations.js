import React from 'react';
import { useHistory } from 'react-router-dom';

import { Option, OptionRow, OptionsName } from './StyledComponents';

import Send from '../../../assets/images/Send.svg';
import Swap from '../../../assets/images/Swap.svg';
import Governance from '../../../assets/images/Governance.svg';
import Stake from '../../../assets/images/Stake.svg';

import { fonts } from '../../../utils';

const { mainHeadingfontFamilyClass } = fonts;

function Operations() {
  const history = useHistory();
  return (
    <OptionRow>
      <Option onClick={() => history.push('/Send')}>
        <img
          src={Send}
          alt="send icon"
          style={{
            width: 22,
            color: '#fafafa',
            marginTop: 10,
          }}
        />
        <OptionsName className={mainHeadingfontFamilyClass}>Send</OptionsName>
      </Option>

      <Option>
        <img
          src={Swap}
          alt="send icon"
          style={{
            width: 22,
            color: '#fafafa',
            marginTop: 10,
          }}
        />
        <OptionsName className={mainHeadingfontFamilyClass} inActive>
          Swap
        </OptionsName>
      </Option>

      <Option>
        <img
          src={Governance}
          alt="send icon"
          style={{
            width: 22,
            color: '#fafafa',
            marginTop: 10,
          }}
        />
        <OptionsName className={mainHeadingfontFamilyClass} inActive>
          Governance
        </OptionsName>
      </Option>

      <Option>
        <img
          src={Stake}
          alt="send icon"
          style={{
            width: 22,
            color: '#fafafa',
            marginTop: 10,
          }}
        />
        <OptionsName className={mainHeadingfontFamilyClass} inActive>
          Stake
        </OptionsName>
      </Option>
    </OptionRow>
  );
}

export default Operations;
