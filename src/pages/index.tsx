import SupplierList from "@/components/SupplierList";
import { getCheckerList, getInQuantityData } from "@/libs/getGoogleSheets";
import NavBar from "@/components/Navbar";
import { RadioGroup } from "@headlessui/react";
import { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";

const dt = new Date();
const targetDay = "2023-08-04"; //dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();

export default function Home({ sheetData, checkers }: any) {
  const { datas, suppliers } = sheetData;
  const [checker, setChecker] = useState("미확인");
  const [content, setContent] = useState(false);

  return (
    <div className="sm:px-16 px-6">
      <NavBar name={checker} />
      <div className="flex-1 pt-36">
        <h1 className="2xl:text-[72px] sm:text-[64px] text-[50px] font-extrabold">MOOMOOZ Warehouse System!</h1>
        <p className="text-[27px] text-black-100 font-light mt-5">남대문 입고 상품 확인프로그램</p>
        <p className="text-[27px] text-black-100 font-light mt-5">기준일: {targetDay}</p>
      </div>
      <div className="flex pt-5">
        <RadioGroup value={checker} onChange={setChecker}>
          <RadioGroup.Label className="text-[27px] text-black-100 font-light mt-5">
            확인자를 선택해주세요
          </RadioGroup.Label>
          <div className="grid xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 mt-5 justify-between">
            {checkers.map((person: string) => (
              <RadioGroup.Option
                key={person}
                value={person}
                className={({ active, checked }) =>
                  `${active ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300" : ""}
                ${checked ? "bg-sky-900 bg-opacity-75 text-white" : "bg-white"}
                  relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className={`font-medium text-xl  ${checked ? "text-white" : "text-gray-900"}`}
                        >
                          {person}
                        </RadioGroup.Label>
                      </div>
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
      <CustomButton
        isDisabled={false}
        btnType={"button"}
        title={`[${targetDay}]기준 자료 가져오기`}
        containerStyles={"bg-blue-500 rounded-lg mt-5"}
        textStyles={"text-white"}
        handleClick={() => {
          checker === "미확인" ? alert("확인자를 선택해주세요") : setContent(true);
        }}
      />
      {content && suppliers.length == 0 ? (
        <p className="text-[27px] text-red-300 font-light mt-5">데이터가 없습니다. 사무실에 문의해주세요</p>
      ) : (
        content && <SupplierList datas={datas} suppliers={suppliers} checker={checker} />
      )}
    </div>
  );
}

export async function getServerSideProps() {
  const sheetData: any = await getInQuantityData(targetDay);
  const checkers: any = await getCheckerList();
  return {
    props: { sheetData, checkers },
  };
}
