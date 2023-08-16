import { ItemList } from "@/types";
import Link from "next/link";

const SupplierList = ({ incomingGoods, suppliers, checker, today }: any) => (
  <div className="mt-12 max-w-[1440px]">
    <section>
      <div className="grid xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 justify-between gap-y-5 text-black-100">
        {suppliers.map((supplier: string) => {
          const incomingGoodsBySupplier = incomingGoods.filter((data: ItemList) => data.supplierCode === supplier);
          const orderQuantity = incomingGoodsBySupplier
            .map((data: ItemList) => data.orderQuantity ?? 0)
            .reduce((acc: number, cur: number) => acc + cur, 0);
          const inQuantity = incomingGoodsBySupplier
            .map((data: ItemList) => data.incomingQuantity ?? 0)
            .reduce((acc: number, cur: number) => acc + cur, 0);

          return (
            <div className="p-8 shadow-lg rounded-xl text-center bg-white" key={supplier}>
              <h1 className="text-xl font-bold text-black">{incomingGoodsBySupplier[0].supplierNm}</h1>
              <hr className="my-2 border-gray-200 dark:border-gray-700" />
              <p className="text-sm text-black">주문수 : {orderQuantity} pcs</p>
              <p className="text-sm text-black">입고수 : {inQuantity} pcs</p>
              <hr className="my-2 border-gray-200 dark:border-gray-700" />
              <p className="text-sm text-gray-500">확인자 : 미확인</p>
              <hr className="my-2 border-gray-200 dark:border-gray-700" />
              <Link
                href={{
                  pathname: `/${supplier}`,
                  query: {
                    incomingGoodsBySupplier: JSON.stringify(incomingGoodsBySupplier),
                    checker: JSON.stringify(checker),
                    today: JSON.stringify(today),
                  },
                }}
                as={`/${supplier}`}
              >
                Click
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  </div>
);

export default SupplierList;
