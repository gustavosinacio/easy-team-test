import API from "./api";
import { Location, LocationSettings } from "@/types/locations.types";

export async function getLocationData(id: string): Promise<Location> {
  const response = await API.get(`locations/${id}`);
  return response.data;
}

export async function patchLocationSettings(
  locationId: string,
  locationSettings: LocationSettings
) {
  await API.patch(`locations/${locationId}/settings`, locationSettings);
}
