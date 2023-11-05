import MobileMenu from "./MobileMenu";
import Menu from "./Menu";
import SearchBar from "./SearchBar";
import Avatar from "./Avatar";

export default function NavBar() {
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
          <Avatar />
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
