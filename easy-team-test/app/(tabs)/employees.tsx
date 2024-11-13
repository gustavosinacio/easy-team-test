import SafeView from "@/components/SafeView";
import { EmployeeNavigationData } from "@/types/employees.types";
import { EmployeeListRef, EmployeesTimesheet } from "@easyteam/ui";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";

export default function EmployeesScreen() {
  const ref = useRef<EmployeeListRef>();

  const handleNavigateEmployeeTimesheet = useCallback(
    ({ employeeId }: EmployeeNavigationData) => {
      router.navigate(`/employee/${employeeId}`);
    },
    []
  );

  useFocusEffect(
    useCallback(() => {
      ref.current?.reloadData();
    }, [])
  );

  return (
    <SafeView>
      <EmployeesTimesheet
        ref={ref as any} // Types don't match
        onEmployeeReportPress={handleNavigateEmployeeTimesheet}
      />
    </SafeView>
  );
}
