import React from "react";
import Image from "next/image";

function SingleUserPage() {
  return (
    <div className="flex flex-row gap-8">
      <div className="flex flex-col w-2/5 mt-5 bg-slate-800 p-5">
        <div className="w-full h-3/4 mb-5 overflow-hidden rounded-md relative">
          <Image alt="" src={"/noavatar.png"} fill />
        </div>
        ben benzy
      </div>
      <div className=" flex-1 gap-2 mt-2 rounded-md bg-slate-800">
        <form action="" className="flex flex-col">
          <label htmlFor="firstName" className="mt-5 font-semibold capitalize">
            {" "}
            first Name
          </label>
          <input
            type="text"
            placeholder="first name"
            name="first name"
            className="bg-slate-600 p-2 rounded-md text-slate-50"
          />
          <label htmlFor="lastName" className="mt-5 font-semibold capitalize">
            {" "}
            last Name
          </label>
          <input
            className="bg-slate-600 p-2 rounded-md text-slate-50"
            type="text"
            placeholder="lastName"
            name="lastName"
          />
          <label htmlFor="email" className="mt-2 font-semibold capitalize">
            {" "}
            Email
          </label>
          <input
            className="bg-slate-600 p-2 rounded-md text-slate-50"
            type="email"
            placeholder="johndoe@gmail.com"
            name="email"
          />
          <label htmlFor="email" className="mt-2 font-semibold capitalize">
            {" "}
            Phone
          </label>
          <input
            className="bg-slate-600 p-2 rounded-md text-slate-50"
            type="contact"
            placeholder="+254710000000"
            name="phone"
          />
          <label htmlFor="email" className="mt-2 font-semibold capitalize">
            {" "}
            Address
          </label>
          <input
            className="bg-slate-600 p-2 rounded-md text-slate-50"
            type="text"
            placeholder="nairobi"
            name="address"
          />
          <label htmlFor="email" className="mt-2 font-semibold capitalize">
            {" "}
            Role
          </label>
          <select
            name="role"
            id=""
            className="bg-slate-600 p-2 rounded-md text-slate-50">
            <option value="">admin</option>
            <option value="">support</option>
            <option value="">marketting</option>
            <option value="">author</option>
            <option value="">sales</option>
          </select>
          <label htmlFor="email" className="mt-2 font-semibold capitalize">
            {" "}
            status
          </label>
          <select
            name="status"
            id=""
            className="bg-slate-600 p-2 rounded-md text-slate-50">
            <option value="">active</option>
            <option value="">blocked</option>
            <option value="">disabled</option>
            <option value="">suspended</option>
          </select>
          <button className="w-full bg-green-900 rounded-md mt-5 p-2">
            update
          </button>
        </form>
      </div>
    </div>
  );
}

export default SingleUserPage;
