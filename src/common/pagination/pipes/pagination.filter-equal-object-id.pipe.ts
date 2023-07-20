import { Inject, Injectable, mixin, Type } from '@nestjs/common';
import { PipeTransform, Scope } from '@nestjs/common/interfaces';
import { REQUEST } from '@nestjs/core';
import { PaginationService } from '../../../common/pagination/services/pagination.service';
import { IRequestApp } from '../../../common/request/interfaces/request.interface';

export function PaginationFilterEqualObjectIdPipe(
    field: string,
    raw: boolean
): Type<PipeTransform> {
    @Injectable({ scope: Scope.REQUEST })
    class MixinPaginationFilterEqualObjectIdPipe implements PipeTransform {
        constructor(
            @Inject(REQUEST) protected readonly request: IRequestApp,
            private readonly paginationService: PaginationService
        ) {}

        async transform(value: string): Promise<Record<string, string>> {
            if (!value) {
                return undefined;
            }

            const finalValue = value.trim();

            if (raw) {
                return {
                    [field]: value,
                };
            }

            return this.paginationService.filterEqual<string>(
                field,
                finalValue
            );
        }
    }

    return mixin(MixinPaginationFilterEqualObjectIdPipe);
}
