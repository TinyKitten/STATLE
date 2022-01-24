import styled from "styled-components";

const Contianer = styled.header`
  border-top: ${({ theme }) => `2px solid ${theme.edge}`};
  padding: 12px 0;
  margin-top: 32px;
`;
const AuthorText = styled.p`
  color: ${({ theme }) => theme.textSub};
  margin: 0;
  text-align: center;
  font-weight: bold;
`;

const AuthorLink = styled.a`
  color: ${({ theme }) => theme.textSub};
  margin: 0;
  text-align: center;
  font-weight: bold;
  display: block;
  margin: 8px 0;
  text-decoration: underline;
`;

const Footer = () => {
  return (
    <Contianer>
      <AuthorText>AUTHOR: TinyKitten</AuthorText>
      <AuthorLink href="https://tinykitten.me">PORTFOLIO</AuthorLink>
      <AuthorLink href="https://twitter.com/tinykitten8">TWITTER</AuthorLink>
    </Contianer>
  );
};

export default Footer;
