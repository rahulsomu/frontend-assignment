"use client";
import "./footer.css";
import logo from "../../../assets/logo.svg";
import shape from "../../../assets/Shape.png";
import backtotop from "../../../assets/bacttotop.svg";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative">
      <button
        className="absolute -top-[40px] z-[99999] right-10 md:top-[160px] "
        onClick={scrollToTop}
      >
        <Image
          src={backtotop}
          height={80}
          width={80}
          alt="back to top button"
        />
      </button>
      <div className="footer">
        <div className="footer-content">
          <div className="footer-content-grid">
            <div className="footer-content-about">
              <Image src={logo} width={120} height={300} alt="company logo" />
              <p>
                {`lOGO is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when`}
              </p>
            </div>
            <div className="footer-content-links">
              <p className="font-routhem">USEFULL LINKS</p>
              <Link href="/">Home</Link>
              <Link href="/products">Products</Link>
              <Link href="/">about us</Link>
              <Link href="/">contact us</Link>
            </div>
            <div className="footer-content-social">
              <div className="footer-content-social-shape">
                <Image src={shape} alt="shape" height={100} width={200} />
                <p className="font-routhem">Follow us on</p>
              </div>

              <div className="footer-content-social-icons">
                <Link href="/">
                  <FaFacebook />
                </Link>
                <Link href="/">
                  <FaInstagram />
                </Link>
                <Link href="/">
                  <FaTwitter />
                </Link>
                <Link href="/">
                  <FaYoutube />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>COPYRIGT 2021 lOGO ALL RIGHT RESERVED</p>
      </div>
    </div>
  );
};

export default Footer;
