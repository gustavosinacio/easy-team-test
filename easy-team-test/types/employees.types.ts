import { Location } from "./locations.types";
import { TimeTracking } from "./time-trackings.types";

export type Employee = {
  id: string;
  location: Location;
  name: string;
  picture: string;
  timeTrackings: TimeTracking[];
};

export type EventClockInOut = {
  event_type: "onClockIn" | "onClockOut";
  timestamp: string;
};

export type EmployeeNavigationData = {
  employeeId: string;
};
