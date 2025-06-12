import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  // Helper function to generate page numbers
  const renderPageNumbers = () => {
    let pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 2 && i <= currentPage + 2)
      ) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers.map((num, index) => (
      <button
        key={index}
        onClick={() => onPageChange(num)}
        className={`mx-1 py-1 w-[30px] flex items-center justify-center text-sm
                    ${
                      num === currentPage
                        ? "bg-blue-600/30 text-white rounded-lg"
                        : "hover:bg-blue-300 rounded-lg"
                    }
                    `}
      >
        {num}
      </button>
    ));
  };

  return (
    <div className="flex items-center space-x-2 mt-4">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-lg ${
          currentPage === 1
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-blue-300"
        }`}
      >
        &larr;
      </button>

      {/* Page Numbers */}
      {renderPageNumbers()}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-lg ${
          currentPage === totalPages
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-blue-300"
        }`}
      >
        &rarr;
      </button>
    </div>
  );
};

export default Pagination;
