export type User = {
  role: "admin" | "regular";
  token: string | null;
  locationId: string;
};
