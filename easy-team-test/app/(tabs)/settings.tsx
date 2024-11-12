import { Settings } from "@easyteam/ui";
import { SafeAreaView, Text } from "react-native";

export default function HomeScreen() {
  return (
    <Settings
      onSave={({ employees, isGlobalTrackingEnabled }) => {
        console.log(98210, employees);
        console.log(98211, isGlobalTrackingEnabled);
      }}
      onEvent={console.log}
    />
  );
}
