import * as C from "./styles";
import { useEffect, useState } from "react";
import { Profile } from "../components/Profile";
import { Subscriptions } from "../components/Subscriptions";

type ProfileProps = {
  setIsFavoritePage?: (e: boolean) => void;
  tabs?: "Profile" | "Subscription";
};

export const ProfilePage = ({ setIsFavoritePage, tabs }: ProfileProps) => {
  const [activeTab, setActiveTab] = useState("Profile");
  useEffect(() => {
    setIsFavoritePage(true);
  }, []);

  const renderActiveTab = () => {
    switch (activeTab) {
      case "Profile":
        return <Profile />;
      case "Subscription":
        return <Subscriptions />;
      default:
        return <Profile />;
    }
  };

  return (
    <C.Container className="main-container">
      <div className="tabs">
        <span
          className={activeTab === "Profile" ? "active" : ""}
          onClick={() => setActiveTab("Profile")}
        >
          Profile
        </span>
        <span
          className={activeTab === "Subscription" ? "active" : ""}
          onClick={() => setActiveTab("Subscription")}
        >
          Subsription
        </span>
      </div>
      {renderActiveTab()}
    </C.Container>
  );
};
