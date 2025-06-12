import React, { useState } from "react";

const CardRdv = ({
  item,
  selected,
  setSelected,
  selectedDelete = {},
  handleDelete,
}) => {
  return (
    <div
      onClick={() => setSelected(item)}
      onContextMenu={handleDelete}
      className={`px-4 py-4 flex items-center space-x-3 rounded-lg border ${
        selectedDelete?.id === item.id && "!bg-red-500 !border-red-500"
      } border-primary-100 cursor-pointer ${selected && "bg-primary-100"}`}
    >
      <div
        className={`min-w-[40px] min-h-[40px] rounded-full flex items-center justify-center ${
          selected ? "bg-white bg-opacity-70" : `bg-primary-100 bg-opacity-20`
        } `}
      >
        <p
          className={` text-xl font-semibold ${
            selectedDelete?.id === item.id ? "text-white" : "text-primary-100"
          } `}
        >
          {item.number + 1}
        </p>
      </div>
      <div>
        <h4
          className={`w-[100px] mb-1 truncate text-sm font-medium first-letter:capitalize ${
            (selected || selectedDelete?.id === item.id) && "text-white"
          }`}
        >
          {item.patientName}
        </h4>
        <p
          className={`first-letter:capitalize text-xs font-light ${
            selected || selectedDelete?.id === item.id
              ? "text-white"
              : "text-primary-100"
          }`}
        >
          motif: {item.motif}
        </p>
      </div>
    </div>
  );
};

export default CardRdv;
