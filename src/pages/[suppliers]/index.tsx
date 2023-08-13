import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { SheetData } from "@/types";

export default function Suppliers() {
  const router = useRouter();
  const datas = JSON.parse(router.query.filteredData);
  const products = new Set(datas.map((row: SheetData) => row.productCode));
  const uniqueProducts = [...products];
  console.log(uniqueProducts);
  const itemData = {
    barCode: "dd",
    orderQuantity: 3,
    inQuantity: 0,
  };

  return (
    <div>
      <div className="flex xl:flex-row flex-col gap-5 relative z-0 max-w-[1440px] mx-auto">
        <div className="flex-1 pt-36 sm:px-16 px-6">
          <h1 className="text-[50px] font-extrabold">[{datas[0].supplierNm}]</h1>
        </div>
      </div>
      <div className="mt-12 sm:px-16 px-6 py-4 max-w-[1440px] mx-auto">
        <section>
          <div className="grid xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 justify-between gap-y-5 text-black-100">
            {datas.map((item: any) => {
              return (
                <div className="p-8 shadow-lg rounded-xl text-center justify-items-center bg-white" key={item.barCode}>
                  <Image src={item.imageUrl} alt={item.productNm} width={100} height={50} />
                  <hr className="my-2 border-gray-200 dark:border-gray-700" />
                  <h1 className="text-xl font-bold text-black">{item.productNm}</h1>
                  <hr className="my-2 border-gray-200 dark:border-gray-700" />
                  <p className="text-sm text-black">주문수 : {item.orderQuantity} pcs</p>
                  <p className="text-sm text-black">입고수 : {item.inQuantity} pcs</p>
                  <hr className="my-2 border-gray-200 dark:border-gray-700" />
                  <p className="text-sm text-gray-500">확인자 : 미확인</p>
                  <hr className="my-2 border-gray-200 dark:border-gray-700" />
                  <Link
                    href={{
                      pathname: `/${item.supplierCode}/${item.productCode}`,
                      query: { itemData: JSON.stringify(itemData) },
                    }}
                    as={`/${item.supplierCode}/${item.productCode}`}
                  >
                    Click
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
