import NewCollection from "./client/components/NewCollection/NewCollection";
import Banner from "./client/components/banners/Banner";
import BestSales from "./client/components/bestSales/BestSales";
import FlashSales from "./client/components/flashSales/FlashSales";
import Hearder from "./client/components/header/Hearder";
import SingleProductMusic from "./client/components/musicProduct/SingleProductMusic";

export default function Home() {
  return (
    <div className="px-0 lg:px-24">
      <Hearder />
      <FlashSales />
      <BestSales />
      <SingleProductMusic />
      <NewCollection />
      <Banner />
    </div>
  );
}
