import * as C from "./styles";
import { Link } from "react-router-dom";
import { ReactComponent as LinkedinLogo } from "../../assets/logo-linkedin.svg";
import { ReactComponent as GithubLogo } from "../../assets/logo-github.svg";
import { ReactComponent as TelegramLogo } from "../../assets/logo-telegram.svg";
import { ReactComponent as GearIcon } from "../../assets/gear-icon.svg";
import { ReactComponent as AvatarLogin } from "../../assets/pokeball.svg";
import { ReactComponent as Logout } from "../../assets/logout.svg";
import { ReactComponent as HeartIcon } from "../../assets/icon-heart-black.svg";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../../api/firebase/firebase";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";

type Props = {
  setAuthModal?: (value: boolean) => void;
  header?: boolean;
};

export const SocialMedia = ({ setAuthModal, header }: Props) => {
  const [user] = useAuthState(auth);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { avatar, setAvatar } = useContext(UserContext);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <C.Container>
      {header && (
        <>
          <li>
            <C.Avatar>
              {user ? (
                <Button onClick={handleClick}>
                  {avatar ? (
                    <img src={avatar} alt="avatar" className="avatar" />
                  ) : (
                    <AvatarLogin />
                  )}
                </Button>
              ) : (
                <Tooltip title="Login">
                  <Button onClick={() => setAuthModal(true)}>
                    <AvatarLogin />
                  </Button>
                </Tooltip>
              )}
            </C.Avatar>
          </li>
          <hr className="divider" />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <C.Dropdown>
              <Link
                to="/favorites"
                onClick={() => {
                  handleClose();
                }}
              >
                <p>
                  Favorites
                  <HeartIcon />
                </p>
              </Link>
              <Link
                to="/profile"
                onClick={() => {
                  handleClose();
                }}
              >
                <p>
                  Profile
                  <GearIcon />
                </p>
              </Link>
              <p
                onClick={() => {
                  logout();
                  handleClose();
                }}
              >
                Logout <Logout />
              </p>
            </C.Dropdown>
          </Popover>
        </>
      )}
      <li>
        <C.Link href="https://www.linkedin.com/in/darko-radovic-dr/">
          <LinkedinLogo />
        </C.Link>
      </li>
      <li>
        <C.Link href="https://github.com/darkoradovic">
          <GithubLogo />
        </C.Link>
      </li>
      {/*  <li>
        <C.Link href="https://t.me/carlosdancr">
          <TelegramLogo />
        </C.Link>
      </li> */}
    </C.Container>
  );
};
