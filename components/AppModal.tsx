import ReactModal from "react-modal";

const styles: ReactModal.Styles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    overflow: "hidden",
    border: "none",
    boxShadow: "0 0 8px rgba(0, 0, 0, 0.16)",
  },
};

type Props = {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
};

const AppModal = ({ isOpen, onRequestClose, children }: Props) => {
  return (
    <ReactModal isOpen={isOpen} onRequestClose={onRequestClose} style={styles}>
      {children}
    </ReactModal>
  );
};

export default AppModal;
