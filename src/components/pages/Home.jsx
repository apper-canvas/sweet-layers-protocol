import Hero from "@/components/organisms/Hero";
import SpecialOffers from "@/components/organisms/SpecialOffers";
import FeaturedCakes from "@/components/organisms/FeaturedCakes";
import AboutPreview from "@/components/organisms/AboutPreview";
import CustomerReviews from "@/components/organisms/CustomerReviews";
import ContactInfo from "@/components/organisms/ContactInfo";
const Home = () => {
  return (
    <div>
<Hero />
      <SpecialOffers />
      <FeaturedCakes />
      <AboutPreview />
      <CustomerReviews />
      <ContactInfo />
    </div>
  );
};

export default Home;