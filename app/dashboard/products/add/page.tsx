import React from "react";

function AddProductspage() {
  return (
    <div className="bg-slate-800 p-20 mt-5 rounded-md">
      <form action="" className="flex flex-wrap justify-between ">
        <input
          type="text"
          placeholder="title"
          required
          name="title"
          className=" w-11s"
        />
        <input type="number" name="prize" placeholder="prize" />
        <input type="number" name="size" placeholder="size" />
        <select
          name="category"
          id="cat"
          className="p-5 bg-transparent rounded-md text-slate-500 mb-5">
          <option value="general">choose user category</option>
          <option value="customer suppoort">customer support</option>
          <option value="authors">authors</option>
          <option value="editors">editors</option>
          <option value="sales">sales</option>
          <option value="marketting">marketting</option>
          <option value="agents">agents</option>
          <option value="publishers">publishers</option>
          <option value="sysytem support">system support</option>
        </select>

        <textarea
          name="description"
          id="description"
          title="description"
          placeholder="description"
          rows={10}></textarea>
        <button
          type="submit"
          className="p-5 w-full bg-blue-300 rounded-lg border-none">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddProductspage;
