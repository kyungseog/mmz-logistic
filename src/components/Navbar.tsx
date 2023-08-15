import Link from "next/link";
import Image from "next/image";

const NavBar = ({ name }: any) => (
  <header className="w-full absolute z-10">
    <nav className="max-w-[1440px] flex justify-between items-center py-4 bg-transparent">
      <Link href="/" className="flex justify-center items-center">
        <Image src="/logo_kr_bk.png" alt="logo" width={118} height={18} className="object-contain" />
      </Link>
      <h5 className="text-gray-500 font-normal text-3xl">{name}</h5>
    </nav>
  </header>
);

export default NavBar;
