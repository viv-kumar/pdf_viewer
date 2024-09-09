import React from "react";
import { useNavigate } from "react-router-dom";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";
import { LiaTrademarkSolid } from "react-icons/lia";
export const Card = ({ setCurrentIndex, index, totalPages, item }) => {
  const navigate = useNavigate();
  // console.log(item, "itemmm");
  const handleIndexChange = (paramIndex) => {
    // setCurrentIndex(paramIndex);
    navigate("/viewpdf", { state: { item } });
  };

  return (
    <div className="max-w-sm rounded-xl overflow-hidden mr-2 bg-white">
      <div className="px-6 py-4 h-full flex justify-between flex-col">
        <div className="font-bold text-xl mb-2">{item?.title}</div>
        <p className="text-gray-700 text-base">{item?.description}</p>

        <div className="flex flex-row justify-around items-center p-4">
          <div className=" w-16 flex flex-row justify-around items-center rounded-full bg-blue-100 p-2 ">
            {" "}
            <BsFileEarmarkPdf />
            <p>|</p>
            <p className="text-gray-700 text-base">{item?.numberOfPages}</p>
          </div>
          <div className=" w-16 flex flex-row justify-around items-center rounded-full bg-blue-100 p-2 ">
            {" "}
            <LiaTrademarkSolid />
            <p>|</p>
            <p className="text-gray-700 text-base">{item?.numberOfPages}</p>
          </div>
          <div className=" w-16 flex flex-row justify-around items-center rounded-full bg-blue-100 p-2 ">
            {" "}
            <IoEyeOutline />
            <p>|</p>
            <p className="text-gray-700 text-base">
              {item?.numberOfPages * 100}
            </p>
          </div>
        </div>
        <button
          className="bg-blue-800 w-full hover:bg-blue-700 text-white  py-2 px-4 rounded-3xl "
          onClick={() => handleIndexChange(index)}
        >
          View document
        </button>
      </div>
    </div>
  );
};
