import { Injectable } from "@nestjs/common";
import { Reservation } from "@app/entities";
import { CreateReservationDto, FinderDto, GetterByIdDto } from "@app/dtos";
import { CreateReservationStrategy } from "./strategies";

@Injectable()
export class ReservationsService {
  constructor(private readonly createReservationStrategy: CreateReservationStrategy) {}

  //
  // public
  //

  /**
   * Find all or filtered
   *
   * @param options {FinderDto} Query options
   *
   * @return {Promise<Reservation[]>} Result of find reservations
   */
  async find(options: FinderDto): Promise<Reservation[]> {
    return Reservation.findByQueryFilters(Reservation, options);
  }

  /**
   * Get by ID
   *
   * @param id {number} Unique Reservation Identifier
   * @param options {GetterByIdDto} Query options
   *
   * @return {Promise<Reservation | undefined | null>} Result of get reservation by ID
   */
  async getById(id: number, options: GetterByIdDto = {}): Promise<Reservation | undefined | null> {
    return Reservation.getByIdAndQueryFilters(Reservation, id, options);
  }

  /**
   * Create
   *
   * @param data {CreateReservationDto} Creation data
   *
   * @return {Promise<Reservation>} Result of create reservation
   */
  async create(data: CreateReservationDto): Promise<Reservation> {
    return this.createReservationStrategy.create(data);
  }
}
