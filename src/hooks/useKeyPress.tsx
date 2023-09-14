import { useState, useEffect } from "react";

export const useKeyDownHook = (callback: () => void) => {
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);
};

export const useKeyDownHookAuth = (callback: () => void) => {
  const onKeyDownAuth = (event: KeyboardEvent) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", onKeyDownAuth);
    return () => {
      document.removeEventListener("keydown", onKeyDownAuth);
    };
  }, [onKeyDownAuth]);
};
