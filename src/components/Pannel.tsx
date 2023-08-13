import { CustomButtonProps } from "@/types";
import Link from "next/link";

export default function Pannel({ isDisabled, title, id, orderQuantity, inQuantity, filteredData }: CustomButtonProps) {
  return (
    <div className="p-8 shadow-lg rounded-xl text-center bg-white">
      <h1 className="text-xl font-bold text-black">{title}</h1>
      <hr className="my-2 border-gray-200 dark:border-gray-700" />
      <p className="text-sm text-black">주문수 : {orderQuantity} pcs</p>
      <p className="text-sm text-black">입고수 : {inQuantity} pcs</p>
      <hr className="my-2 border-gray-200 dark:border-gray-700" />
      <p className="text-sm text-gray-500">확인자 : 미확인</p>
      <hr className="my-2 border-gray-200 dark:border-gray-700" />
      <Link
        href={{
          pathname: `/${id}`,
          query: { filteredData: JSON.stringify(filteredData) },
        }}
        as={`/${id}`}
      >
        Click
      </Link>
    </div>
  );
}
