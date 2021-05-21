import React from "react";
import { Fareknapp } from "nav-frontend-knapper";
import { TrackedButtonProps } from "./trackedButtonTypes";
import { useTrackButtonClick } from "../../data/logging/loggingHooks";

export const TrackedFareknapp = (props: TrackedButtonProps) => {
  const trackButtonClick = useTrackButtonClick();
  const { context, children, onClick, ...rest } = props;

  const modifiedOnClick = (event) => {
    trackButtonClick(children, context);
    onClick && onClick(event);
  };

  return (
    <Fareknapp {...rest} onClick={modifiedOnClick}>
      {children}
    </Fareknapp>
  );
};
