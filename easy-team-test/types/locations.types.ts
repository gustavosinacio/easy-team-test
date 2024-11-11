import { Employee } from "./employees.types";

export type Location = {
  id: string;
  name: string;
  address: string;
  employees: Employee[];
};
