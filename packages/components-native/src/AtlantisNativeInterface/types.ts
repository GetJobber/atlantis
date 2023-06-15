import { NativeModule } from "react-native";

export interface AtlantisInterfaceType extends NativeModule {
  openActionSheet: (dialogJsonData: string) => Promise<number>;
}
