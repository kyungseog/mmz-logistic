import Hero from "@/components/Hero";
import Pannel from "@/components/Pannel";
import { getGoogleSheets } from "@/libs/getGoogleSheets";
import Head from "next/head";

export default function Home({ sheet }: any) {
  return (
    <div>
      <Head>
        <title>mmz-warehouse</title>
      </Head>
      <Hero />
      <div className="mt-12 sm:px-16 px-6 py-4 max-w-[1440px] mx-auto">
        <section>
          <p className="text-[20px] text-black-100 font-light mt-5">[{sheet.today}]일 기준</p>
          <div className="grid xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 justify-between gap-y-5 text-black-100">
            {sheet.uniqueSuppliers.map((supplier: any) => {
              return <Pannel title={supplier.supplierNm} key={supplier.supplierId} supplierId={supplier.supplierId} />;
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const sheet: any = await getGoogleSheets();
  return {
    props: { sheet },
  };
}
