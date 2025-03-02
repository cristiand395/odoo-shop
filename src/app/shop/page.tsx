import type { Metadata } from 'next'
import { SearchRead } from '@/lib/odoo/odoo-request';
import { ProductCard } from './_components/product-card';
export const metadata: Metadata = {
  title: '',
  description: '',
};

const {
  ODOO_DOMAIN
} = process.env;

export default async function ShopPage() {
  const products: any = await SearchRead({
    model: 'product.product',
    fields: ['name', 'id', 'default_code'],
    filter: '["&", "&", "&", ("sale_ok", "=", True), ("is_published", "=", True), ("type", "=", "product"), ("website_ids", "in", [1])]',
    limit: 60,
    order: 'sequence asc'
  })
  return (
    <div className='flex pt-1.5 px-2.5'>
      <section className='w-1/4'>
        filtros
      </section>
      <section className='grid grid-cols-4 w-full gap-y-5'>
        {
          products && products.map((product: any) => (
            <ProductCard
              key={product.id}
              src={`${ODOO_DOMAIN}/web/image/product.product/${product.id}/image_1200`}
              alt={product.name}
              name={product.name}
              default_code={product.default_code} />
          ))
        }
        {/* {products.map((product: any) => (
          <div key={product.id}>
            <Image
              src={`${ODOO_DOMAIN}/web/image/product.product/${product.id}/image_1200`}
              alt={product.name}
              width={200}
              height={200}
              className='aspect-1 /1' />
      <h3>{product.name}</h3>
      <p>{product.default_code}</p>
    </div>
  ))
} */}
      </section >
    </div >
  );
}