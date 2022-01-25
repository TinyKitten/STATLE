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
  margin: 0 0 32px 0;
  color: ${({ theme }) => theme.text};
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

const WonModal = ({ isOpen, onRequestClose }: Props) => {
  return (
    <AppModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Container>
        <Heading>YOU WON THE GAME!</Heading>
        <CloseButton onClick={onRequestClose}>CLOSE</CloseButton>
      </Container>
    </AppModal>
  );
};

export default WonModal;
