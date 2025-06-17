import { useEffect, useId, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { useOutsideClick } from "@/hooks/use-outside-click"

// Job data structure - easily changeable
const jobsData = [
  {
    title: "Senior Frontend Developer",
    location: "San Francisco, CA",
    description: "Remote • Full-time",
    company: "TechCorp Inc.",
    salary: "$120k - $160k",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center",
    ctaText: "Apply Now",
    ctaLink: "https://example.com/apply",
    content: () => {
      return (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Job Description</h4>
            <p className="text-sm">
              We are looking for a Senior Frontend Developer to join our dynamic team. You will be responsible for
              developing user-facing web applications using modern JavaScript frameworks and ensuring excellent user
              experience.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Requirements</h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>5+ years of experience with React.js</li>
              <li>Strong knowledge of TypeScript</li>
              <li>Experience with modern CSS frameworks</li>
              <li>Knowledge of state management libraries</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Benefits</h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Health, dental, and vision insurance</li>
              <li>401(k) with company matching</li>
              <li>Flexible work arrangements</li>
              <li>Professional development budget</li>
            </ul>
          </div>
        </div>
      )
    },
  },
  {
    title: "Product Manager",
    location: "New York, NY",
    description: "Hybrid • Full-time",
    company: "InnovateLab",
    salary: "$100k - $140k",
    logo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=400&fit=crop&crop=center",
    ctaText: "Apply Now",
    ctaLink: "https://example.com/apply",
    content: () => {
      return (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Job Description</h4>
            <p className="text-sm">
              Join our product team as a Product Manager where you'll drive product strategy, work with cross-functional
              teams, and deliver innovative solutions that delight our customers.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Requirements</h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>3+ years of product management experience</li>
              <li>Strong analytical and problem-solving skills</li>
              <li>Experience with agile methodologies</li>
              <li>Excellent communication skills</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Benefits</h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Comprehensive health coverage</li>
              <li>Stock options</li>
              <li>Unlimited PTO</li>
              <li>Learning and development opportunities</li>
            </ul>
          </div>
        </div>
      )
    },
  },
  {
    title: "UX/UI Designer",
    location: "Austin, TX",
    description: "Remote • Contract",
    company: "DesignStudio Pro",
    salary: "$80k - $110k",
    logo: "https://images.unsplash.com/photo-1560472354-a33c292c1c45?w=400&h=400&fit=crop&crop=center",
    ctaText: "Apply Now",
    ctaLink: "https://example.com/apply",
    content: () => {
      return (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Job Description</h4>
            <p className="text-sm">
              We're seeking a talented UX/UI Designer to create intuitive and visually appealing user interfaces. You'll
              collaborate with product and engineering teams to deliver exceptional user experiences.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Requirements</h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>4+ years of UX/UI design experience</li>
              <li>Proficiency in Figma, Sketch, or Adobe XD</li>
              <li>Strong portfolio showcasing design process</li>
              <li>Understanding of design systems</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Benefits</h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Flexible working hours</li>
              <li>Creative freedom</li>
              <li>Professional development budget</li>
              <li>Modern design tools and equipment</li>
            </ul>
          </div>
        </div>
      )
    },
  },
  {
    title: "Data Scientist",
    location: "Seattle, WA",
    description: "On-site • Full-time",
    company: "DataTech Solutions",
    salary: "$130k - $170k",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center",
    ctaText: "Apply Now",
    ctaLink: "https://example.com/apply",
    content: () => {
      return (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Job Description</h4>
            <p className="text-sm">
              Join our data science team to analyze complex datasets, build predictive models, and drive data-driven
              decision making across the organization.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Requirements</h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>PhD or Master's in Data Science, Statistics, or related field</li>
              <li>Strong Python and R programming skills</li>
              <li>Experience with machine learning frameworks</li>
              <li>Knowledge of SQL and database systems</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Benefits</h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Competitive salary and bonuses</li>
              <li>Research and conference budget</li>
              <li>State-of-the-art computing resources</li>
              <li>Collaborative research environment</li>
            </ul>
          </div>
        </div>
      )
    },
  },
  {
    title: "DevOps Engineer",
    location: "Boston, MA",
    description: "Hybrid • Full-time",
    company: "CloudFirst Inc.",
    salary: "$110k - $150k",
    logo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=400&fit=crop&crop=center",
    ctaText: "Apply Now",
    ctaLink: "https://example.com/apply",
    content: () => {
      return (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Job Description</h4>
            <p className="text-sm">
              We're looking for a DevOps Engineer to help us build and maintain scalable infrastructure, automate
              deployment processes, and ensure high availability of our systems.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Requirements</h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>3+ years of DevOps/SRE experience</li>
              <li>Strong knowledge of AWS/Azure/GCP</li>
              <li>Experience with Docker and Kubernetes</li>
              <li>Proficiency in Infrastructure as Code</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Benefits</h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Cloud certification reimbursement</li>
              <li>Flexible work schedule</li>
              <li>Health and wellness programs</li>
              <li>Technology stipend</li>
            </ul>
          </div>
        </div>
      )
    },
  },
]

export default function JobApplicationCards() {
  const [active, setActive] = useState(null)
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
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">Find Your Dream Job</h1>
          <p className="text-neutral-600 dark:text-neutral-400">Discover amazing opportunities from top companies</p>
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
                className="w-full max-w-[600px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden shadow-2xl"
              >
                <motion.div layoutId={`image-${active.title}-${id}`}>
                  <div className="relative">
                    <img
                      width={200}
                      height={200}
                      src={active.logo || "/placeholder.svg"}
                      alt={active.company}
                      className="w-full h-48 lg:h-48 sm:rounded-tr-lg sm:rounded-tl-lg object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent sm:rounded-tr-lg sm:rounded-tl-lg" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h2 className="text-xl font-bold">{active.company}</h2>
                      <p className="text-sm opacity-90">{active.salary}</p>
                    </div>
                  </div>
                </motion.div>

                <div className="flex-1 overflow-auto">
                  <div className="flex justify-between items-start p-6 border-b border-neutral-200 dark:border-neutral-700">
                    <div className="flex-1">
                      <motion.h3
                        layoutId={`title-${active.title}-${id}`}
                        className="font-bold text-xl text-neutral-800 dark:text-neutral-200 mb-1"
                      >
                        {active.title}
                      </motion.h3>
                      <motion.p
                        layoutId={`description-${active.description}-${id}`}
                        className="text-neutral-600 dark:text-neutral-400 mb-1"
                      >
                        📍 {active.location}
                      </motion.p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-500">{active.description}</p>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <motion.a
                        layoutId={`button-${active.title}-${id}`}
                        href={active.ctaLink}
                        target="_blank"
                        className="px-6 py-3 text-sm rounded-full font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors whitespace-nowrap"
                        rel="noreferrer"
                      >
                        {active.ctaText}
                      </motion.a>
                      <motion.button
                        className="px-6 py-3 text-sm rounded-full font-bold bg-green-500 hover:bg-green-600 text-white transition-colors flex items-center gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          const message = `Hi, I'm interested in the ${active.title} position at ${active.company}`;
                          const whatsappUrl = `https://wa.me/918287080461?text=${encodeURIComponent(message)}`;
                          window.open(whatsappUrl, '_blank');
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                        </svg>
                        WhatsApp
                      </motion.button>
                    </div>
                  </div>

                  <div className="p-6">
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {typeof active.content === "function" ? active.content() : active.content}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>

        <ul className="max-w-4xl mx-auto w-full space-y-4 bg-background">
          {jobsData.map((job, index) => (
            <motion.div
              layoutId={`card-${job.title}-${id}`}
              key={`card-${job.title}-${id}`}
              onClick={() => setActive(job)}
              className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer border border-neutral-200 dark:border-neutral-700 transition-colors"
            >
              <div className="flex gap-4 flex-col md:flex-row flex-1">
                <motion.div layoutId={`image-${job.title}-${id}`}>
                  <img
                    width={100}
                    height={100}
                    src={job.logo || "/placeholder.svg"}
                    alt={job.company}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                </motion.div>
                <div className="flex-1">
                  <motion.h3
                    layoutId={`title-${job.title}-${id}`}
                    className="font-semibold text-lg text-neutral-800 dark:text-neutral-200 mb-1"
                  >
                    {job.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${job.description}-${id}`}
                    className="text-neutral-600 dark:text-neutral-400 mb-1"
                  >
                    {job.company} • 📍 {job.location}
                  </motion.p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-500">
                    {job.description} • {job.salary}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <motion.button
                  layoutId={`button-${job.title}-${id}`}
                  className="px-6 py-2 text-sm rounded-full font-medium bg-neutral-100 hover:bg-blue-600 hover:text-white text-neutral-700 transition-colors"
                >
                  {job.ctaText}
                </motion.button>
                <motion.button
                  className="px-6 py-2 text-sm rounded-full font-medium bg-green-500 hover:bg-green-600 text-white transition-colors flex items-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    const message = `Hi, I'm interested in the ${job.title} position at ${job.company}`;
                    const whatsappUrl = `https://wa.me/918287080461?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  WhatsApp
                </motion.button>
              </div>
            </motion.div>
          ))}
        </ul>
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
