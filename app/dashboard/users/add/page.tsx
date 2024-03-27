import React from "react";

function AddUserPage() {
  return (
    <div>
      <form action="submit" className="flex flex-col gap-2 items-center">
        <div className="flex flex-row justify-between p-5 w-full">
          <input
            type="text"
            placeholder="first name"
            title="first name"
            className=" bg-slate-700 rounded-md h-10 p-2 w-5/12"
          />
          <input
            type="text"
            placeholder="last name"
            title="last name"
            className=" bg-slate-700 rounded-md h-10 p-2 w-5/12"
          />
        </div>
        <div className="flex flex-row justify-between p-5 w-full">
          <input
            type="email"
            placeholder="email"
            title="Email"
            className=" bg-slate-700 rounded-md h-10 p-2 w-5/12"
          />
          <input
            type="phone"
            placeholder="contact"
            title="phone number"
            className=" bg-slate-700 rounded-md h-10 p-2 w-5/12"
          />
        </div>
        <div className="flex flex-row justify-between p-5 w-full">
          <input
            type="text"
            placeholder="address"
            title="Address"
            className=" bg-slate-700 rounded-md h-10 p-2 w-5/12"
          />
          <select
            name="role"
            id=""
            className=" bg-slate-700 rounded-md h-10 p-2 w-5/12">
            <option value="select role">select role</option>
            <option value="admin">admin</option>
            <option value="admin">author</option>
            <option value="admin">editor</option>
            <option value="admin">customer support</option>
            <option value="admin">marketter</option>
            <option value="admin">sales</option>
          </select>
        </div>
        <button
          type="submit"
          className="p-2 w-full items-center bg-slate-600 rounded-lg border-none">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddUserPage;
