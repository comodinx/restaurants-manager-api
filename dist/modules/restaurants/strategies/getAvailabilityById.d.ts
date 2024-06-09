import { RestaurantAvailabilityDto } from "@app/dtos";
export declare class GetAvailabilityByIdStrategy {
    get(id: number, options: RestaurantAvailabilityDto): Promise<any>;
    private validate;
    private validateDate;
    private populate;
    private populateRestaurant;
    private resolve;
    private findReservations;
    private generateTimelines;
    private generateTimelineEntries;
}
