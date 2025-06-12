import React from "react";

const CardRdv = ({ item, selected, setSelected }) => {
  return (
    <div
      onClick={() => setSelected(item.number)}
      className={`px-4 py-4 flex items-center space-x-3 rounded-lg border border-primary-100 cursor-pointer ${
        selected && "bg-primary-100"
      }`}
    >
      <div
        className={`min-w-[40px] min-h-[40px] rounded-full flex items-center justify-center ${
          selected ? "bg-white bg-opacity-70" : "bg-primary-100 bg-opacity-20"
        } `}
      >
        <p className="text-primary-100 text-xl font-semibold">
          {item.number + 1}
        </p>
      </div>
      <div>
        <h4
          className={`w-[100px] mb-1 truncate text-sm font-medium first-letter:capitalize ${
            selected && "text-white"
          }`}
        >
          {item.name}
        </h4>
        <p
          className={`first-letter:capitalize text-xs font-light ${
            selected ? "text-white" : "text-primary-100"
          }`}
        >
          motif: {item.motif}
        </p>
      </div>
    </div>
  );
};

export default CardRdv;
