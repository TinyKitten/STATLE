import styled from "styled-components";

const Contianer = styled.header`
  border-bottom: ${({ theme }) => `2px solid ${theme.edge}`};
  padding: 12px 0;
`;

const AppName = styled.h1`
  color: ${({ theme }) => theme.text};
  margin: 0;
  text-align: center;
`;
const AppMotto = styled.p`
  color: ${({ theme }) => theme.textSub};
  margin: 0;
  text-align: center;
  font-weight: bold;
`;

const Header = () => {
  return (
    <Contianer>
      <AppName>STATLE(BETA VERSION)</AppName>
      <AppMotto>JAPANESE TRAIN STATION GUESSNING GAME</AppMotto>
    </Contianer>
  );
};

export default Header;
