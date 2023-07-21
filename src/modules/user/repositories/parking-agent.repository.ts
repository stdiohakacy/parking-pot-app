import { ParkingTicketEntity } from '../../../modules/parking-ticket/entities/parking-ticket.entity';
import { IParkingAgentRepository } from '../interfaces/parking-agent.repository.interface';
import { UserRepository } from './user.repository';

export class ParkingAgentRepository
    extends UserRepository
    implements IParkingAgentRepository
{
    processTicket(ticket: ParkingTicketEntity): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}
