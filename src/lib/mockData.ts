
import { Framework, Question } from "./types";

export const mockFrameworks: Framework[] = [
  { id: "f1", name: "IFC Listed Companies", questionCount: 42 },
  { id: "f2", name: "GRI Standards", questionCount: 36 },
  { id: "f3", name: "TCFD", questionCount: 28 },
  { id: "f4", name: "SASB", questionCount: 45 },
  { id: "f5", name: "UN Global Compact", questionCount: 31 },
  { id: "f6", name: "Integrated Reporting", questionCount: 24 },
  { id: "f7", name: "EU CSRD", questionCount: 38 },
  { id: "f8", name: "Science Based Targets", questionCount: 19 },
  { id: "f9", name: "ISO 26000", questionCount: 33 },
  { id: "f10", name: "SDG Impact Standards", questionCount: 29 },
  { id: "f11", name: "B Corp Assessment", questionCount: 41 },
  { id: "f12", name: "IIRC Framework", questionCount: 22 }
];

// Emojis for question categories
const emojis = ["🌟", "🔄", "🌱", "🌍", "⚡", "💼", "🔍", "🛡️", "🤝", "📊", "⚖️", "🌐"];

// Generate a mock question based on selected frameworks
export const generateMockQuestions = (count: number, frameworks: string[]): Question[] => {
  if (frameworks.length < 2) {
    return [];
  }
  
  const questions: Question[] = [];
  
  for (let i = 0; i < count; i++) {
    // Select two random frameworks from the selected ones
    const selectedFrameworkIndices = getTwoRandomIndices(frameworks.length);
    const framework1 = frameworks[selectedFrameworkIndices[0]];
    const framework2 = frameworks[selectedFrameworkIndices[1]];
    
    const originalQuestion1 = getQuestionForFramework(framework1);
    const originalQuestion2 = getQuestionForFramework(framework2);
    
    // Generate merged question
    const mergedQuestion = mergeQuestions(originalQuestion1, originalQuestion2);
    
    questions.push({
      id: `q${i + 1}`,
      text: mergedQuestion,
      frameworks: [framework1, framework2],
      originalQuestions: [
        { text: originalQuestion1, framework: framework1 },
        { text: originalQuestion2, framework: framework2 }
      ],
      emoji: emojis[Math.floor(Math.random() * emojis.length)]
    });
  }
  
  return questions;
};

// Get two random indices from an array length
const getTwoRandomIndices = (max: number): [number, number] => {
  const first = Math.floor(Math.random() * max);
  let second = Math.floor(Math.random() * max);
  
  // Ensure second is different from first
  while (second === first && max > 1) {
    second = Math.floor(Math.random() * max);
  }
  
  return [first, second];
};

// Template questions for each framework
const frameworkQuestions: Record<string, string[]> = {
  "IFC Listed Companies": [
    "Does the board periodically review the risk management systems?",
    "Is there a policy for related party transactions?",
    "How does the company ensure transparent communication with shareholders?"
  ],
  "GRI Standards": [
    "How does the organization manage its environmental impacts?",
    "What are the organization's practices regarding waste disposal?",
    "How is the organization addressing climate change impacts?"
  ],
  "TCFD": [
    "How does the organization assess climate-related risks?",
    "What metrics are used to measure climate-related impacts?",
    "How is climate governance integrated into the board?"
  ],
  "SASB": [
    "What are your material sustainability topics?",
    "How do you measure resource efficiency?",
    "What processes exist for data security management?"
  ],
  "UN Global Compact": [
    "How does the organization uphold human rights principles?",
    "What anti-corruption measures are in place?",
    "How does the company promote environmental responsibility?"
  ],
  "Integrated Reporting": [
    "How does the organization create value over time?",
    "What is the organization's business model?",
    "How does the company allocate resources strategically?"
  ],
  "EU CSRD": [
    "What is the company's double materiality assessment process?",
    "How does the company report on sustainability risks?",
    "What sustainability due diligence processes are in place?"
  ],
  "Science Based Targets": [
    "How are your emission reduction targets aligned with science?",
    "What is your decarbonization strategy?",
    "How do you monitor progress against your targets?"
  ],
  "ISO 26000": [
    "How is social responsibility integrated into the organization?",
    "What stakeholder engagement practices are followed?",
    "How does the organization promote ethical behavior?"
  ],
  "SDG Impact Standards": [
    "How do your operations contribute to the SDGs?",
    "What methodology is used to measure SDG impact?",
    "How are SDG considerations integrated into decision-making?"
  ],
  "B Corp Assessment": [
    "How does your governance structure account for stakeholders?",
    "What worker benefits do you provide beyond legal requirements?",
    "How do you measure your environmental footprint?"
  ],
  "IIRC Framework": [
    "How do you report on the six capitals?",
    "What is your value creation process?",
    "How do you integrate financial and non-financial information?"
  ]
};

// Get a random question for a framework
const getQuestionForFramework = (framework: string): string => {
  const questions = frameworkQuestions[framework] || ["How does your organization approach sustainability?"];
  return questions[Math.floor(Math.random() * questions.length)];
};

// Merge two questions into a new enhanced question
const mergeQuestions = (q1: string, q2: string): string => {
  const enhancedQuestions = [
    `${randomEmoji()} How has your organization integrated approaches to both "${q1.replace(/\?$/, "")}" and "${q2.replace(/\?$/, "")}" in a holistic management system?`,
    `${randomEmoji()} Beyond conventional practices, what innovative strategies have you developed to address both "${q1.replace(/\?$/, "")}" and "${q2.replace(/\?$/, "")}"?`,
    `${randomEmoji()} What transformative policies has your organization implemented that simultaneously address "${q1.replace(/\?$/, "")}" and "${q2.replace(/\?$/, "")}"?`,
    `${randomEmoji()} How does your leadership team ensure alignment between practices for "${q1.replace(/\?$/, "")}" and "${q2.replace(/\?$/, "")}"?`,
    `${randomEmoji()} What metrics and KPIs have you developed to track performance on both "${q1.replace(/\?$/, "")}" and "${q2.replace(/\?$/, "")}"?`
  ];
  
  return enhancedQuestions[Math.floor(Math.random() * enhancedQuestions.length)];
};

// Get a random emoji for prefixing questions
const randomEmoji = (): string => {
  return emojis[Math.floor(Math.random() * emojis.length)];
};
