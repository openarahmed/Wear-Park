import HeroSlider from "./Components/HeroSection/Slider";
import ShopByCategory from "./Components/ShopByCategory/ShopByCategory";
// import FeatureSection from "./Components/Features/Features";
import TrendyCollection from "./Components/TrendyCollection/TrendyCollection";
import TheBrand from "./Components/TheBrand/TheBrand";
import Carousel from "./Components/Curousal/Curousal";
// import BestOfCollaborations from "./Components/BestOfCollaborations/BestOfCollaborations";
// import BackgroundVideo from "./Components/BackgroundVideo/BackroundVideo";
// import Testimonial from "./Components/Testimonial/Testimonial";
import BlogSection from "./Components/Blogs/Blogs";
import Gallery from "./Components/Gallary/Gallary";
import InfoSection from "./Components/InfoSection/InfoSection";
import Manufacturing from "./Components/Manufacturing/Manufacturing";

export default function Home() {
  return (
    <div className="">
      <HeroSlider></HeroSlider>
      <ShopByCategory></ShopByCategory>
      <Manufacturing></Manufacturing>
      {/* <FeatureSection></FeatureSection> */}
      <Carousel></Carousel>
      <TrendyCollection></TrendyCollection>
      <TheBrand></TheBrand>
      <InfoSection></InfoSection>
      {/* <BestOfCollaborations></BestOfCollaborations> */}
      {/* <BackgroundVideo></BackgroundVideo> */}
      {/* <Testimonial></Testimonial> */}
      <Gallery></Gallery>
      <BlogSection></BlogSection>
    </div>
  );
}
