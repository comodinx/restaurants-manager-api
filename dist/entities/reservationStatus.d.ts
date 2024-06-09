import { Model } from "@app/database";
export default class ReservationStatus extends Model<ReservationStatus> {
    id: number;
    description: string;
}
