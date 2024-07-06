import Banner from "./client/components/Home/banners/Banner";
import BestSales from "./client/components/Home/bestSales/BestSales";
import FlashSales from "./client/components/Home/flashSales/FlashSales";
import Hearder from "./client/components/Home/header/Hearder";
import SingleProductMusic from "./client/components/Home/musicProduct/SingleProductMusic";

export default function Home() {
  return (
    <div className="px-0 lg:px-24">
      <Hearder />
      <FlashSales />
      <SingleProductMusic />
      <BestSales />

      <Banner />
    </div>
  );
}
