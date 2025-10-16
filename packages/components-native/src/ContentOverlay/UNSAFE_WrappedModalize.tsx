import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Modalize } from "react-native-modalize";
import type { IHandles } from "react-native-modalize/lib/options";

type Props = React.ComponentProps<typeof Modalize>;

export const UNSAFE_WrappedModalize = forwardRef<IHandles, Props>(
  (props, ref) => {
    const innerRef = useRef<IHandles | null>(null);
    const [openRenderId, setOpenRenderId] = useState(0);

    useImperativeHandle(
      ref,
      () => ({
        open(dest) {
          setOpenRenderId(id => id + 1);
          // Open on a fresh tick for additional safety
          requestAnimationFrame(() => {
            innerRef.current?.open(dest);
          });
        },
        close(dest) {
          innerRef.current?.close(dest);
        },
      }),
      [],
    );

    // Use a unique key to force a remount, ensuring we get fresh gesture handler nodes within modalize
    return (
      <Modalize key={`modalize-${openRenderId}`} ref={innerRef} {...props} />
    );
  },
);

UNSAFE_WrappedModalize.displayName = "UNSAFE_WrappedModalize";
