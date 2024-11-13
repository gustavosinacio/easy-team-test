import { Employee } from "./employees.types";

export type Location = {
  id: string;
  name: string;
  address: string;
  isGlobalTrackingEnabled: boolean;
  employees: Employee[];
};

export type LocationSettings = {
  employees: Employee[];
  isGlobalTrackingEnabled: boolean;
};
