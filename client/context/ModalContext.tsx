import CustomModal from "@/components/CustomModal";
import React, { createContext, useContext, useState } from "react";

// Allowed modal types
type ModalType = "success" | "error" | "info";

type ModalContextType = {
  showModal: (message: string, type?: ModalType) => void; // type optional
  hideModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<ModalType>("info"); // default to "info"

  const showModal = (msg: string, modalType: ModalType = "info") => {
    setMessage(msg);
    setType(modalType);
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
    setMessage("");
    setType("info");
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}

      {/* ONE global modal */}
      <CustomModal visible={visible} message={message} type={type} onClose={hideModal} />
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used inside ModalProvider");
  }
  return context;
};
