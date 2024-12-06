import Content from "@atlantis/docs/components/BottomSheet/BottomSheet.stories.mdx";
import MobileProps from "./BottomSheet.props-mobile.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  mobileProps: MobileProps,
  component: {
    mobileElement: `const bottomSheetRef = useRef<BottomSheetRef>(null);

  return (<>
      <BottomSheet
        showCancel={true}
        heading={"What would you like to do?"}
        onClose={function onClose() {
          return alert("Overlay Dismissed");
        }}
        ref={bottomSheetRef}
      >
        <BottomSheetOption
          icon="sendMessage"
          iconColor="greyBlue"
          text="Send message"
          onPress={() => alert("send message")}
        />
        <BottomSheetOption
          icon="phone"
          iconColor="greyBlue"
          text="Call a friend"
          onPress={() => alert("Calling a friend")}
        />
        <BottomSheetOption
          destructive={true}
          icon="trash"
          text="Remove"
          onPress={() => alert("Removed")}
        />
      </BottomSheet>
        <Button
          label="Show BottomSheet"
          onPress={() => {bottomSheetRef.current?.open()
alert('will show bottom sheet in mobile');
}}
        />
    </>)`,
  },
  title: "BottomSheet",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-BottomSheet-web--docs",
    },
  ],
} as const satisfies ContentExport;
