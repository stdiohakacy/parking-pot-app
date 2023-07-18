import { UseDTO } from '../../../common/base/decorators/use-dto.decorator';
import {
    BaseEntity,
    IBaseEntity,
} from '../../../common/base/entity/base.entity';
import { Column, Entity } from 'typeorm';
import { PaymentDTO } from '../dtos/payment.dto';
import {
    ENUM_PAYMENT_STATUS,
    ENUM_PAYMENT_TYPE,
} from '../constants/payment.enum.constant';

export interface IPaymentEntity extends IBaseEntity<PaymentDTO> {
    amount: number;
    status: ENUM_PAYMENT_STATUS;
}
@Entity({ name: 'payments' })
@UseDTO(PaymentDTO)
export class PaymentEntity
    extends BaseEntity<PaymentDTO>
    implements IPaymentEntity
{
    @Column({
        name: 'status',
        enum: ENUM_PAYMENT_STATUS,
        default: ENUM_PAYMENT_STATUS.PENDING,
    })
    status: ENUM_PAYMENT_STATUS;

    @Column({ name: 'amount', default: 0 })
    amount: number;

    @Column({ name: 'type', default: ENUM_PAYMENT_TYPE.CASH })
    type: ENUM_PAYMENT_TYPE;
}
