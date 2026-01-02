import { useEffect, useState } from "react";
import { Button } from "@jobber/components/Button";
import { useIsMounted } from "@jobber/hooks/useIsMounted";

export function UseIsMounted() {
  function AlertMountedComponent() {
    const isMounted = useIsMounted();
    useEffect(() => {
      setTimeout(() => {
        if (isMounted.current) {
          // only set state if the component is still mounted
          console.log("The component is mounted");
        } else {
          console.log("The component is not mounted");
        }
      }, 10000);
    }, []);

    return <h4>I am the AlertMountedComponent</h4>;
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
