import TopHeader from "@/app/_components/TopHeader";
import Footer from "../_components/Footer";

export default function WebLayout({ children }) {
  return (
    <>
      <TopHeader />
      {children}
      <Footer />
    </>
  );
}
