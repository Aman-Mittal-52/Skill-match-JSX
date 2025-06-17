import CompanyMarquee from "../components/home/LogosMarquee";
import HiredMarquee from "../components/home/HiredMarquee";
import HeroSection from "../components/home/HeroSection";
import JobApplicationCards from "../components/home/browseJobs";
import Footer from "../components/home/Footer";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <JobApplicationCards />
      <CompanyMarquee />
      <HiredMarquee />
      <Footer />
    </div>
  );
}


