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

const categories = [
  {
    title: "Nhà thông minh",
    images: [
      "/products/may-bom-pentax.png",
      "/products/may-bom-xang.png",
      "/products/truc-ngang-dong-co-dien.png",
    ],
  },
  {
    title: "Hạ tầng mạng",
    images: [
      "/products/may-bom-pentax.png",
      "/products/may-bom-xang.png",
      "/products/truc-ngang-dong-co-dien.png",
    ],
  },
  {
    title: "Viễn thông",
    images: [
      "/products/may-bom-pentax.png",
      "/products/may-bom-xang.png",
      "/products/truc-ngang-dong-co-dien.png",
    ],
  },
  {
    title: "Chữa cháy",
    images: [
      "/products/may-bom-pentax.png",
      "/products/may-bom-xang.png",
      "/products/truc-ngang-dong-co-dien.png",
    ],
  },
  {
    title: "Mạng máy tính",
    images: [
      "/products/may-bom-pentax.png",
      "/products/may-bom-xang.png",
      "/products/truc-ngang-dong-co-dien.png",
    ],
  },
  {
    title: "Thiết bị văn phòng",
    images: [
      "/products/may-bom-pentax.png",
      "/products/may-bom-xang.png",
      "/products/truc-ngang-dong-co-dien.png",
    ],
  },
  {
    title: "An ninh",
    images: [
      "/products/may-bom-pentax.png",
      "/products/may-bom-xang.png",
      "/products/truc-ngang-dong-co-dien.png",
    ],
  },
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
              const position = index - current; // -1: left, 0: center, 1: right
              const isSelected = position === 0;

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

                    <div className="relative w-full aspect-[9/16] bg-primary overflow-visible font-semibold font-barlow rounded-lg shadow-lg">
                      {/* Background/Main image */}
                      <div
                        className={cn(
                          "absolute top-[160px] left-[100px] -translate-x-1/2 -translate-y-1/2 w-[140px] h-[120px] z-10 transition-all duration-500 ease-in-out",
                          position < 0 && "-translate-y-[55px] -translate-x-[70px]", // left item
                          position > 0 && "-translate-y-[55px] -translate-x-[70px]" // right item
                        )}
                      >
                        <Image
                          src={
                            category.images?.[0] || "/products/may-bom-pentax.png"
                          }
                          alt={`${category.title} - main`}
                          fill
                          style={{ objectFit: "contain" }}
                          sizes="20vw"
                          priority={isSelected}
                        />
                      </div>

                      {/* Top image */}
                      <div
                        className={cn(
                          "absolute top-[-10px] right-[52px] w-[140px] h-[120px] z-20 opacity-90 transition-all duration-500 ease-in-out",
                          position < 0 &&
                            "-translate-y-[-30px] translate-x-[20px]",
                          position > 0 &&
                            "-translate-y-[-30px] translate-x-[20px]"
                        )}
                      >
                        <Image
                          src={
                            category.images?.[1] || "/products/may-bom-pentax.png"
                          }
                          alt={`${category.title} - top`}
                          fill
                          style={{ objectFit: "contain" }}
                          sizes="15vw"
                        />
                      </div>

                      {/* Bottom image */}
                      <div
                        className={cn(
                          "absolute bottom-[-40px] left-[2px] w-[160px] h-[140px] z-20 opacity-90 transition-all duration-500 ease-in-out",
                          position < 0 && "-translate-y-[30px] translate-x-[10px]",
                          position > 0 && "-translate-y-[30px] translate-x-[10px]"
                        )}
                      >
                        <Image
                          src={
                            category.images?.[2] || "/products/may-bom-pentax.png"
                          }
                          alt={`${category.title} - bottom`}
                          fill
                          style={{ objectFit: "contain" }}
                          sizes="15vw"
                        />
                      </div>
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