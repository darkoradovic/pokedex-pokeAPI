import React, { createContext, useState } from "react";
export const UserContext = createContext(null);

interface Props {
  children: React.ReactNode;
}

const UserProvider: React.FC<Props> = ({ children }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<any>("");
  const [file, setFile] = useState<any>("");
  const [birthday, setBirthday] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [subscription, setSubsription] = useState(
    JSON.parse(localStorage.getItem("user"))?.subscription
  );
  const [stripeModal, setStripeModal] = useState(false);
  return (
    <UserContext.Provider
      value={{
        name,
        setName,
        email,
        setEmail,
        avatar,
        setAvatar,
        file,
        setFile,
        birthday,
        setBirthday,
        disabled,
        setDisabled,
        updating,
        setUpdating,
        subscription,
        setSubsription,
        stripeModal,
        setStripeModal,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
