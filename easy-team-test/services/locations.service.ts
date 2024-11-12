import { Employee } from "@/types/employees.types";
import API from "./api";

export async function getLocationEmployees(id: string): Promise<Employee[]> {
  const response = await API.get(`locations/${id}`);
  return response.data.employees;
}
