import SafeView from "@/components/SafeView";
import { Timesheet } from "@easyteam/ui";

export default function HomeScreen() {
  return (
    <SafeView>
      <Timesheet onEvent={console.log} />
    </SafeView>
  );
}
