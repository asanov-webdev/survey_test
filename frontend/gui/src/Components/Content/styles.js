import styled from "styled-components";

export const StyledStatisticsTypeButton = styled.button`
  font-weight: ${(props) => (props.chosen ? `700` : `400`)};
`;
