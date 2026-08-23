import Image from "next/image";
import Navbar from "./components/NavbarNextjs";
import Carousel from "./components/Carousel";
import StatCard from "./components/VVNL";
import Content from "./components/Content";
import Footer from "./components/Footer";
import ServiceCard from "./components/QuickServices";
import CategoryCard from "./components/ConsumerCorner";

export default function Home() {
  return (
    <div>
      <>
        <Navbar />
        <Carousel />
        <Content />
        <StatCard />
        <ServiceCard />
        <CategoryCard />
        <Footer />
      </>
    </div>
  );
}
