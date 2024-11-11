import { Timesheet } from "@easyteam/ui";

export default function HomeScreen() {
  return <Timesheet onEvent={console.log} />;
}
