import React from 'react';
import { AuthWrapper, Header } from '../../../components';
import { fonts } from '../../../utils';
import { MainHeading, SubHeading } from './StyledComponents/index';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const Support = () => (
  <AuthWrapper>
    <Header centerText="Support" backHandler={() => console.log('object')} />
    <div style={{ marginTop: '34px' }}>
      <MainHeading className={mainHeadingfontFamilyClass}>
        Need help?
      </MainHeading>
      <SubHeading className={subHeadingfontFamilyClass}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
        culpa magnam, ab amet nemo perferendis beatae suscipit
        tempore quas vel. Lorem, ipsum.
      </SubHeading>
    </div>
  </AuthWrapper>
);

export default Support;
