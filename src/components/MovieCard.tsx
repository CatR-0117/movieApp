import { Star } from "lucide-react";
import Image from "next/image";

const MovieCard = ({ imgUrl, rating, title}) => {
  return (
    <div className=" rounded-[8px] bg-[#F4F4F5] w-[230px] h-[440px]">
      <Image
        src="/Movie1.jpg"
        alt="Photo"
        width={230}
        height={340}
        className="bg-cover"
      ></Image>
      <div className="p-2 flex flex-col self-stretch">
        <div className="flex h-[23px] items-center gap-1 self-stretch">
          <Star className="size-4 text-yellow-500"></Star>
          <div className="flex items-center">
            <p className="text-[14px] font-medium leading-5">{rating}</p>
            <p className="text-[12px] font-[400] leading-4 text-[#71717A]">
              /10
            </p>
          </div>
        </div>
        <div className="flex items-center">
            <p className="text-[18px] font-[400] leading-7">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
