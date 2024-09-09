import React, { useState, useEffect } from "react";
// import Viewer from "./pdf/Viewer";
// import pdf1 from "./pdf/design.pdf";
// import pdf2 from "./pdf/modelpaper.pdf";
// import pdf3 from "./pdf/zucoltest.pdf";
import { Card } from "./Component/Card";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./MainPage";
import ViewPdf from "./ViewPdf";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const notify = (message) => toast(message);
  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await fetch("https://pfd-uploader.onrender.com/pdfs");

        // Check if response is ok (status code 200-299)
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const Data = await response.json();
        // console.log(Data, "dataaaa");
        setData(Data);
        setLoading(true);
      } catch (error) {
        console.error("Error fetching PDF:", error);
        notify("Error in the api");
        // Handle the error as needed, e.g., show an error message in the UI
        setLoading(false);
      }
    };

    fetchPdf();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainPage data={data} loading={loading} setLoading={setLoading} />
          }
        />
        <Route path="/viewpdf" element={<ViewPdf />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
  // return (
  //   <>
  //     <div className="pt-3 border-4 h-screen overflow-auto">
  //       <div className="text-center sm:text-left">
  //         <p className="text-blue-800 text-lg px-4 sm:px-16">
  //           Search study resources
  //         </p>
  //         <p className="px-4 sm:px-16 text-sm sm:text-base">
  //           Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  //           Voluptatibus quia, nulla!
  //         </p>
  //       </div>
  //       <div className="pt-3 bg-gray-100">
  //         <input
  //           type="text"
  //           name="pdfname"
  //           className="block w-full sm:w-auto sm:mx-0  sm:ml-44 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-sm sm:text-md leading-5 sm:leading-6"
  //           placeholder="Search for resources"
  //         />

  //         <div className="flex flex-wrap justify-center gap-2 sm:gap-4 pt-4 pb-2">
  //           {dataPdf?.map((item, index) => (
  //             <div key={index}>
  //               <Card
  //                 setCurrentIndex={scrollToViewer} // Update this line
  //                 index={index}
  //                 totalPages={totalPages[index]}
  //                 item={item}
  //               />
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </div>

  //     {currentIndex !== null && (
  //       <div ref={viewerRef} className="h-screen w-full">
  //         <Viewer
  //           pdf={dataPdf[currentIndex]?.pdfLink}
  //           onLoadTotalPages={(pages) =>
  //             handleLoadTotalPages(currentIndex, pages)
  //           }
  //           documentKey={dataPdf[currentIndex]?._id}
  //         />
  //       </div>
  //     )}
  //   </>
  // );
}

export default App;
