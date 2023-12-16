"use client";
import Image from "next/image";
import logo from "../../../assets/logo.svg";
import Link from "next/link";
import "./header.css";
import { usePathname } from "next/navigation";

type pathType = {
  name: string;
  path: string;
};

const Header = () => {
  const pathname = usePathname();

  const paths: pathType[] = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Products",
      path: "/products",
    },
  ];
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div>
          <Image src={logo} width={139} height={64} alt="website logo" />
        </div>
        <div className="navbar-links">
          <ul>
            {paths?.map((link, index) => (
              <li
                key={index}
                className={pathname == link.path ? "active-link" : "link"}
              >
                <div className="link-background">
                  <Link
                    href={link.path}
                    className={
                      pathname == link.path ? "active-link-text" : "link-text"
                    }
                  >
                    {link.name}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
