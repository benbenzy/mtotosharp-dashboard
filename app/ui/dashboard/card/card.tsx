import React from "react";
import { MdSupervisedUserCircle } from "react-icons/md";

interface props {
  title: string;
  icon: any;
  value?: number | string;
  range?: string;
  comment?: string;
}

function Card({ title, icon, value, range, comment }: props) {
  return (
    <div className="flex flex-row bg-slate-800 gap-2 rounded-md hover:bg-slate-600 p-5 cursor-pointer w-full">
      {icon}
      <div className="flex flex-col gap-2">
        <span className=" semi-bold text-lg capitalize">{title}</span>
        <span className=" font-bold text-xl">{value?.toLocaleString()}</span>
        <span className=" text-sm">
          <span
            className={`font-light ${
              range?.startsWith("+") ? "text-green-600" : "text-red-500"
            }`}>
            {range}{" "}
          </span>{" "}
          {comment}
        </span>
      </div>
    </div>
  );
}

export default Card;