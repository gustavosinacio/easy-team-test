export type AppContextData = {
  role: "admin" | "regular";
  token: string | null;
  locationId: string;
  employeeId: string;
};
