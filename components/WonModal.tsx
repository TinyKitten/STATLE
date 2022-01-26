import styled from "styled-components";
import AppModal from "./AppModal";

type Props = {
  isOpen: boolean;
  onRequestClose: () => void;
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.background};
  padding: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Heading = styled.h2`
  margin: 0 0 12px 0;
  color: ${({ theme }) => theme.text};
`;

const CloseButtonContainer = styled.div`
  margin-top: 24px;
`;

const CloseButton = styled.button`
  appearance: none;
  display: block;
  background-color: ${({ theme }) => theme.backgroundSub};
  /* border: ${({ theme }) => `1px solid ${theme.edge}`}; */
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  padding: 12px 32px;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  font-weight: bold;
`;

const TODOText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.text};
`;

const WonModal = ({ isOpen, onRequestClose }: Props) => {
  return (
    <AppModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Container>
        <Heading>えらいっ</Heading>
        <TODOText>シェア機能そのうち実装するよ</TODOText>
        <CloseButtonContainer>
          <CloseButton onClick={onRequestClose}>閉じる</CloseButton>
        </CloseButtonContainer>
      </Container>
    </AppModal>
  );
};

export default WonModal;
