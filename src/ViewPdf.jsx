import React from "react";
import Viewer from "./Component/Viewer";
import { useLocation } from "react-router-dom";
const ViewPdf = () => {
  const location = useLocation();
  const state = location.state;
  const { item } = state;
  return (
    <div className=" relative h-screen w-full">
      <Viewer
        pdf={item?.pdfLink}
        documentKey={item?._id}
        pdfName={item?.title}
      />
    </div>
  );
};

export default ViewPdf;
