import Link from "next/link";
import MobileMenu from "./MobileMenu";
import ImageWithFallback from "./ImageWithFallback";
import Menu from "./Menu";
import { getServerSession } from "next-auth";

import SearchBar from "./SearchBar";

export default async function NavBar() {
  const session = await getServerSession();
  return (
    <nav
      className={
        "lg:mf-grid top-0 p-4 transition-all duration-300 md:px-8  xl:px-0 fixed z-20 w-full bg-gray-950"
      }
    >
      <div className="flex justify-between items-center lg:col-span-12 lg:gap-16">
        <Menu />
        <div className="flex items-center justify-end gap-4 lg:flex-1">
          <SearchBar />
          {session ? (
            <div className="flex gap-4 items-center">
              {session.user?.image && (
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <ImageWithFallback
                    src={session.user?.image}
                    alt={session.user?.name || "User Avatar"}
                    fill
                    className="w-8"
                    fallback={"https://i.pravatar.cc/300"}
                  />
                </div>
              )}
              <Link
                title="Logout"
                className={"hidden lg:inline-block mf-link text-white"}
                href={"/api/auth/signout"}
              >
                Log out
              </Link>
            </div>
          ) : (
            <Link
              title="Login"
              className={"hidden lg:inline-block btn-primary"}
              href={"/api/auth/signin"}
            >
              Log in
            </Link>
          )}
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
