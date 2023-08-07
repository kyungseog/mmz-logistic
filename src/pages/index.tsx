import Hero from "@/components/Hero";
import Pannel from "@/components/Pannel";
import { getGoogleSheets } from "@/libs/getGoogleSheets";
import Head from "next/head";

export default function Home({ sheet }: any) {
  const handleScroll = () => {};
  return (
    <div>
      <Head>
        <title>mmz-warehouse</title>
      </Head>
      <main className="overflow-hidden">
        <Hero />
        <div className="mt-12 sm:px-16 px-6 py-4 max-w-[1440px] mx-auto">
          <div className="flex flex-col items-start justify-start gap-y-2.5 text-black-100">
            <section>
              <p className="text-[20px] text-black-100 font-light mt-5">[{sheet.today}]일 기준</p>
              <div className="grid xl:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 gap-4 justify-between gap-y-5 text-black-100">
                {sheet.uniqueSuppliers.map((supplier: any) => {
                  return <Pannel title={supplier.supplierNm} key={supplier.supplierId} handleClick={handleScroll} />;
                })}
              </div>
              {/* <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    {sheet.headline.map((item: any) => {
                      return (
                        <th className="px-6 py-4" key={item}>
                          {item}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {sheet.todayDatas.map((row: any, index: any) => (
                    <tr className="border-b dark:border-neutral-500" key={index}>
                      {row.map((item: any) => (
                        <td className="px-6 py-4" key={item}>
                          {item}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table> */}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const sheet: any = await getGoogleSheets();
  return {
    props: { sheet },
  };
}
