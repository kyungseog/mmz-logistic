import { CustomButtonProps } from "@/types";

export default function Pannel({ isDisabled, title, handleClick }: CustomButtonProps) {
  return (
    <div className="p-8 shadow-lg rounded-xl text-center bg-white">
      <h1 className="text-xl font-bold text-black">{title}</h1>
      <hr className="my-2 border-gray-200 dark:border-gray-700" />
      <p className="text-sm text-black">주문수 : 5 pcs</p>
      <p className="text-sm text-black">입고수 : 0 pcs</p>
      <hr className="my-2 border-gray-200 dark:border-gray-700" />
      <p className="text-sm text-black">확인자 : 미확인</p>
      <hr className="my-2 border-gray-200 dark:border-gray-700" />
      <button
        disabled={isDisabled}
        type="button"
        className="items-center py-3 px-12 outline-none bg-black text-white rounded-full mt-5"
        onClick={handleClick}
      >
        <span className="flex-1">Click</span>
      </button>
    </div>
  );
}
