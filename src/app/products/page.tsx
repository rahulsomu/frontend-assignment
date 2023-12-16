"use client";
import { ArrowSmallRightIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartFilled } from "@heroicons/react/20/solid";
import "./products.css";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import dropDownIcon from "../../assets/dropdown-icon.svg";
import Link from "next/link";
import Hamburger from "../components/hamburgerMenu/Hamburger";
import logo from "../../assets/logo.svg";
import { usePathname } from "next/navigation";
type pathType = {
  name: string;
  path: string;
};
const Products = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [productCategories, setProductCategories] = useState<string[]>([]);
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [navigationMenuOpen, setNavigationMenuOpen] = useState<boolean>(false);

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
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const fetchProductsByCategory = async (category: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/category/${category}`
      );
      const data = await response.data;
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };
  const getAllProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://dummyjson.com/products ");
      const data = await response.data;
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  const likeProduct = (product: string) => {
    if (!likedProducts.includes(product)) {
      setLikedProducts([...likedProducts, product]);
    } else {
      setLikedProducts(likedProducts.filter((item) => item != product));
    }
  };
  const toggleMenu = () => {
    setNavigationMenuOpen(!navigationMenuOpen);
    document.body.style.overflow = "hidden";
  };
  useEffect(() => {
    if (navigationMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [navigationMenuOpen]);
  useEffect(() => {
    getAllProducts();
    const getProductCategories = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products/categories"
        );
        const data = await response.data;
        setProductCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProductCategories();
  }, []);
  return (
    <main
      className="products"
      style={{
        maxHeight: navigationMenuOpen ? "100vh" : "",
        overflow: navigationMenuOpen ? "hidden" : "",
      }}
    >
      <Hamburger
        toggleMenu={toggleMenu}
        navigationMenuOpen={navigationMenuOpen}
      />
      {navigationMenuOpen && (
        <div className="navigation-overlay">
          <div className="logo">
            <Image src={logo} width={139} height={64} alt="website logo" />
          </div>
          <ul className="flex flex-col gap-5">
            {paths?.map((link, index) => (
              <li
                key={index}
                className={
                  pathname == link.path ? "active-link-mobile" : "link-mobile"
                }
              >
                <div className="link-background-mobile">
                  <Link
                    href={link.path}
                    className={
                      pathname == link.path
                        ? "active-link-text-mobile"
                        : "link-text-mobile"
                    }
                  >
                    {link.name}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <section className="products-banner">
        <div className="products-banner-heading">
          <h1 className="font-routhem text-secondary">Products</h1>
        </div>
      </section>
      <section className="products-section">
        <div className="products-section-dropdown">
          <p className="text-[20px] font-bespak lg:text-[38px] text-[#fff]">
            {`>> `}All Products
          </p>
          <div
            className={`categoriesDropdown bg-[#f2f2f2] h-[80px] w-[300px] flex justify-between items-center px-10 relative ${
              dropdownOpen ? "rounded-t-[50px]" : "rounded-[200px]"
            }`}
          >
            <p
              onClick={() => dropdownOpen && getAllProducts()}
              className="dropdown-items cursor-pointer"
            >
              All Products
            </p>
            <button onClick={toggleDropdown}>
              <Image
                className={`${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                } transition`}
                src={dropDownIcon}
                alt="down icon"
              />
            </button>
            <div
              className={`${
                dropdownOpen ? "h-[200px]" : "h-[0px]"
              } dropdown-list absolute top-[80px] left-0 w-[300px] overflow-y-scroll rounded-b-[50px] px-10 bg-[#f2f2f2]`}
            >
              <ul>
                {productCategories?.map((item: string, index) => (
                  <li
                    key={index}
                    onClick={() => fetchProductsByCategory(item)}
                    className="p-2 cursor-pointer dropdown-items"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="w-full h-[500px] flex items-center justify-center">
            <p className="font-bespak text-[#ffffff]">Loading Products..</p>
          </div>
        ) : error ? (
          <div className="w-full h-[500px] flex items-center justify-center">
            <p className="font-bespak text-[#ffffff]">
              Something Went Wrong...
            </p>
          </div>
        ) : (
          <div className="product-section-products">
            {products?.map((item: any) => (
              <div key={item?.id} className="product-card">
                <HeartFilled
                  className="heart"
                  style={{
                    animation: likedProducts.includes(item.title)
                      ? "1s linear pulse"
                      : "",
                  }}
                />
                <div className="product-card-info">
                  <p>
                    {" "}
                    {item?.brand?.length > 20
                      ? item?.brand?.slice(0, 20) + "..."
                      : item?.brand}
                  </p>
                  {likedProducts.includes(item.title) ? (
                    <HeartFilled
                      onClick={() => likeProduct(item.title)}
                      className="h-8 w-8 text-[#DF0000]"
                    />
                  ) : (
                    <HeartIcon
                      onClick={() => likeProduct(item.title)}
                      className="h-8 w-8 "
                    />
                  )}
                </div>
                <div className="product-card-image">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={180}
                    height={180}
                  />
                </div>
                <div className="product-card-name">
                  <p>
                    {item?.title?.length > 20
                      ? item?.title?.slice(0, 20) + "..."
                      : item?.title}
                  </p>
                </div>
                <Link href={`/products/${item?.id}`}>
                  {" "}
                  <div className="product-card-button-wrapper">
                    <button className="product-card-button">
                      <p className="font-bespak">View</p>
                      <ArrowSmallRightIcon className="h-10 w-10" />
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Products;
