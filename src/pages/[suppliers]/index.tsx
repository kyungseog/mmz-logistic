import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { SheetData } from "@/types";
import NavBar from "@/components/Navbar";

export default function Suppliers() {
  const router = useRouter();
  if (typeof router.query.filteredData !== "string") {
    return <></>;
  }
  const filteredData = JSON.parse(router.query.filteredData);
  const checker = typeof router.query.checker !== "string" ? "미확인" : JSON.parse(router.query.checker);
  const products = filteredData.map((row: SheetData) => row.productCode);
  const uniqueProducts = products.filter((product: string, index: number) => products.indexOf(product) === index);

  const totalOrderQuantity = filteredData
    .map((data: SheetData) => data.orderQuantity ?? 0)
    .reduce((acc: number, cur: number) => acc + cur, 0);
  const totalInQuantity = filteredData
    .map((data: SheetData) => data.inQuantity ?? 0)
    .reduce((acc: number, cur: number) => acc + cur, 0);

  return (
    <div className="sm:px-16 px-6">
      <NavBar name={checker} />
      <div className="flex xl:flex-row flex-col gap-5 relative z-0 max-w-[1440px]">
        <div className="flex-1 pt-36">
          <h1 className="text-[30px] font-extrabold">
            [{filteredData[0].supplierNm}]
            <span className="font-normal ms-3">
              주문상품수: {totalOrderQuantity} pcs / 확인완료수: {totalInQuantity} pcs{" "}
            </span>
          </h1>
        </div>
      </div>
      <div className="mt-12 py-4 max-w-[1440px]">
        <section>
          <div className="grid xl:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 justify-between text-black-100">
            {uniqueProducts.map((product: any) => {
              const selectData = filteredData.filter((data: SheetData) => data.productCode === product);
              const orderQuantity = selectData
                .map((data: SheetData) => data.orderQuantity ?? 0)
                .reduce((acc: number, cur: number) => acc + cur, 0);
              const inQuantity = selectData
                .map((data: SheetData) => data.inQuantity ?? 0)
                .reduce((acc: number, cur: number) => acc + cur, 0);
              return (
                <div className="p-4 shadow-lg rounded-xl text-center bg-white" key={selectData[0].productCode}>
                  <div className="flex">
                    <Image src={selectData[0].imageUrl} alt={selectData[0].productNm} width={100} height={50} />
                    <div className="flex flex-col ms-3 justify-center">
                      <p className="text-sm text-black">주문수 : {orderQuantity} pcs</p>
                      <p className="text-sm text-black">입고수 : {inQuantity} pcs</p>
                    </div>
                  </div>
                  <hr className="my-2 border-gray-200 dark:border-gray-700" />
                  <h1 className="text-sm text-start font-bold text-gray-400">[상품코드]</h1>
                  <p className="text-m text-black">{selectData[0].productCode}</p>
                  <h1 className="text-sm text-start font-bold text-gray-400">[판매상품명]</h1>
                  <p className="text-m text-black">{selectData[0].productNm}</p>
                  <h1 className="text-sm text-start font-bold text-gray-400">[사입상품명]</h1>
                  <p className="text-m text-black">{selectData[0].buyingProductNm}</p>
                  <hr className="my-2 border-gray-200 dark:border-gray-700" />
                  <p className="text-sm text-gray-500">확인자 : 미확인</p>
                  <hr className="my-2 border-gray-200 dark:border-gray-700" />
                  <Link
                    href={{
                      pathname: `/${selectData[0].supplierCode}/${selectData[0].productCode}`,
                      query: { itemData: JSON.stringify(selectData), checker: JSON.stringify(checker) },
                    }}
                    as={`/${selectData[0].supplierCode}/${selectData[0].productCode}`}
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
