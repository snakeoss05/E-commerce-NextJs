import Navbar from "./Navbar/Navbar";
import Footer from "./footer/Footer";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col ">
      <div className="bg-black px-4 py-3 text-white">
        <p className="text-center text-sm font-medium">
          Love Alpine JS?
          <a href="#" className="inline-block underline">
            Check out this new course!
          </a>
        </p>
      </div>
      <Navbar />
      <Breadcrumb />
      <main className="px-8">{children}</main>
      <Footer />
    </div>
  );
}
