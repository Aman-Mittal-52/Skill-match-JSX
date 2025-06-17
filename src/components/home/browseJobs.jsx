import { useEffect, useId, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { useOutsideClick } from "@/hooks/use-outside-click"
import { BriefcaseBusiness, LayoutGrid, LayoutList } from "lucide-react"

// Job images for job listings
const jobimages = [
  "https://images.unsplash.com/photo-1581091012184-7d81e6c98c5f?w=400&h=400&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1605902711622-cfb43c44367e?w=400&h=400&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1613061372759-8b8db884bda5?w=400&h=400&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=400&h=400&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1590608897129-79da98d159d4?w=400&h=400&fit=crop&crop=center"
];

const jobsData = [
  {
    title: "Part-Time React Developer",
    location: "Remote",
    description: "Remote • Part-time",
    company: "CodeFlex",
    salary: "$40/hr - $60/hr",
    logo: jobimages[0],
    ctaText: "Apply Now",
    ctaLink: "https://example.com/apply",
    content: () => {
      return (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Job Description</h4>
            <p className="text-sm">
              Seeking a part-time React developer to assist with building new features and maintaining an existing frontend application.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Requirements</h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>2+ years of React experience</li>
              <li>Basic knowledge of TypeScript</li>
              <li>Responsive UI development</li>
              <li>Comfortable with Git and GitHub</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Benefits</h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Work from anywhere</li>
              <li>Flexible hours</li>
              <li>Weekly payouts</li>
              <li>Collaborative team</li>
            </ul>
          </div>
        </div>
      );
    },
  },
  {
    title: "Freelance UI/UX Designer",
    location: "Remote",
    description: "Remote • Part-time",
    company: "DesignLoop",
    salary: "$30/hr - $50/hr",
    logo: jobimages[1],
    ctaText: "Apply Now",
    ctaLink: "https://example.com/apply",
    content: () => {
      return (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Job Description</h4>
            <p className="text-sm">
              Looking for a freelance UI/UX designer to help revamp the mobile interface of our e-commerce platform.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Requirements</h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Experience with Figma or Adobe XD</li>
              <li>Strong understanding of mobile-first design</li>
              <li>Portfolio of previous mobile UI work</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Benefits</h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Remote contract work</li>
              <li>Flexible hours</li>
              <li>Potential for recurring projects</li>
            </ul>
          </div>
        </div>
      );
    },
  },
  {
    title: "Junior QA Tester (Part-Time)",
    location: "Bangalore, India",
    description: "Hybrid • Part-time",
    company: "Testify Co.",
    salary: "$20/hr - $35/hr",
    logo: jobimages[2],
    ctaText: "Apply Now",
    ctaLink: "https://example.com/apply",
    content: () => {
      return (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Job Description</h4>
            <p className="text-sm">
              Support our QA team with manual testing tasks and test case documentation.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Requirements</h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Good communication skills</li>
              <li>Detail-oriented mindset</li>
              <li>Basic understanding of QA practices</li>
              <li>Availability during IST evening hours</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Benefits</h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Mentorship and guidance</li>
              <li>Performance bonuses</li>
              <li>Remote option available</li>
            </ul>
          </div>
        </div>
      );
    },
  },
  {
    title: "Part-Time WordPress Developer",
    location: "Remote",
    description: "Remote • Freelance",
    company: "WP Wizards",
    salary: "$25/hr - $45/hr",
    logo: jobimages[3],
    ctaText: "Apply Now",
    ctaLink: "https://example.com/apply",
    content: () => {
      return (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Job Description</h4>
            <p className="text-sm">
              Maintain and enhance client WordPress sites. Should be comfortable with themes and custom plugins.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Requirements</h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Experience with WordPress & WooCommerce</li>
              <li>Knowledge of PHP and JavaScript</li>
              <li>Ability to work independently</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Benefits</h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Project-based payments</li>
              <li>Flexible schedule</li>
              <li>Fully remote work</li>
            </ul>
          </div>
        </div>
      );
    },
  },
  {
    title: "Tech Support Executive (Evenings)",
    location: "Mumbai, India",
    description: "On-site • Part-time",
    company: "HelpTech Solutions",
    salary: "$18/hr - $25/hr",
    logo: jobimages[4],
    ctaText: "Apply Now",
    ctaLink: "https://example.com/apply",
    content: () => {
      return (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Job Description</h4>
            <p className="text-sm">
              Provide customer support and technical troubleshooting over chat and phone during evening hours.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Requirements</h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Strong communication in English and Hindi</li>
              <li>Customer-first mindset</li>
              <li>Basic tech troubleshooting skills</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Benefits</h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>On-site refreshments and travel support</li>
              <li>Evening shift allowance</li>
              <li>Weekly incentives</li>
            </ul>
          </div>
        </div>
      );
    },
  },
];

export default function JobApplicationCards() {
  const [active, setActive] = useState(null)
  const [isTwoColumns, setIsTwoColumns] = useState(true)
  const ref = useRef(null)
  const id = useId()

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false)
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [active])

  useOutsideClick(ref, () => setActive(null))

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">Find Your Dream Job</h1>
            <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400">Discover amazing opportunities from top companies</p>
          </div>
          
          <div className="hidden md:flex justify-center w-full md:w-auto">
            <button
              onClick={() => setIsTwoColumns(!isTwoColumns)}
              className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-sm md:text-base"
            >
              {isTwoColumns ? (
                <>
                  <LayoutGrid className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Switch to List</span>
                </>
              ) : (
                <>
                  <LayoutList className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Switch to Grid</span>
                </>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {active && typeof active === "object" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 h-full w-full z-10"
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {active && typeof active === "object" ? (
            <div className="fixed inset-0 grid place-items-center z-[100] p-4">
              <motion.button
                key={`button-${active.title}-${id}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6 z-10"
                onClick={() => setActive(null)}
              >
                <CloseIcon />
              </motion.button>
              <motion.div
                layoutId={`card-${active.title}-${id}`}
                ref={ref}
                className="w-full max-w-[600px] h-[85vh] md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
              >
                <motion.div layoutId={`image-${active.title}-${id}`}>
                  <div className="relative">
                    <div className="w-full h-32 md:h-48 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center rounded-t-2xl md:rounded-t-3xl">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-600 dark:text-neutral-400">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-2xl md:rounded-t-3xl" />
                    <div className="absolute bottom-3 md:bottom-4 left-4 text-white">
                      <h2 className="text-lg md:text-xl font-bold">{active.company}</h2>
                      <p className="text-xs md:text-sm opacity-90">{active.salary}</p>
                    </div>
                  </div>
                </motion.div>

                <div className="flex-1 overflow-auto">
                  <div className="flex flex-col md:flex-row justify-between items-start p-4 md:p-6 border-b border-neutral-200 dark:border-neutral-700">
                    <div className="flex-1 mb-3 md:mb-0">
                      <motion.h3
                        layoutId={`title-${active.title}-${id}`}
                        className="font-bold text-lg md:text-xl text-neutral-800 dark:text-neutral-200 mb-1"
                      >
                        {active.title}
                      </motion.h3>
                      <motion.p
                        layoutId={`description-${active.description}-${id}`}
                        className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mb-1"
                      >
                        📍 {active.location}
                      </motion.p>
                      <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-500">{active.description}</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                      <motion.a
                        layoutId={`button-${active.title}-${id}`}
                        href={active.ctaLink}
                        target="_blank"
                        className="px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm rounded-full font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors text-center"
                        rel="noreferrer"
                      >
                        {active.ctaText}
                      </motion.a>
                      <motion.button
                        className="px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm rounded-full font-bold bg-green-500 hover:bg-green-600 text-white transition-colors flex items-center justify-center gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          const message = `Hi, I'm interested in the ${active.title} position at ${active.company}`;
                          const whatsappUrl = `https://wa.me/918287080461?text=${encodeURIComponent(message)}`;
                          window.open(whatsappUrl, '_blank');
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                        </svg>
                        WhatsApp
                      </motion.button>
                    </div>
                  </div>

                  <div className="p-4 md:p-6">
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm md:text-base text-neutral-600 dark:text-neutral-400"
                    >
                      {typeof active.content === "function" ? active.content() : active.content}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>

        <div className={`max-w-7xl mx-auto w-full grid gap-4 bg-background ${isTwoColumns ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
          {jobsData.map((job, index) => (
            <motion.div
              layoutId={`card-${job.title}-${id}`}
              key={`card-${job.title}-${id}`}
              onClick={() => setActive(job)}
              className="p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer border border-neutral-200 dark:border-neutral-700 transition-colors"
            >
              <div className="flex gap-3 md:gap-4 flex-col md:flex-row flex-1">
                <motion.div layoutId={`image-${job.title}-${id}`}>
                  <div className="h-14 w-14 md:h-16 md:w-16 rounded-lg flex items-center justify-center">
                    <BriefcaseBusiness className="w-20 h-20 md:w-24 md:h-24"/>
                  </div>
                </motion.div>
                <div className="flex-1">
                  <motion.h3
                    layoutId={`title-${job.title}-${id}`}
                    className="font-semibold text-base md:text-lg text-neutral-800 dark:text-neutral-200 mb-1"
                  >
                    {job.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${job.description}-${id}`}
                    className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mb-1"
                  >
                    {job.company} • 📍 {job.location}
                  </motion.p>
                  <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-500">
                    {job.description} • {job.salary}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-3 md:mt-0 w-full md:w-auto">
                <motion.button
                  layoutId={`button-${job.title}-${id}`}
                  className="flex-1 md:flex-none px-4 md:px-6 py-2 text-xs md:text-sm rounded-full font-medium bg-neutral-100 hover:bg-blue-600 hover:text-white text-neutral-700 transition-colors"
                >
                  {job.ctaText}
                </motion.button>
                <motion.button
                  className="flex-1 md:flex-none px-4 md:px-6 py-2 text-xs md:text-sm rounded-full font-medium bg-green-500 hover:bg-green-600 text-white transition-colors flex items-center justify-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    const message = `Hi, I'm interested in the ${job.title} position at ${job.company}`;
                    const whatsappUrl = `https://wa.me/918287080461?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="hidden md:block">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  WhatsApp
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  )
}
