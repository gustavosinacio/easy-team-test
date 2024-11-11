import { Employee } from "@/types/employees.types";
import API from "./api";

export async function getEmployees(): Promise<Employee[]> {
  const response = await API.get("employees");
  return response.data;
}
