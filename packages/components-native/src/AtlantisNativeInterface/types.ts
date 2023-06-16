import { NativeModule } from "react-native";

export interface AtlantisInterfaceType extends NativeModule {
  openActionSheet: (params: {
    options: { title: string; value: number }[];
    title: string;
  }) => Promise<number>;
}
