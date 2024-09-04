import React from 'react';
import Image from 'next/image';

function TransactionComponent({ item }: any) {
  return (
    <tr key={item?.id} className="mt-2">
      <td className="flex flex-row gap-2 p-2 items-center">
        <Image
          height={30}
          width={30}
          alt=""
          src={'/noavatar.png'}
          className="rounded-full object-cover"
        />
        {item?.phone_number}
      </td>
      <td
        className={` font-medium p-2 ${
          item.status === 'waiting'
            ? 'text-yellow-600'
            : item.status === 'success'
            ? 'text-lime-600'
            : item.status === 'reversed'
            ? 'text-gray-400'
            : 'text-red-600'
        }`}
      >
        {item?.status}
      </td>
      <td className="p-2">{item?.amount?.toLocaleString()}</td>

      <td className="">
        {new Date(item?.created_at).toDateString()}
        <span> at {new Date(item?.created_at).getHours()}</span>
        <span>:{new Date(item?.created_at).getMinutes()}</span>
      </td>
    </tr>
  );
}

export default TransactionComponent;
