import { useCallback, useContext } from "react";
import { Clock } from "@easyteam/ui";

import { EventClockInOut } from "@/types/employees.types";
import { postClockInOut } from "@/services/employee.service";
import { AppContext } from "@/contexts/App/AppContext";
import SafeView from "@/components/SafeView";

export default function HomeScreen() {
  const { employeeId } = useContext(AppContext);

  const handleClockInOut = useCallback(
    async (event: EventClockInOut) => {
      await postClockInOut(employeeId, event);
    },
    [employeeId]
  );

  return (
    <SafeView>
      <Clock onEvent={handleClockInOut as any} />
    </SafeView>
  );
}
