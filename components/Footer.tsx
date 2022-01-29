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
`;

const HyperLink = styled.a`
  color: ${({ theme }) => theme.textSub};
  margin: 0;
  text-align: center;
  font-weight: bold;
  display: block;
  text-decoration: underline;
`;

const GitHubLink = styled(HyperLink)`
  margin-top: 8px;
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
        <HyperLink href="https://blog.tinykitten.me/posts/statle/">
          開発秘話と言うにはおこがましい記事
        </HyperLink>
      </AuthorLinkBlock>
      <GitHubLink href="https://github.com/TinyKitten/STATLE/">
        開発に貢献する
      </GitHubLink>
    </Contianer>
  );
};

export default Footer;
