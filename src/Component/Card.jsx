import React from "react";
export const Card = ({ setCurrentIndex, index, totalPages, item }) => {
  console.log(item, "itemmm");
  const handleIndexChange = (paramIndex) => {
    setCurrentIndex(paramIndex);
  };

  return (
    <div className="max-w-sm rounded-xl overflow-hidden mr-2 bg-white">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{item?.title}</div>
        <p className="text-gray-700 text-base">{item?.description}</p>

        <div className=" pt-4 pb-2">
          <p className="text-gray-700 text-base">
            Total Pages: {item?.numberOfPages}
          </p>
        </div>
        <button
          className="bg-blue-500 w-full hover:bg-blue-700 text-white  py-2 px-4 rounded-3xl "
          onClick={() => handleIndexChange(index)}
        >
          View document
        </button>
      </div>
    </div>
  );
};
