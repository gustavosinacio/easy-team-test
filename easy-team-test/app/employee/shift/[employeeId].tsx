import SafeView from "@/components/SafeView";
import { ShiftForm } from "@easyteam/ui";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";

export default function ShiftEmployee() {
  const { employeeId } = useLocalSearchParams();
  const employeeIdString = Array.isArray(employeeId)
    ? employeeId[0]
    : employeeId;

  const handleCancel = useCallback(() => {
    router.back();
  }, []);

  const handleSave = useCallback(() => {
    router.back();
  }, []);

  return (
    <SafeView>
      <ShiftForm
        employeeId={employeeIdString}
        onCancelPress={handleCancel}
        onSaveSuccess={handleSave}
        onEvent={(event) => console.log(JSON.stringify(event))}
      />
    </SafeView>
  );
}
