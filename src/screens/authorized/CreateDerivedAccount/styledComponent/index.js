import styled from 'styled-components';

export const LabelAndTextInput = styled.div`
  width: 100%;
  min-height: ${(props) => (props.minHeight ? props.minHeight : '103px')};
  margin-top: ${(props) => (props.marginTop && props.marginTop)};
  position: relative;
`;
