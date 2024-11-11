import { Employee } from "./employees.types";

export type TimeTracking = {
  id: string;
  clockIn: Date;
  clockOut: Date;
  employee: Employee;
};
