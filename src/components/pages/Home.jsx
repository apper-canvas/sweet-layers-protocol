import Hero from "@/components/organisms/Hero";
import FeaturedCakes from "@/components/organisms/FeaturedCakes";
import AboutPreview from "@/components/organisms/AboutPreview";
import ContactInfo from "@/components/organisms/ContactInfo";

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedCakes />
      <AboutPreview />
      <ContactInfo />
    </div>
  );
};

export default Home;