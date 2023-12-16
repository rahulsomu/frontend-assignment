"use client";
import { useEffect, useState } from "react";
import "./productDetails.css";
import axios from "axios";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/20/solid";
import logo from "../../../assets/logo.svg";
import { usePathname } from "next/navigation";
import Hamburger from "../../components/hamburgerMenu/Hamburger";
import Link from "next/link";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import { PropsWithChildren } from "react";

type Props = { options?: EmblaOptionsType } & PropsWithChildren;
type pathType = {
  name: string;
  path: string;
};
type product = {
  title: string;
  thumbnail: string;
  discountPercentage: number;
  rating: number;
  description: string;
  price: number;
  images: string[];
};

const ProductDetails = ({ params }: any) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<product>({
    title: "",
    thumbnail: "",
    discountPercentage: 0,
    rating: 0,
    description: "",
    price: 0,
    images: [],
  });
  const [error, setError] = useState<boolean>(false);
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
  const Slider = ({ children, options }: Props) => {
    const [emblaRef] = useEmblaCarousel({
      slidesToScroll: 1,
      align: "start",
      ...options,
    });

    return (
      <div className="overflow-hidden flex justify-start" ref={emblaRef}>
        <div className="flex gap-8 mx-auto">{children}</div>
      </div>
    );
  };
  const toggleMenu = () => {
    setNavigationMenuOpen(!navigationMenuOpen);
    document.body.style.overflow = "hidden";
  };
  useEffect(() => {
    if (navigationMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [navigationMenuOpen]);
  const fetchProductById = async (id: string) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      const data = await response.data;
      setProduct(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };
  useEffect(() => {
    fetchProductById(params.productId);
  }, []);
  return (
    <main
      className="product-details"
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
      <section className="product-details-banner">
        <div className="product-details-banner-heading">
          <h1 className="font-routhem text-secondary ">Products Details</h1>
        </div>
      </section>
      {loading ? (
        <div className="w-full h-[500px] flex items-center justify-center">
          <p className="font-bespak text-[#ffffff]">Loading Product...</p>
        </div>
      ) : error ? (
        <div className="w-full h-[500px] flex items-center justify-center">
          <p className="font-bespak text-[#ffffff]">Something Went Wrong...</p>
        </div>
      ) : (
        !loading && (
          <section className="product-info">
            <p className="font-bespak text-[35px] text-center text-[#fff]">
              {product?.title}
            </p>
            <div className="product-info-card-wrapper">
              <div className="product-info-card">
                <div className="product-info-card-image-wrapper">
                  <div className="product-info-card-image">
                    <Image
                      src={product?.thumbnail}
                      height={500}
                      width={500}
                      alt={product?.title}
                    />
                  </div>
                </div>
                <div className="product-info-card-details">
                  <p className="product-info-name">{product?.title}</p>
                  <div className="product-info-rating">
                    {[...new Array(Math.floor(product?.rating))].map(() => (
                      <StarIcon className="h-5 w-5 " />
                    ))}
                  </div>
                  <p className="product-info-description">
                    {product?.description}
                  </p>
                  <p className="product-info-price">
                    Price : Rs {product?.price}
                  </p>
                  <p className="product-info-discount">
                    Discount : {Math.ceil(product?.discountPercentage)}%
                  </p>
                </div>
              </div>
            </div>
            <Slider options={{ align: "center" }}>
              {product?.images.map((image: string, index) => (
                <div key={index} className="product-image-wrapper">
                  <div className="product-image">
                    <Image
                      src={image}
                      alt={product?.title}
                      width={400}
                      height={400}
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </section>
        )
      )}
    </main>
  );
};

export default ProductDetails;
