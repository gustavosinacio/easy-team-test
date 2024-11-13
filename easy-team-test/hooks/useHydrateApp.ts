import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import { Employee } from "@/types/employees.types";
import { getLocationData } from "@/services/locations.service";
import { getAuthToken } from "@/services/auth.service";
import API from "@/services/api";

/**
 * For the sake of speed in development, no login functionality was created on the app
 * as it was not requested in the test. Here we can change between two users, one being an
 * admin and another being a regular user.
 */
const username = "jamessmith";
// const username = "charlibrown";
const password = "securePassword123";

export function useHydrateApp() {
  const [employees, setEmployees] = useState<Employee[]>();
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<"admin" | "regular">("regular");
  const [locationId, setLocationId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [isGlobalTimeTrackingEnabled, setIsGlobalTimeTrackingEnabled] =
    useState(false);

  useEffect(() => {
    async function hydrate() {
      const jwt = await getAuthToken(username, password);
      API.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      setToken(jwt);
      if (jwt) {
        const { locationId, employeeId, accessRole } = jwtDecode<any>(jwt);
        setRole(accessRole.name);

        const { employees, isGlobalTrackingEnabled } =
          await getLocationData(locationId);
        setEmployees(employees);
        setIsGlobalTimeTrackingEnabled(isGlobalTrackingEnabled);
        setLocationId(locationId);
        setEmployeeId(employeeId);
      }
    }

    hydrate();
  }, []);

  return {
    token,
    role,
    locationId,
    employeeId,
    employees,
    isGlobalTimeTrackingEnabled,
  };
}
