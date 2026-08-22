import Image from "next/image";
import Navbar from "./components/NavbarNextjs"
import Carousel from "./components/Carousel"
import Content from "./components/Content"
import Footer from "./components/Footer"

export default function Home() {
  return <div>
  <>
    <Navbar/>
    <Carousel/>
    <Content/>
    <Footer/>
  </>
  </div>
}
