import Image from 'next/image'

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import Link from 'next/link';
interface ProductCardProps {
  src: string;
  alt: string;
  name: string;
  default_code: string;
}
export function ProductCard({ src, alt, name, default_code }: ProductCardProps) {
  return (
    <>
      <Card className="w-[200px] pt-0 pb-3 overflow-hidden gap-2">
        <CardContent className='p-0 border-b'>
          <Link href={`/shop/product/${default_code}`}>
            <Image
              src={src}
              alt={alt}
              width={200}
              height={200}
              className='aspect-1/1' />
          </Link>
        </CardContent>
        <CardFooter className='flex flex-wrap px-3'>
          <h4 className='text-sm text-balance font-medium'>{name}</h4>
          <p>Ref: {default_code}</p>
        </CardFooter>
      </Card>
    </>
  )
}
