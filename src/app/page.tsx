import HeroSection from "@/components/home/HeroSection";
import ProgrammesSection from "@/components/home/ProgrammesSection";
import SubjectsSection from "@/components/home/SubjectsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import ResultsSection from "@/components/home/ResultsSection";
import SupportPromiseSection from "@/components/home/SupportPromiseSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import FAQSection from "@/components/home/FAQSection";
import ConsultationFormSection from "@/components/home/ConsultationFormSection";
import BlogPreviewSection from "@/components/home/BlogPreviewSection";
import FooterSection from "@/components/layout/FooterSection";

export default function HomePage() {
  return (
    <main className="w-full">
      <HeroSection />
      <ProgrammesSection />
      <SubjectsSection />
      <HowItWorksSection />
      <ResultsSection />
      <SupportPromiseSection />
      <WhyChooseSection />

      {/* ✅ Requested: FAQ then Consultation Form then Footer */}
      <FAQSection />
      <ConsultationFormSection />
      <BlogPreviewSection />
      <FooterSection />
    </main>
  );
}
