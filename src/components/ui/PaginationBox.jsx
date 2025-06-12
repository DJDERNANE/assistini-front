import React from "react";

const PaginationBox = ({ current = 1, total, maxShow = 3 }) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div>
      <img src="" alt="" />
      <ul className="space-x-2 flex items-center">
        {pages.slice(0, maxShow).map((page) => (
          <li
            key={page}
            className={`${
              current === page ? "bg-blue-500 text-white" : "bg-white"
            } rounded-lg font-medium flex items-center justify-center w-10 h-10`}
          >
            {page}
          </li>
        ))}
      </ul>
      <img src="" alt="" />
    </div>
  );
};

export default PaginationBox;
