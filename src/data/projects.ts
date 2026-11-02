export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  github: string;
  demo?: string;
  image: string;
  status: "Completed" | "In Progress";
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "ai-phishing-url-detector",
    title: "AI Phishing URL Detector",
    category: "AI / Cybersecurity",
    description:
      "Machine learning system for identifying phishing and legitimate URLs using engineered URL features.",
    technologies: [
      "Python",
      "Scikit-learn",
      "Machine Learning",
      "FastAPI",
    ],
    github: "YOUR_PHISHING_PROJECT_REPOSITORY",
    image: "/images/projects/phishing.png",
    status: "In Progress",
    featured: true,
  },
  {
    slug: "tinygpt",
    title: "TinyGPT-100K",
    category: "Artificial Intelligence",
    description:
      "A small GPT-style transformer built using PyTorch to understand tokenization, attention and language model training.",
    technologies: [
      "Python",
      "PyTorch",
      "Transformers",
      "Deep Learning",
    ],
    github: "YOUR_TINYGPT_REPOSITORY",
    image: "/images/projects/tinygpt.png",
    status: "Completed",
    featured: true,
  },
  {
    slug: "prelight",
    title: "Prelight",
    category: "AI Infrastructure",
    description:
      "An AI workload experimentation project involving inference benchmarking and model evaluation.",
    technologies: [
      "Python",
      "NVIDIA Nemotron",
      "Nebius",
      "LLM Evaluation",
    ],
    github: "YOUR_PRELIGHT_REPOSITORY",
    image: "/images/projects/prelight.png",
    status: "In Progress",
    featured: true,
  },
  {
    slug: "farmhub",
    title: "FarmHub",
    category: "Full Stack Development",
    description:
      "Farm produce management application for inventory, categories, stock updates and sales tracking.",
    technologies: [
      "React",
      "Bootstrap",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    github: "YOUR_FARMHUB_REPOSITORY",
    image: "/images/projects/farmhub.png",
    status: "In Progress",
    featured: false,
  },
];