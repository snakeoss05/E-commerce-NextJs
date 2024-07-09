import Navbar from "./Navbar/Navbar";
import Footer from "./footer/Footer";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import TopBanner from "./topBanner/TopBanner";
import ShopCart from "./shopCart/ShopCart";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col ">
      <TopBanner />
       <ShopCart />
      <Navbar />
      <Breadcrumb />
      <main className="px-8">{children}</main>
      <Footer />
    </div>
  );
}
