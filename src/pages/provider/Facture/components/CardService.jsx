import React, { useState } from "react";
import icons from "../../../../constants/icons";

const CardService = ({ title, subTitle, items, selected, setSelected }) => {
  return (
    <div>
      <div className="text-primary-100 first-letter:capitalize relative w-full border-b">
        <div className="w-fit">
          <h4 className="font-medium mb-2">{title}</h4>
          <div className="border-b-2 border-primary-100 w-3/4"></div>
        </div>
      </div>
      <div className="bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-2xl mt-4 p-4">
        <p className="text-sm text-gray-400 font-medium first-letter:capitalize mb-4">
          {subTitle}
        </p>
        <ul className="h-[200px] overflow-y-auto">
          {items.map((item, idx) => (
            <Item key={idx} title={item.title} description={item.description} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CardService;

const Item = ({ title, description }) => {
  const [selected, setSelected] = useState(false);

  return (
    <div onClick={() => setSelected((s) => !s)}>
      <li className="flex items-center space-x-2 py-2 hover:bg-gray-50 cursor-pointer">
        <div className="min-w-[20px] h-[20px] rounded-full bg-[#0AAF6050] flex items-center justify-center">
          {selected && <img src={icons.checkBlue} alt="" className="w-4" />}
        </div>
        <div className="text-sm first-letter:capitalize">
          <p className="font-medium">{title}</p>
          <p className="text-gray-400">{description}</p>
        </div>
      </li>
    </div>
  );
};
