import Hero from "@/components/Hero";
import { getInQuantityData } from "@/libs/getGoogleSheets";
import { SheetData } from "@/types";
import Link from "next/link";

export default function Home({ sheetData }: any) {
  const { today, datas, suppliers } = sheetData;
  return (
    <div>
      <Hero />
      <div className="mt-12 sm:px-16 px-6 py-4 max-w-[1440px] mx-auto">
        <section>
          <p className="text-[20px] text-black-100 font-light mt-5">[{today}]일 기준</p>
          <div className="grid xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 justify-between gap-y-5 text-black-100">
            {suppliers.map((supplier: any) => {
              const filteredData = datas.filter((data: SheetData) => data.supplierCode === supplier.supplierId);
              const orderQuantity = filteredData
                .map((data: SheetData) => data.orderQuantity ?? 0)
                .reduce((acc: number, cur: number) => acc + cur, 0);
              const inQuantity = filteredData
                .map((data: SheetData) => data.inQuantity ?? 0)
                .reduce((acc: number, cur: number) => acc + cur, 0);
              return (
                <div className="p-8 shadow-lg rounded-xl text-center bg-white" key={supplier.supplierId}>
                  <h1 className="text-xl font-bold text-black">{supplier.supplierNm}</h1>
                  <hr className="my-2 border-gray-200 dark:border-gray-700" />
                  <p className="text-sm text-black">주문수 : {orderQuantity} pcs</p>
                  <p className="text-sm text-black">입고수 : {inQuantity} pcs</p>
                  <hr className="my-2 border-gray-200 dark:border-gray-700" />
                  <p className="text-sm text-gray-500">확인자 : 미확인</p>
                  <hr className="my-2 border-gray-200 dark:border-gray-700" />
                  <Link
                    href={{
                      pathname: `/${supplier.supplierId}`,
                      query: { filteredData: JSON.stringify(filteredData) },
                    }}
                    as={`/${supplier.supplierId}`}
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

export async function getServerSideProps() {
  const sheetData: any = await getInQuantityData();
  return {
    props: { sheetData },
  };
}
