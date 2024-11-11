import { useEffect, useState } from "react";

import { Employee } from "@/types/employees.types";
import { getEmployees } from "@/services/employees.service";

export function useHydrateApp() {
  const [employees, setEmployees] = useState<Employee[]>();
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(true);

  useEffect(() => {
    async function fetchEmployees() {
      const employees = await getEmployees();
      setEmployees(employees);
      setIsLoadingEmployees(false);
    }

    fetchEmployees();
  }, []);

  return { employees, isLoadingEmployees };
}
