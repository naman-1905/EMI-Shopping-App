import ImageSlider from "./components/Banner";
import MobileBottomBar from "./components/BottomBar";
import Navbar from "./components/TopBar";


export default function Home() {
  return (
    <div>
      <Navbar/>
      <ImageSlider/>
      <MobileBottomBar/>
    </div>
  );
}
