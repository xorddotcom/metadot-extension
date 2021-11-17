/* eslint-disable max-len */
/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Option, OptionRow, OptionsName } from './StyledComponents';
import Send from '../../../assets/images/Send.svg';
import Swap from '../../../assets/images/Swap.svg';
import Governance from '../../../assets/images/Governance.svg';
import Stake from '../../../assets/images/Stake.svg';
import { fonts, colors } from '../../../utils';

const { mainHeadingfontFamilyClass } = fonts;
const { primaryTextColor } = colors;
function Operations() {
  const history = useHistory();
  const { account } = useSelector((state) => state);
  const tootltipText = {
    className: 'normalTooltiptext',
    style: {
      width: '90px',
      left: '65%',
      fontSize: '0.7rem',
      bottom: '110%',
      fontWeight: 300,
    },
  };
  return (
    <OptionRow>
      <div className={`normalTooltip ${mainHeadingfontFamilyClass}`}>
        <Option onClick={() => (account.chainName === 'Astar' ? console.log('coming soon1') : history.push('/Send'))}>
          <img
            src={Send}
            alt="send icon"
            style={{
              width: 22,
              color: primaryTextColor,
              marginTop: 10,
            }}
          />
          <OptionsName className={mainHeadingfontFamilyClass}>Send</OptionsName>
        </Option>
        {
          account.chainName === 'Astar' && (
          <span {...tootltipText}>
            Coming Soon
          </span>
          )
        }
      </div>

      <div className={`normalTooltip ${mainHeadingfontFamilyClass}`}>
        <Option>
          <img
            src={Swap}
            alt="send icon"
            style={{
              width: 22,
              color: primaryTextColor,
              marginTop: 10,
            }}
          />
          <OptionsName className={mainHeadingfontFamilyClass} inActive>
            Swap
          </OptionsName>
        </Option>
        <span {...tootltipText}>
          Coming Soon
        </span>
      </div>

      <div className={`normalTooltip ${mainHeadingfontFamilyClass}`}>
        <Option>
          <img
            src={Governance}
            alt="send icon"
            style={{
              width: 22,
              color: primaryTextColor,
              marginTop: 10,
            }}
          />
          <OptionsName className={mainHeadingfontFamilyClass} inActive>
            Governance
          </OptionsName>
        </Option>
        <span {...tootltipText}>
          Coming Soon
        </span>
      </div>

      <div className={`normalTooltip ${mainHeadingfontFamilyClass}`}>
        <Option>
          <img
            src={Stake}
            alt="send icon"
            style={{
              width: 22,
              color: primaryTextColor,
              marginTop: 10,
            }}
          />
          <OptionsName className={mainHeadingfontFamilyClass} inActive>
            Stake
          </OptionsName>
        </Option>
        <span {...tootltipText}>
          Coming Soon
        </span>
      </div>
    </OptionRow>
  );
}

export default Operations;
