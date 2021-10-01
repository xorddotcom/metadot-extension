import React from 'react';
import {
  AccountContainer,
  DashboardHeader,
  LogoContainer,
  MainPanel,
  NetworkContainer,
  Option,
  OptionRow,
  Wrapper,
} from './StyledComponents';

function Dashboard(props) {
  return (
    <Wrapper>
      <DashboardHeader>
        <LogoContainer></LogoContainer>

        <NetworkContainer></NetworkContainer>

        <AccountContainer></AccountContainer>
      </DashboardHeader>

      <MainPanel></MainPanel>

      <OptionRow>
        <Option></Option>
        <Option></Option>
        <Option></Option>
        <Option></Option>
      </OptionRow>
    </Wrapper>
  );
}

export default Dashboard;
