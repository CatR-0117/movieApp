import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export type CarouselCardProps = {
  genre?: string;
  rating?: string;
  title?: string;
};

const CarouselCard = ({
  genre = "",
  rating = "",
  title = "",
}: CarouselCardProps) => {
  return (
    <Carousel className="w-screen h-[600px]">
      <CarouselContent>
        {Array.from({ length: 3 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="">
              <div></div>
              <div></div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CarouselCard;
