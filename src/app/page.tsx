"use client";
import { ArrowSmallRightIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartFilled, StarIcon } from "@heroicons/react/20/solid";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import { PropsWithChildren } from "react";
import "./home.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import logo from "../assets/logo.svg";
import { usePathname } from "next/navigation";
import Hamburger from "../app/components/hamburgerMenu/Hamburger";

type Props = { options?: EmblaOptionsType } & PropsWithChildren;
type pathType = {
  name: string;
  path: string;
};
export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const [sliderItems, setSliderItems] = useState([]);
  const [navigationMenuOpen, setNavigationMenuOpen] = useState<boolean>(false);
  const [count, setCount] = useState(0);
  let heading = "Logo Electronics".split("");
  const [headingText, setHeadingText] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const id = setTimeout(() => {
      if (count < heading.length) {
        setHeadingText(headingText + heading[count]);
        setCount((count) => count + 1);
      } else {
        setHeadingText(" ");
        setCount(0);
      }
    }, 400);

    return () => clearTimeout(id);
  }, [count]);
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
  const Slider = ({ children, options }: Props) => {
    const [emblaRef] = useEmblaCarousel({
      slidesToScroll: 1,
      align: "start",
      ...options,
    });

    return (
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-8">{children}</div>
      </div>
    );
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
    const getAllProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://dummyjson.com/products ");
        const data = await response.data;
        setProducts(data.products);
        setSliderItems(data.products);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    };
    getAllProducts();
  }, []);
  return (
    <main
      className="home"
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
      <section className="home-banner">
        <div className="home-banner-heading">
          <h1
            className="font-routhem text-secondary text-left"
            style={{
              WebkitTextStroke:
                headingText.length == heading.length + 1 ? "1px yellow" : "",
            }}
          >
            {`${headingText}`}
          </h1>
          <p className="font-bespak">The Techies you Love</p>
          <Link href="/products">
            <button>
              <div className="button-bg"></div>
              <span className="font-bespak">View all products</span>
              <div className="icon-container">
                <ArrowSmallRightIcon className="h-8 w-8" />
              </div>
            </button>
          </Link>
        </div>
      </section>
      <section className="product-slider">
        {/* <Slider className="product-slider-container"> */}
        <Slider options={{ align: "center" }}>
          {sliderItems?.map((item: any, index) => (
            <div key={index} className="product-slider-product-wrapper">
              <div className="product-slider-product">
                <div className="product-slider-product-image">
                  <Image
                    src={item?.thumbnail}
                    height={300}
                    width={300}
                    alt={item?.title}
                  ></Image>
                </div>
                <div className="product-slider-product-info">
                  <p className="font-bold">
                    {" "}
                    {item?.brand?.length > 20
                      ? item?.brand?.slice(0, 20) + "..."
                      : item?.brand}
                  </p>
                  <p>
                    {" "}
                    {item?.title?.length > 20
                      ? item?.title?.slice(0, 20) + "..."
                      : item?.title}
                  </p>
                  <p className="font-bold">Rs. {item?.price}</p>
                  <div className="product-slider-product-info-rating">
                    {[...new Array(Math.floor(item?.rating))].map(
                      (star, index) => (
                        <StarIcon key={index} className="h-5 w-5" />
                      )
                    )}
                    <p className="text-[#676767] ml-2">(12)</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>
      <section className="products-section">
        <div className="product-section-heading">
          <h1 className="font-routhem">Products</h1>
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
            {products?.slice(0, 6).map((item: any, index) => (
              <div className="product-card" key={item?.id}>
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
}
