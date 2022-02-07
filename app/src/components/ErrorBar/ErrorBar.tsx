import React from "react";
import { observer } from "mobx-react";
import useStores from "../../hooks/useStores";

// TODO: Allow dismissing
export const ErrorBar: React.FC<{}> = observer(() => {
  const { ui } = useStores();

  if(!ui?.errorMessage) {
      return null;
  }

  return <div>{ui?.errorMessage}</div>;
});
