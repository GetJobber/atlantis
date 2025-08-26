import React from "react";
import { Button } from "@jobber/components/Button";
import { useLiveAnnounce } from "@jobber/hooks/useLiveAnnounce";

export function UseLiveAnnounce() {
  const { liveAnnounce } = useLiveAnnounce();

  return (
    <>
      <Button
        label="Delete"
        onClick={() => liveAnnounce("You have clicked the Delete button")}
      />{" "}
      <Button
        label="Add"
        onClick={() => liveAnnounce("You have clicked the Add button")}
      />
    </>
  );
}
