import { Clock } from "@easyteam/ui";

export default function HomeScreen() {
  return <Clock onEvent={console.log} />;
}
