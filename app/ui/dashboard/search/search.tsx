import React from "react";
import { MdSearch } from "react-icons/md";

interface prop {
  placeholder: string;
}

function Search({ placeholder }: prop) {
  return (
    <div className="flex flex-row gap-2 rounded-md w-max bg-slate-800 items-center p-2">
      <MdSearch />
      <input
        placeholder={placeholder}
        className="  bg-transparent rounded-md "
      />
    </div>
  );
}

export default Search;
