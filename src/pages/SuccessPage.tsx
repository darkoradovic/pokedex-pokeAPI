import * as C from "./styles";
import SuccessGIF from "../assets/success.gif";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { updateSubsriptionPlan } from "../api/firebase/firebase";

export const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const subscription = JSON.parse(localStorage.getItem("subscription"));
    subscription &&
      updateSubsriptionPlan(subscription.email, subscription.plan);
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, []);
  return (
    <C.Container>
      <div className="success__page">
        <img src={SuccessGIF} alt="success" />
        <h1>Payment successfull!</h1>
        <h4>Thank you for subscribing!</h4>
        <h4>You will be redirected to home page in 5 seconds.</h4>
      </div>
    </C.Container>
  );
};
