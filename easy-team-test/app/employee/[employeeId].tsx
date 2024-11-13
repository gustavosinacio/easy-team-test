import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import {
  router,
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { AddButton, Timesheet, TimesheetRef } from "@easyteam/ui";

import SafeView from "@/components/SafeView";

export default function Employee() {
  const { employeeId } = useLocalSearchParams();
  const employeeIdString = Array.isArray(employeeId)
    ? employeeId[0]
    : employeeId;
  const ref = useRef<TimesheetRef>(null);
  const navigation = useNavigation();

  const handleNavigateShiftForm = useCallback(() => {
    router.navigate(`/employee/shift/${employeeId}`);
  }, [employeeId]);

  useFocusEffect(
    useCallback(() => {
      ref.current?.reloadData();
    }, [])
  );

  useLayoutEffect(() => {
    if (ref.current?.adminWritePermissions) {
      navigation.setOptions({
        headerRight: () => <AddButton onPress={handleNavigateShiftForm} />,
      });
    }
  }, [navigation]);

  return (
    <SafeView>
      <Timesheet ref={ref} employeeId={employeeIdString} />
    </SafeView>
  );
}
