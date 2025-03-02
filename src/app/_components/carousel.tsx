import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export function HomeCarousel() {
  return (
    <div className="w-full">
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent className="aspect-16/9 sm:aspect-32/9 xl:aspect-32/12 2xl:aspect-64/12">
          <CarouselItem className="flex relative justify-center items-center">
            <Image
              src={`/Banner.webp`}
              alt={`Imagen `}
              fill
              className="object-cover object-center layout-fill h-full w-full"
            />
          </CarouselItem>
          <CarouselItem className="flex relative justify-center items-center">
            <Image
              src={`/campana.webp`}
              alt={`Imagen `}
              fill
              className="object-cover object-center layout-fill h-full w-full"
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="left-6" size="lg" />
        <CarouselNext className="right-6" size="lg" />
      </Carousel>
    </div>
  );
}
