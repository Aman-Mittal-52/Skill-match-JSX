import CompanyMarquee from "../components/home/LogosMarquee";
import HiredMarquee from "../components/home/HiredMarquee";
import HeroSection from "../components/home/HeroSection";
import JobApplicationCards from "../components/home/browseJobs";
import Footer from "../components/home/Footer";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Skill Match | Discover Part-Time Tech Jobs</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Find flexible part-time tech roles in development, design, QA, and more."
        />
        <meta name="keywords" content="part-time tech jobs, freelance, React, remote" />
        <meta property="og:title" content="Skill Match - Flexible Tech Jobs" />
        <meta property="og:description" content="Explore remote and part-time jobs in tech." />
      </Helmet>

      <HeroSection />
      <JobApplicationCards />
      <CompanyMarquee />
      <HiredMarquee />
      <Footer />
    </div>
  );
}


