import Hero from "../components/Hero";
import About from "../components/about/About";
import FasilitasSection from "@/components/fasilitas/page";
import VisiMisiSection from "@/components/visimisi/page";
import LombaSection from "@/components/lomba/page";
import PendaftaranEventSection from "@/components/pendaftarevent/page";

export default function Home() {
  return (
    <div className="main-heading">
      <Hero/>
      <About/>
      <FasilitasSection/>
      <VisiMisiSection/>
      <LombaSection/>
      <PendaftaranEventSection/>
    </div>
  );
}