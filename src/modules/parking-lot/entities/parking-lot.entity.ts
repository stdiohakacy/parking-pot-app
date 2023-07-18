import { UseDTO } from '../../../common/base/decorators/use-dto.decorator';
import {
    BaseEntity,
    IBaseEntity,
} from '../../../common/base/entity/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ParkingLotDTO } from '../dtos/parking-lot.dto';
import { ParkingSpotEntity } from '../../../modules/parking-spot/entities/parking-spot.entity';
import { ParkingRateEntity } from '../../../modules/parking-rate/entities/parking-rate.entity';
import { UserEntity } from '../../../modules/user/entities/user.entity';
import { EntranceEntity } from '../../../modules/entrance/entities/entrance.entity';
import { ParkingTicketEntity } from '../../../modules/parking-ticket/entities/parking-ticket.entity';
import { ExitEntity } from '../../../modules/exit/entities/exit.entity';

export interface IParkingLotEntity extends IBaseEntity<ParkingLotDTO> {}
@Entity({ name: 'parking_lots' })
@UseDTO(ParkingLotDTO)
export class ParkingLotEntity
    extends BaseEntity<ParkingLotDTO>
    implements IParkingLotEntity
{
    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'address' })
    address: string;

    @OneToMany(
        () => ParkingSpotEntity,
        (parkingSpots) => parkingSpots.parkingLot
    )
    parkingSpots: ParkingSpotEntity[];

    @OneToMany(
        () => ParkingRateEntity,
        (parkingRates) => parkingRates.parkingLot
    )
    parkingRates: ParkingRateEntity[];

    @OneToMany(() => UserEntity, (users) => users.parkingLot)
    users: UserEntity[];

    @OneToMany(() => EntranceEntity, (entrances) => entrances.parkingLot)
    entrances: EntranceEntity[];

    @OneToMany(
        () => ParkingTicketEntity,
        (parkingTickets) => parkingTickets.parkingLot
    )
    parkingTickets: ParkingTicketEntity[];

    @OneToMany(() => ExitEntity, (exits) => exits.parkingLot)
    exits: ExitEntity[];
}
