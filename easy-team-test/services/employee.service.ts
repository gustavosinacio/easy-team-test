import { EventClockInOut } from "@/types/employees.types";
import API from "./api";

export async function postClockInOut(
  employeeId: string,
  { timestamp, event_type }: EventClockInOut
) {
  API.post(`time-tracking`, { employeeId, type: event_type, timestamp });
}
