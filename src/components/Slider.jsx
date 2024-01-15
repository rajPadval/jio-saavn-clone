import { useRef } from "react";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import AlbumItem from "./AlbumItem";

const Slider = ({ children, data }) => {
  const scrollRef = useRef(null);

  const scrollRight = () => {
    scrollRef.current.scrollLeft += 800;
  };

  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 800;
  };

  return (
    <div className="flex justify-center items-center gap-2 ">
      <MdOutlineKeyboardArrowLeft
        onClick={scrollLeft}
        className="text-3xl text-gray-600 hover:scale-125 transition-all duration-500 ease-in-out cursor-pointer hidden lg:block"
      />
      <div
        className=" grid grid-rows-2 grid-flow-col-dense justify-between items-center gap-4 overflow-x-scroll w-full lg:w-[78vw] scroll-hide px-5 "
        ref={scrollRef}
      >
        {data?.map((album) => {
          return <AlbumItem key={album.id} {...album} />;
        })}
      </div>
      <MdOutlineKeyboardArrowRight
        onClick={scrollRight}
        className="text-3xl text-gray-600 hover:scale-125 transition-all duration-500 ease-in-out cursor-pointer hidden lg:block"
      />
    </div>
  );
};

export default Slider;
