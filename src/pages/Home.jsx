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

      <div className="relative text-[120px] text-red-700 font-bold w-fit leading-none">
        <span className="text-transparent bg-clip-text striped">
          Skill Match
        </span>
      </div>

      <Footer />
    </div>
  );
}


