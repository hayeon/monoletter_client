import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useAnimation } from "framer-motion";

function SearchHeader() {
  const navAnimation = useAnimation();
  const path = usePathname();



  return (
    <motion.nav 
      className="flex justify-between items-center fixed w-full h-20 top-0 text-sm bg-transparent"
      animate={navAnimation}
      initial="top"
    >
      <div className="flex items-center">
        <ul className="flex items-center">
          <li className="mr-5 text-gray-400 relative flex justify-center flex-col text-lg cursor-pointer hover:text-orange-500">
            <Link href="/">home</Link>
            {path === "/" && (
              <motion.span className="absolute rounded-md h-11 w-11 bg-orange-500 bottom-[-15px] left-0 right-0 mx-auto"></motion.span>
            )}
          </li>
        </ul>
        <ul className="flex items-center">
          <li className="mr-5 text-gray-400 relative flex justify-center flex-col text-lg cursor-pointer hover:text-orange-500">
            <Link href="/all">모아보기</Link>
            {path === "/all" && (
              <motion.span className="absolute rounded-md h-11 w-11 bg-orange-500 bottom-[-15px] left-0 right-0 mx-auto"></motion.span>
            )}
          </li>
        </ul>
      </div>
    </motion.nav>
  );
}

export default SearchHeader;
