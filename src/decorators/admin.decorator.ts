import { SetMetadata } from '@nestjs/common';

export const IS_SUPERUSER_KEY = 'is_superuser';
export const IsSuperuser = () => SetMetadata(IS_SUPERUSER_KEY, true);
