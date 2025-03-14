import Link from "next/link";
import SearchInput from "./SearchInput";

export default function Navbar() {
  return (
    <nav
      className="w-full h-[112px] flex flex-col flex-wrap space-y-4 justify-center items-center border-b-2 border-gray-300 px-6 sm:flex-row sm:justify-between sm:h-16 sm:space-y-0"
      role="navigation"
    >
      <Link href="/" className="font-bold text-lg">
        Developers At Lunch
      </Link>
      <SearchInput />
    </nav>
  );
}
