import { useEffect, useState, useRef } from "react";
import { Card } from "./Component/Card";
import Viewer from "./Component/Viewer";
import { RotatingLines } from "react-loader-spinner";

const MainPage = ({ data, loading, setLoading }) => {
  const [dataPdf, setdataPdf] = useState(data);
  const [filter, setFilter] = useState("");
  const [currentIndex, setCurrentIndex] = useState(null);
  const [totalPages, setTotalPages] = useState([]);
  const viewerRef = useRef(null); // Add this ref
  console.log("hello");
  const handleLoadTotalPages = (index, pages) => {
    setTotalPages((prev) => {
      const updated = [...prev];
      updated[index] = pages;
      return updated;
    });
  };

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
    const filteredData = dataPdf?.filter(
      (item) => item.title.toLowerCase().includes(filter.toLowerCase()) // Assuming `name` is a property of the `item`
    );
    setdataPdf(filteredData);
  };
  return (
    <>
      <div className="pt-3 border-4 h-screen overflow-auto">
        <div className="text-center sm:text-left">
          <p className="text-blue-800 text-lg px-4 sm:px-16">
            Search study resources
          </p>
          <p className="px-4 sm:px-16 text-sm sm:text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla!
          </p>
        </div>
        <div className="pt-3 bg-gray-100">
          <input
            type="text"
            name="pdfname"
            className="block w-full sm:w-auto sm:mx-0  sm:ml-44 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-sm sm:text-md leading-5 sm:leading-6"
            placeholder="Search for resources"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          {loading ? (
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 pt-4 pb-2">
              {dataPdf?.map((item, index) => (
                <div key={index}>
                  <Card
                    setCurrentIndex={scrollToViewer} // Update this line
                    index={index}
                    // totalPages={totalPages[index]}
                    item={item}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-screen">
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
