import SafeView from "@/components/SafeView";
import { Colors } from "@/constants/Colors";
import { Settings } from "@easyteam/ui";

export default function HomeScreen() {
  return (
    <SafeView>
      <Settings
        onSave={({ employees, isGlobalTrackingEnabled }) => {
          console.log(98210, employees);
          console.log(98211, isGlobalTrackingEnabled);
        }}
        onEvent={console.log}
      />
    </SafeView>
  );
}
