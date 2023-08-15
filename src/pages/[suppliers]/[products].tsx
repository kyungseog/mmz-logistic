import { useRouter } from "next/router";
import Image from "next/image";
import NavBar from "@/components/Navbar";
import { SheetData } from "@/types";
import { getIssueList, getItemList } from "@/libs/getGoogleSheets";
import { useEffect, useState } from "react";
import { headers } from "next/dist/client/components/headers";

export default function Products({ issueList }: any) {
  const [itemList, setItemLIst] = useState();
  const router = useRouter();
  console.log(router);
  useEffect(() => {
    const fetchData = async () => {
      const req = await fetch("http://localhost:3000/api/googleSheet", {
        method: "POST",
        body: JSON.stringify({ item: "N31MM010B42" }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await req.json();
      setItemLIst(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="sm:px-16 px-6">
      <NavBar />
      <div className="flex-1 pt-36">
        <div className="grid grid-cols-5 text-center">
          {/* <Image
            src={itemDatas[0].imageUrl}
            alt={itemDatas[0].productNm}
            width={500}
            height={700}
            className="col-span-2"
          /> */}
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
              {itemList.map((item: SheetData) => {
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
                        id="inQuantity"
                        type="number"
                        placeholder="0"
                      ></input>
                    </td>
                    <td className="border">
                      {
                        <select>
                          {issueList.map((list: string, index: number) => {
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
  const issueList = await getIssueList();
  return {
    props: { issueList },
  };
}
