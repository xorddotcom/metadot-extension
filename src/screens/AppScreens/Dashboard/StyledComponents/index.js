import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const DashboardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid white;
  width: 100%;
`;

export const LogoContainer = styled.div`
  width: 20%;
  border: 1px solid red;
  height: 50px;
`;

export const NetworkContainer = styled.div`
  width: 60%;
  border: 1px solid green;
  height: 90px;
`;

export const AccountContainer = styled.div`
  width: 20%;
  border: 1px solid blue;
  height: 50px;
`;

export const MainPanel = styled.div`
  width: 100%;
  height: 180px;
  background: linear-gradient(
    103.97deg,
    rgba(230, 0, 122, 0.5) -171.04%,
    rgba(33, 33, 33, 0.5) 100.34%,
    rgba(230, 0, 122, 0.5) 101.04%,
    rgba(20, 20, 20, 0.325) 106.41%
  );
  backdrop-filter: blur(130px);

  /* Note: backdrop-filter has minimal browser support */
  border-radius: 15px;

  margin-bottom: 25px;
  margin-top: 25px;
`;

export const OptionRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border: 1px solid red;
  justify-content: space-between;
`;

export const Option = styled.div`
  width: 70px;
  height: 70px;

  background: #232323;
  border-radius: 15px;
`;
