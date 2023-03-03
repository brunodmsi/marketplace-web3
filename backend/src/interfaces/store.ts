import { Store } from '@prisma/client';

export type StoreCreate = Pick<Store, 'networks' | 'description' | 'name'>;
export type StoreUpdate = Partial<StoreCreate>;
