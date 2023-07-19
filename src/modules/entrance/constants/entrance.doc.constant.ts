import { faker } from '@faker-js/faker';

export const EntranceDocParamsId = [
    {
        name: 'id',
        allowEmptyValue: false,
        required: true,
        type: 'string',
        example: faker.string.uuid(),
    },
];
