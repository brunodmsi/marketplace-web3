import { Product } from '@prisma/client';

export type ProductCreate = Pick<
	Product,
	'name' | 'value' | 'store_id' | 'description'
>;

export type ProductUpdate = Partial<ProductCreate>;
