import { useRouter } from "next/router";
export default function Suppliers() {
  const router = useRouter();
  console.log(router);
  return (
    <div>
      <div className="flex xl:flex-row flex-col gap-5 relative z-0 max-w-[1440px] mx-auto">
        <div className="flex-1 pt-36 sm:px-16 px-6">
          <h1 className="text-[50px] font-extrabold">[{router.query.supplierId}]</h1>
        </div>
      </div>
      <div className="mt-12 sm:px-16 px-6 py-4 max-w-[1440px] mx-auto">
        <section>
          <p className="text-[20px] text-black-100 font-light mt-5">[공급사명]</p>
        </section>
      </div>
    </div>
  );
}
