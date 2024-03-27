import React from "react";

function LoginPage() {
  return (
    <div className="flex justify-center items-center">
      <form
        action="submit"
        className="bg-slate-800 flex flex-col gap-5 w-2/5 items-center  rounded-md mt-20">
        <h1 className="uppercase font-extrabold mt-20">login</h1>
        <div className="w-full items-center flex flex-col mt-10">
          <label htmlFor="" className="">
            email/username
          </label>
          <input
            type="email"
            placeholder="email /username"
            className=" rounded-md p-2 w-4/5 bg-slate-700 text-slate-50"
          />
        </div>
        <div className="w-full items-center flex flex-col">
          <label htmlFor="">password</label>
          <input
            type="password"
            placeholder="password"
            className=" rounded-md p-2 w-4/5 bg-slate-700 text-slate-50"
          />
        </div>
        <button className="bg-green-800 p-2 rounded-md w-4/5 self-center mb-20 border-none cursor-pointer hover:bg-green-400">
          login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
