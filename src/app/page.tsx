import HeroSection from "@/components/home/HeroSection";
import ProgrammesSection from "@/components/home/ProgrammesSection";
import SupportPromiseSection from "@/components/home/SupportPromiseSection";
import SubjectsSection from "@/components/home/SubjectsSection";
import ResultsSection from "@/components/home/ResultsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import FAQSection from "@/components/home/FAQSection";
import ConsultationFormSection from "@/components/home/ConsultationFormSection";
import BlogPreviewSection from "@/components/home/BlogPreviewSection";

export default function HomePage() {
  return (
    <main className="w-full">
      <HeroSection />
      <ProgrammesSection />
      <SupportPromiseSection />
      <SubjectsSection />
      <ResultsSection />
      <HowItWorksSection />
      <WhyChooseSection />
      <FAQSection />
      <ConsultationFormSection />
      <BlogPreviewSection />
    </main>
  );
}
