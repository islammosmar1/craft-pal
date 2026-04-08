import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServiceCategories from "@/components/ServiceCategories";
import FeaturedCraftsmen from "@/components/FeaturedCraftsmen";
import WhyUs from "@/components/WhyUs";
import CTASection from "@/components/CTASection";
import StatsSection from "@/components/StatsSection";
import Footer from "@/components/Footer";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-cairo">
      <Navbar />
      <HeroSection />
      <ScrollAnimationWrapper>
        <StatsSection />
      </ScrollAnimationWrapper>
      <ScrollAnimationWrapper delay={100}>
        <ServiceCategories />
      </ScrollAnimationWrapper>
      <ScrollAnimationWrapper delay={100}>
        <FeaturedCraftsmen />
      </ScrollAnimationWrapper>
      <ScrollAnimationWrapper delay={100}>
        <WhyUs />
      </ScrollAnimationWrapper>
      <ScrollAnimationWrapper>
        <CTASection />
      </ScrollAnimationWrapper>
      <Footer />
    </div>
  );
};

export default Index;
