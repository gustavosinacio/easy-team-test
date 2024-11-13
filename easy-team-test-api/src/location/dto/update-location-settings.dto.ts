export class UpdateLocationSettingsDto {
  isGlobalTrackingEnabled: boolean;
  employees: {
    id: string;
    timeTrackingEnabled: boolean;
  }[];
}
