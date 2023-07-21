import { ParkingTicketEntity } from '../../../modules/parking-ticket/entities/parking-ticket.entity';

export interface IParkingAgentRepository {
    processTicket(ticket: ParkingTicketEntity): Promise<boolean>;
}
