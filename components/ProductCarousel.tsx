// app/components/ProductCarousel.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { type CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const placeholder_image = "/products/may-bom-pentax.png";

const categories = [
  { title: "Nhà thông minh" },
  { title: "Hạ tầng mạng" },
  { title: "Viễn thông" },
  { title: "Chữa cháy" },
  { title: "Mạng máy tính" },
  { title: "Thiết bị văn phòng" },
  { title: "An ninh" },
];

const ProductCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("select", onSelect);
    api.on("reInit", onSelect);
  }, [api, onSelect]);

  return (
    <section className="bg-gray-50">
      <div className="container mx-auto sm:px-8 md:px-12 lg:px-20 xl:px-28 py-10 overflow-visible">
        <Carousel
          setApi={setApi}
          opts={{ align: "center", loop: true }}
          className="w-full"
        >
          <CarouselContent className="flex gap-[8px] overflow-visible">
            {categories.map((category, index) => {
              const isSelected = current === index;
              return (
                <CarouselItem
                  key={index}
                  className="flex-none w-[130px] sm:w-[160px] md:w-[180px] lg:w-[200px] xl:w-[220px] snap-center"
                >
                  <div
                    className={cn(
                      "origin-bottom flex flex-col items-center justify-end py-10 gap-5 transition-all duration-500 ease-out",
                      isSelected ? "scale-110 z-10" : "scale-90 opacity-50"
                    )}
                  >
                    <h3
                      className={cn(
                        "text-center text-[20px] md:text-[22px] lg:text-[24px] font-barlow font-semibold text-gray-500 transition-opacity duration-500 whitespace-nowrap",
                        isSelected ? "opacity-100" : "opacity-90"
                      )}
                    >
                      {category.title}
                    </h3>
                    <div
                      className="relative w-full aspect-[9/16] bg-primary overflow-hidden font-semibold font-barlow "
                    >
                      <Image
                        src={placeholder_image}
                        alt={category.title}
                        fill
                        style={{ objectFit: "contain" }}
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                      />
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 -left-6 sm:-left-8 md:-left-10 lg:-left-14 xl:-left-20 z-20 h-12 w-12 rounded-full bg-white/80 text-primary shadow-md hover:bg-white" />
          <CarouselNext className="absolute top-1/2 -translate-y-1/2 -right-6 sm:-right-8 md:-right-10 lg:-right-14 xl:-right-20 z-20 h-12 w-12 rounded-full bg-white/80 text-primary shadow-md hover:bg-white" />
        </Carousel>
      </div>
    </section>
  );
};

export default ProductCarousel;