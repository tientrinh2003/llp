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
    <section className="py-8 bg-background relative overflow-hidden px-4">
      <div className="absolute inset-y-0 left-0 w-1/4 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent hidden sm:block" />
      <div className="absolute inset-y-0 right-0 w-1/4 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent hidden sm:block" />

      <Carousel
        setApi={setApi}
        opts={{ align: "center", loop: true }}
        className="w-full"
      >
        <CarouselContent className="-ml-10 items-center">
          {categories.map((category, index) => {
            const isSelected = current === index;
            return (
              <CarouselItem
                key={index}
                className="basis-4/5 sm:basis-1/2 md:basis-1/3 xl:basis-1/5 pl-15 py-12"
              >
                <div
                  className={cn(
                    "w-full flex flex-col items-center justify-end transition-transform duration-300 ease-in-out",
                    isSelected ? "scale-120 z-20" : "scale-100 z-0"
                  )}
                >
                  <h3
                    className={cn(
                      "mb-2 text-center text-2xl font-bold text-gray-600 transition-opacity duration-300 whitespace-nowrap",
                      isSelected ? "opacity-100" : "opacity-40"
                    )}
                  >
                    {category.title}
                  </h3>
                  
                  <div
                    className={cn(
                      // THAY ĐỔI: Quay trở lại chiều cao cố định như cũ
                      "relative w-full h-[380px] overflow-hidden shadow-lg transition-colors duration-300 flex items-center justify-center",
                      isSelected ? "bg-primary" : "bg-secondary"
                    )}
                  >
                    <div
                      className={cn(
                        "transition-opacity duration-300 w-4/5 h-4/5 relative",
                        isSelected ? "opacity-100" : "opacity-60"
                      )}
                    >
                      <Image
                        src={placeholder_image}
                        alt={category.title}
                        fill
                        style={{ objectFit: "contain" }}
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-2 md:left-8 z-30 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/60 text-amber-800 hover:bg-white/80" />
        <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-2 md:right-8 z-30 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/60 text-amber-800 hover:bg-white/80" />
      </Carousel>
    </section>
  );
};

export default ProductCarousel;