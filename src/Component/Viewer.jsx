import React, { useEffect, useState, useRef } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { SlMagnifierAdd, SlMagnifierRemove } from "react-icons/sl";
import { RxDropdownMenu } from "react-icons/rx";
import { MdDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RotatingLines } from "react-loader-spinner";

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2.0;

const Viewer = ({ pdf, documentKey, pdfName }) => {
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [scale, setScale] = useState(1.0);
  const [bookmarks, setBookmarks] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const pageRefs = useRef([]);
  const [openBookMark, setOpenBookMark] = useState(false);
  const notify = (message) => toast(message);
  // console.log(bookmarks, "bookmarks", documentKey);
  console.log(loading, "loadingggg");

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, [pdf]);

  useEffect(() => {
    const storageKey = `bookmarks_${documentKey}`;
    const savedBookmarks = localStorage.getItem(storageKey);
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
      // console.log("hhhhhhkjkjk");
    }
  }, [documentKey]);

  // useEffect(() => {
  //   if (bookmarks.length > 0) {
  //     localStorage.setItem(
  //       `bookmarks_${documentKey}`,
  //       JSON.stringify(bookmarks)
  //     );
  //   } else {
  //     localStorage.removeItem(`bookmarks_${documentKey}`);
  //   }
  // }, [bookmarks, documentKey]);

  const onDocLoad = (event) => {
    const pages = event.numPages;
    console.log("Document loaded with pages:", pages);
    setTotalPages(pages);
    setPageNumber(1);
    setLoading(false);

    // Ensure pageRefs is initialized
    // pageRefs.current = Array(pages).fill(null);
  };

  const handleOpenBookmark = () => {
    setOpenBookMark((prev) => !prev);
  };

  const onDocLoadError = (error) => {
    console.error("Failed to load the document:", error);
  };

  const changePage = (param) => {
    if (param === "prev") {
      if (pageNumber > 1) {
        setPageNumber((prevPageNumber) => {
          const newPageNumber = Math.max(prevPageNumber - 1, 1);
          scrollToPage(newPageNumber);
          return newPageNumber;
        });
      }
    } else if (param === "next") {
      if (pageNumber < totalPages) {
        setPageNumber((prevPageNumber) => {
          const newPageNumber = Math.min(prevPageNumber + 1, totalPages);
          scrollToPage(newPageNumber);
          return newPageNumber;
        });
      }
    }
  };

  const scrollToPage = (pageNumberToScroll) => {
    const pageElement = document.getElementById(`page_${pageNumberToScroll}`);
    if (pageElement) {
      pageElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBookmarkClick = (page) => {
    setPageNumber(page);
    scrollToPage(page);
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, MAX_ZOOM));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, MIN_ZOOM));
  };

  const addBookmark = (pageNumber) => {
    if (!bookmarks.includes(pageNumber)) {
      localStorage.setItem(
        `bookmarks_${documentKey}`,
        JSON.stringify([...bookmarks, pageNumber])
      );
      setBookmarks([...bookmarks, pageNumber]);

      notify("Successfully added");
    } else {
      notify("Already added");
    }
  };

  const removeBookmark = (page) => {
    const updatedBookmarks = bookmarks.filter((bookmark) => bookmark !== page);
    setBookmarks(updatedBookmarks);
    localStorage.setItem(
      `bookmarks_${documentKey}`,
      JSON.stringify(updatedBookmarks)
    );
    notify("Successfully removed");
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pageInView = parseInt(
              entry.target.getAttribute("data-page-number"),
              10
            );
            // setPageNumber(1);
            // console.log(pageInView, "pageinview");
            setPageNumber(pageInView);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    pageRefs.current.forEach((page) => {
      if (page) observer.observe(page);
    });

    return () => {
      if (observer) {
        pageRefs.current.forEach((page) => {
          if (page) observer.unobserve(page);
        });
      }
    };
  }, [totalPages, pageNumber]);

  return (
    <>
      <div className="relative w-full h-full flex justify-start items-start overflow-hidden">
        {/* Main Viewer */}
        <div className="border-r-2 border-gray-400 px-3 w-72  h-full hidden lg:block">
          <div className="px-2 py-3 border-b-2 text-center font-semibold text-lg">
            {pdfName}
          </div>
          <div className="h-full overflow-auto">
            <Document
              className="flex flex-col justify-start items-center overflow-auto h-screen"
              file={pdf}
              onLoadSuccess={onDocLoad}
              onLoadError={onDocLoadError}
            >
              {Array(totalPages)
                .fill()
                .map((_, index) => (
                  <div
                    key={index}
                    onClick={() => handleBookmarkClick(index + 1)}
                    className={`border-[4px] cursor-pointer relative rounded my-2 ${
                      pageNumber === index + 1 ? "border-gray-300" : ""
                    }`}
                  >
                    <Page
                      height={180}
                      pageNumber={index + 1}
                      scale={0.5}
                    ></Page>
                    <p className="text-center">{index + 1}</p>
                  </div>
                ))}
            </Document>
          </div>
        </div>
        <div className="w-full h-full overflow-auto">
          <div className="w-full h-full bg-slate-100 relative">
            {/* PDF Viewer with all pages scrollable */}

            <div className="w-full relative bg-slate-200 overflow-auto flex flex-col items-center">
              {/* Sidebar */}

              <div className="flex-grow border-10">
                <Document
                  file={pdf}
                  onLoadSuccess={onDocLoad}
                  onLoadError={onDocLoadError}
                >
                  {Array(totalPages)
                    .fill()
                    .map((_, index) => (
                      <div
                        id={`page_${index + 1}`}
                        key={index}
                        data-page-number={index + 1}
                        className="mb-4 w-full sm:w-auto bg-white p-2 rounded-xl "
                        ref={(el) => (pageRefs.current[index] = el)}
                      >
                        <Page
                          pageNumber={index + 1}
                          scale={scale}
                          width={
                            window.innerWidth < 640
                              ? window.innerWidth - 20
                              : undefined
                          }
                        />
                      </div>
                    ))}
                </Document>
              </div>
            </div>

            {!loading && (
              <div className="w-full lg:w-[400px] fixed top-1  right-0 rounded-sm bg-gray-50 z-20  sm:w-full sm:max-w-xs">
                <div className="flex flex-row justify-between items-center p-3 sm:p-3">
                  <p className="text-md text-gray-800 sm:text-base">
                    Bookmarks page:
                  </p>
                  <RxDropdownMenu
                    onClick={handleOpenBookmark}
                    className="text-gray-800 sm:text-lg cursor-pointer"
                  />
                </div>

                {openBookMark &&
                  (bookmarks.length > 0 ? (
                    <ul className="mt-2 bg-gray-50">
                      {bookmarks.map((page, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center my-1"
                        >
                          <div className="w-full text-sm sm:text-base">
                            <span>Page: </span>
                            <span>{page}</span>
                          </div>
                          <button
                            onClick={() => handleBookmarkClick(page)}
                            className="bg-blue-500 w-16 sm:w-full hover:bg-blue-700 text-white py-1 px-2 rounded-md text-xs sm:text-sm"
                          >
                            Go to
                          </button>
                          <MdDeleteOutline
                            onClick={() => removeBookmark(page)}
                            className="text-base cursor-pointer size-12 ml-2"
                          />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center text-blue-800">Page not added</p>
                  ))}
              </div>
            )}

            {/* Bottom navigation and zoom controls */}
            {!loading && (
              <div
                id="customWidth"
                className="sticky bottom-0 left-[33%] bg-blue-800 py-2 px-4 lg:w-[450px] rounded-3xl  z-50"
              >
                <div className="flex items-center max-w-3xl justify-between">
                  <div className="flex justify-center items-center">
                    <div className="flex items-center p-1 gap-1">
                      <IoIosArrowUp
                        onClick={() => changePage("prev")}
                        className="cursor-pointer bg-white rounded-full size-6 "
                      />
                      <div className="flex bg-white rounded-3xl p-0 items-center text-blue-800 font-bold">
                        <div className="px-2 py-1 rounded">{pageNumber}</div>
                        <span className="px-0">/</span>
                        <div className="px-2 py-1 rounded">{totalPages}</div>
                      </div>
                      <IoIosArrowDown
                        className="cursor-pointer bg-white rounded-full size-6"
                        onClick={() => changePage("next")}
                      />
                    </div>
                  </div>

                  {/* Zoom Controls */}
                  <div className="flex justify-center items-center gap-4">
                    <div className="flex items-center gap-2 p-2">
                      <SlMagnifierRemove
                        onClick={zoomOut}
                        className="text-white sm:text-xl  text-2xl cursor-pointer"
                        disabled={scale <= MIN_ZOOM}
                      />
                      <span className=" text-cyan-50">{scale.toFixed(1)}</span>
                      <SlMagnifierAdd
                        onClick={zoomIn}
                        className="text-white sm:text-xl text-2xl cursor-pointer"
                        disabled={scale >= MAX_ZOOM}
                      />
                    </div>
                  </div>

                  {/* Bookmark and Download Button */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => addBookmark(pageNumber)}
                      className="bg-black text-white px-2 lg:px-4 py-1 rounded text-sm lg:text-base"
                    >
                      Add Bookmark
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bookmarks */}
        </div>
        <ToastContainer draggableDirection="y" />
      </div>
    </>
  );
};

export default Viewer;
