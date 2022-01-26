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

const AuthorLink = styled.a<{ withoutVerticalMargin?: boolean }>`
  color: ${({ theme }) => theme.textSub};
  margin: 0;
  text-align: center;
  font-weight: bold;
  display: block;
  margin: ${({ withoutVerticalMargin }) =>
    withoutVerticalMargin ? "0" : "4px 0"};
  text-decoration: underline;
`;

const LinkContainer = styled.p`
  color: ${({ theme }) => theme.textSub};
  margin: 0;
  text-align: center;
  font-weight: bold;
  margin: 8px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer = () => {
  return (
    <Contianer>
      <LinkContainer>
        元ネタ:&nbsp;
        <AuthorLink
          withoutVerticalMargin
          href="https://www.powerlanguage.co.uk/wordle/"
        >
          Wordle
        </AuthorLink>
      </LinkContainer>
      <AuthorText>作ったのはね: TinyKitten</AuthorText>
      <AuthorLink href="https://tinykitten.me">ポートフォリオ</AuthorLink>
      <AuthorLink href="https://twitter.com/tinykitten8">Twitter</AuthorLink>
    </Contianer>
  );
};

export default Footer;
