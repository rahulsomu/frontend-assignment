import { ChevronRightIcon } from "@heroicons/react/24/outline";
import "./hamburger.css";

type Props = {
  navigationMenuOpen: boolean;
  toggleMenu: () => void;
};

const Hamburger = ({ toggleMenu, navigationMenuOpen }: Props) => {
  return (
    <div className="hamburger-menu" onClick={toggleMenu}>
      <div></div>
      <ChevronRightIcon
        style={{ right: navigationMenuOpen ? "28px" : "-20px" }}
      />
    </div>
  );
};

export default Hamburger;
