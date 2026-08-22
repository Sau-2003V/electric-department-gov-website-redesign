import Image from "next/image";
import Navbar from "./components/NavbarNextjs";
import Carousel from "./components/Carousel";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Boxes from "./components/Boxes";

export default function Home() {
  return (
    <div>
      <>
        <Navbar />
        <Carousel />
        <Boxes />
        <Content />
        <Footer />
      </>
    </div>
  );
}
