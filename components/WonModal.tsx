import styled from "styled-components";
import AppModal from "./AppModal";

type Props = {
  isOpen: boolean;
  onRequestClose: () => void;
  onShareClick: () => void;
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

const ButtonsContainer = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 1rem;
  margin-top: 12px;
`;

const BaseButton = styled.div`
  appearance: none;
  cursor: pointer;
  display: block;
  border: none;
  font-size: 1rem;
  padding: 12px 0;
  width: 100%;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  font-weight: bold;
`;

const ShareButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
`;

const CloseButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.backgroundSub};
  color: ${({ theme }) => theme.text};
`;

const WonModal = ({ isOpen, onShareClick, onRequestClose }: Props) => {
  return (
    <AppModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Container>
        <Heading>えらいっ</Heading>
        <ButtonsContainer>
          <ShareButton onClick={onShareClick}>シェアする</ShareButton>
          <CloseButton onClick={onRequestClose}>閉じる</CloseButton>
        </ButtonsContainer>
      </Container>
    </AppModal>
  );
};

export default WonModal;
