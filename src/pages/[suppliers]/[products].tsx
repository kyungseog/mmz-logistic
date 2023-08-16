import { useRouter } from "next/router";
import Image from "next/image";
import NavBar from "@/components/Navbar";
import { ItemList } from "@/types";
import { getInfoIssueLists } from "@/libs/getGoogleSheets";
import { useEffect, useState } from "react";

export default function Products({ issueLists }: any) {
  const [itemLists, setItemLIsts] = useState<ItemList[]>([]);
  const router = useRouter();
  const productCode: string = typeof router.query.products !== "string" ? "" : router.query.products;
  const today: string = typeof router.query.today !== "string" ? "2023-01-01" : JSON.parse(router.query.today);
  const checker: string = typeof router.query.checker !== "string" ? "미확인" : JSON.parse(router.query.checker);
  const image: string = typeof router.query.image !== "string" ? "" : JSON.parse(router.query.image);

  useEffect(() => {
    const fetchData = async () => {
      const req = await fetch("http://localhost:3000/api/googleSheet", {
        method: "POST",
        body: JSON.stringify({ item: productCode, today: today }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await req.json();
      setItemLIsts(res.data);
    };
    fetchData();
  }, [productCode, today]);

  return (
    <div className="sm:px-16 px-6">
      <NavBar name={checker} />
      <div className="flex-1 pt-36">
        <div className="grid grid-cols-5 text-center">
          <Image src={image} alt={""} width={500} height={700} className="col-span-2" />
          <table className="table-auto col-span-3">
            <thead className="bg-gray-100 border">
              <tr className="border">
                <th className="border">Check</th>
                <th className="border">바코드</th>
                <th className="border">옵션내용</th>
                <th className="border">주문수량</th>
                <th className="border">입고수량</th>
                <th className="border">입고이슈</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {itemLists.map((item: ItemList) => {
                return (
                  <tr key={item.barCode} className="hover:bg-gray-100 border">
                    <td className="border">
                      <div className="flex items-center justify-center">
                        <input
                          id="checkbox-table-1"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500focus:ring-2"
                        ></input>
                        <label htmlFor="checkbox-table-1" className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </td>
                    <td className="border">{item.barCode}</td>
                    <td className="border">{item.optionNm}</td>
                    <td className="border">{item.orderQuantity}</td>
                    <td className="border">
                      <input
                        className="w-24 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="incomingQuantity"
                        type="number"
                        placeholder="0"
                      ></input>
                    </td>
                    <td className="border">
                      {
                        <select>
                          {issueLists.map((list: string, index: number) => {
                            return (
                              <option key={index} value={list}>
                                {list}
                              </option>
                            );
                          })}
                        </select>
                      }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const issueLists = await getInfoIssueLists();
  return {
    props: { issueLists },
  };
}
