import SafeView from "@/components/SafeView";
import { Timesheet } from "@easyteam/ui";

export default function TimeSheetScreen() {
  return (
    <SafeView>
      <Timesheet onEvent={console.log} />
    </SafeView>
  );
}
