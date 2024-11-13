import { EVENT_TYPE } from '../enums/eventType';

export class CreateTimeTrackingDto {
  employeeId: string;
  timestamp: string;
  type: EVENT_TYPE;
}
