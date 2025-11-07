import ImageSlider from "./components/Banner";
import MobileBottomBar from "./components/BottomBar";
import CategoryCircles from "./components/CategoryCircles";
import Navbar from "./components/TopBar";


export default function Home() {
  return (
    <div>
      <Navbar/>
      <ImageSlider/>
      <CategoryCircles/>
      <MobileBottomBar/>
    </div>
  );
}
