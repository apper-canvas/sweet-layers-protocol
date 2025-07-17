import Hero from "@/components/organisms/Hero";
import FeaturedCakes from "@/components/organisms/FeaturedCakes";
import AboutPreview from "@/components/organisms/AboutPreview";
import CustomerReviews from "@/components/organisms/CustomerReviews";
import ContactInfo from "@/components/organisms/ContactInfo";
const Home = () => {
  return (
    <div>
      <Hero />
<FeaturedCakes />
      <AboutPreview />
      <CustomerReviews />
      <ContactInfo />
    </div>
  );
};

export default Home;