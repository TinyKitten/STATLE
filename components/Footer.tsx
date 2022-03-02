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

const AuthorLinkBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  @media screen and (max-width: 480px) {
    flex-direction: column;
    gap: 4px;
  }
`;

const HyperLink = styled.a`
  color: ${({ theme }) => theme.textSub};
  margin: 0;
  text-align: center;
  font-weight: bold;
  display: block;
  text-decoration: underline;
`;

const GitHubLink = styled.p`
  margin-top: 8px;
  text-align: center;
  color: ${({ theme }) => theme.textSub};
  font-weight: bold;
`;

const WordleLinkContainer = styled.p`
  color: ${({ theme }) => theme.textSub};
  text-align: center;
  font-weight: bold;
  margin: 0 0 8px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer = () => {
  return (
    <Contianer>
      <WordleLinkContainer>
        元ネタ:&nbsp;
        <HyperLink href="https://www.powerlanguage.co.uk/wordle/">
          Wordle
        </HyperLink>
      </WordleLinkContainer>
      <AuthorText>作ったのはね: TinyKitten</AuthorText>
      <AuthorLinkBlock>
        <HyperLink href="https://tinykitten.me">ポートフォリオ</HyperLink>
        <HyperLink href="https://twitter.com/tinykitten8">Twitter</HyperLink>
      </AuthorLinkBlock>
      <GitHubLink>開発者多忙で開発休止中</GitHubLink>
    </Contianer>
  );
};

export default Footer;
