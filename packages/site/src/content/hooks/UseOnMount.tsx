import { useState } from "react";
import { Button } from "@jobber/components/Button";
import { useOnMount } from "@jobber/hooks/useOnMount";

export function UseOnMount() {
  function AlertMountedComponent() {
    const [callbackCallCount, setCallbackCallCount] = useState(0);
    useOnMount(() => {
      setCallbackCallCount(callbackCallCount + 1);
    });

    return (
      <h4>
        I am the AlertMountedComponent and my callback has been called{" "}
        {callbackCallCount} time
      </h4>
    );
  }
  const [shouldMount, setShouldMount] = useState(false);

  const component = shouldMount ? <AlertMountedComponent /> : <></>;

  return (
    <>
      {component}
      <Button
        label={"Mount Component"}
        onClick={() => {
          setShouldMount(true);
        }}
      />
      <Button
        label={"Unmount Component"}
        onClick={() => {
          setShouldMount(false);
        }}
      />
    </>
  );
}
