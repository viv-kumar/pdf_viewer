import { useEffect, useState, useRef } from "react";
import { Card } from "./Component/Card";
import Viewer from "./Component/Viewer";
import { CiSearch } from "react-icons/ci";
import { RotatingLines } from "react-loader-spinner";

const MainPage = ({ data, loading, setLoading }) => {
  const [dataPdf, setdataPdf] = useState(data);
  const [filter, setFilter] = useState("");
  const [currentIndex, setCurrentIndex] = useState(null);
  const [totalPages, setTotalPages] = useState([]);
  const viewerRef = useRef(null); // Add this ref

  const scrollToViewer = (index) => {
    setCurrentIndex(index);
  };
  useEffect(() => {
    setdataPdf(data);
    setLoading(true);
  }, [data]);
  useEffect(() => {
    if (filter != "") {
      filterData();
    } else {
      setdataPdf(data);
    }
  }, [filter]);
  const filterData = () => {
    const filteredData = dataPdf?.filter((item) =>
      item.title.toLowerCase().includes(filter.toLowerCase())
    );
    setdataPdf(filteredData);
  };
  return (
    <>
      <div className="pt-3 border-4 h-screen overflow-auto">
        <div className="text-center sm:text-left">
          <p className="text-blue-800 text-2xl px-4 sm:px-16 font-bold">
            Search study resources
          </p>
          <p className="px-4 sm:px-16 text-sm sm:text-base pb-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla!
          </p>
        </div>
        <div className="pt-3 bg-gray-100">
          <div className="lg:w-full flex items-center">
            <input
              type="text"
              name="pdfname"
              className="block lg:w-[600px] w-full sm:mx-0 lg:ml-40 sm:ml-44 rounded-md border-0 py-1.5 pl-7 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-sm sm:text-md leading-5 sm:leading-6"
              placeholder="Search for resources..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <div className=" p-[6px] bg-white h-full rounded-sm rounded-l-none rounded-r-sm border  border-s-0  border-gray-300">
              <CiSearch size={22} />
            </div>
          </div>

          {loading ? (
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 pt-4 pb-2">
              {dataPdf?.map((item, index) => (
                <Card
                  setCurrentIndex={scrollToViewer}
                  index={index}
                  item={item}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-full">
              <RotatingLines
                type="TailSpin"
                color="#00BFFF"
                height={80}
                width={80}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MainPage;
