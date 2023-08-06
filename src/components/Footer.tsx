import Link from "next/link";

const Footer = () => (
  <footer className="flex justify-between items-center flex-wrap mt-10 border-t border-gray-100 sm:px-16 px-6 py-10">
    <p>@2023 Rainmaker. All rights reserved</p>
    <div className="flex-1 flex sm:justify-end justify-center max-sm:mt-4 gap-10">
      <Link href="/" className="text-gray-500">
        Privacy & Policy
      </Link>
      <Link href="/" className="text-gray-500">
        Terms & Condition
      </Link>
    </div>
  </footer>
);

export default Footer;
