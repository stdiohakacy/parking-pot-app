import { UseDTO } from '../../../common/base/decorators/use-dto.decorator';
import {
    BaseEntity,
    IBaseEntity,
} from '../../../common/base/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { ParkingTicketDTO } from '../dtos/parking-ticket.dto';
import { ParkingLotEntity } from '../../../modules/parking-lot/entities/parking-lot.entity';
import { PaymentEntity } from '../../../modules/payment/entities/payment.entity';

export interface IParkingTicket extends IBaseEntity<ParkingTicketDTO> {}
@Entity({ name: 'parking_tickets' })
@UseDTO(ParkingTicketDTO)
export class ParkingTicketEntity
    extends BaseEntity<ParkingTicketDTO>
    implements IParkingTicket
{
    constructor(data: any) {
        super();
        this.ticketNo = data?.ticketNo;
        this.timestamp = data?.timestamp;
        this.exit = data?.exit;
        this.amount = data?.amount;
        this.parkingLotId = data?.parkingLotId;
    }
    @Column({ name: 'ticketNo' })
    ticketNo: string;

    @Column({ name: 'timestamp', type: 'timestamptz' })
    timestamp: Date;

    @Column({ name: 'exit', type: 'timestamptz', nullable: true })
    exit: Date;

    @Column({ name: 'amount', default: 0 })
    amount: number;

    @Column({ type: 'uuid', name: 'parkingLotId' })
    parkingLotId: string;

    @Column({ type: 'uuid', name: 'paymentId' })
    paymentId: string;

    @ManyToOne(
        () => ParkingLotEntity,
        (parkingLot) => parkingLot.parkingTickets
    )
    @JoinColumn({ name: 'parkingLotId' })
    parkingLot?: ParkingLotEntity;

    @OneToOne(() => PaymentEntity)
    @JoinColumn({ name: 'paymentId' })
    payment: PaymentEntity;
}
