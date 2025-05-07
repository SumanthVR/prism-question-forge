
import { Framework, Question, ApiQuestion } from "./types";

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
  const apiQuestions = simulateApiResponse(count, frameworks);
  
  // Convert API response format to our internal format
  apiQuestions.forEach((apiQuestion, index) => {
    // We need to have at least two frameworks to merge questions
    const framework1 = apiQuestion.framework;
    const framework2 = frameworks.find(f => f !== framework1) || frameworks[0];
    
    // Extract emoji from the text if present
    let emoji = "";
    const emojiMatch = apiQuestion.text.match(/^(\s*[\u{1F300}-\u{1FAD6}])/u);
    if (emojiMatch) {
      emoji = emojiMatch[0].trim();
    } else {
      emoji = emojis[Math.floor(Math.random() * emojis.length)];
    }
    
    questions.push({
      id: `q${index + 1}`,
      text: apiQuestion.text,
      frameworks: [framework1, framework2],
      originalQuestions: [
        { 
          text: apiQuestion.originalText, 
          framework: framework1,
          category: apiQuestion.category,
          ref: apiQuestion.ref
        },
        { 
          text: getQuestionForFramework(framework2), 
          framework: framework2 
        }
      ],
      emoji: emoji,
      category: apiQuestion.category,
      ref: apiQuestion.ref
    });
  });
  
  return questions;
};

// Simulate the API response from your server
function simulateApiResponse(count: number, frameworks: string[]): ApiQuestion[] {
  const questions: ApiQuestion[] = [];
  
  // If no frameworks are selected, return empty array
  if (frameworks.length < 2) {
    return questions;
  }
  
  // Strategic questions templates that simulate the server's advanced generation
  const strategicTemplates = [
    "🧠 Strategic Depth: How has your organization fundamentally rethought its approach to {topic} to create sustainable competitive differentiation?",
    "📊 Impact Intelligence: How have you evolved your {topic} measurement from isolated metrics to an integrated intelligence system?",
    "🌐 Systemic Integration: How have you embedded {topic} so deeply into your organizational DNA that it shapes every strategic decision?",
    "📈 Value Creation: How have you transformed your approach to {topic} from a compliance exercise to a value creation engine?",
    "🔄 Dynamic Adaptation: What innovative governance structures have you developed to make decisions about {topic} with the agility required today?",
    "🛡️ Beyond Compliance: How have you transformed your approach to {topic} from regulatory compliance into a source of competitive advantage?"
  ];
  
  for (let i = 0; i < count; i++) {
    // Select a random framework from the provided list
    const randomFrameworkIndex = Math.floor(Math.random() * frameworks.length);
    const framework = frameworks[randomFrameworkIndex];
    
    // Generate a question for the framework
    const originalQuestion = getQuestionForFramework(framework);
    const topic = extractTopic(originalQuestion);
    
    // Select a random template and replace {topic}
    const template = strategicTemplates[Math.floor(Math.random() * strategicTemplates.length)];
    const generatedQuestion = template.replace("{topic}", topic);
    
    questions.push({
      text: generatedQuestion,
      originalText: originalQuestion,
      framework: framework,
      category: getCategoryForFramework(framework),
      ref: `${framework}-${i+1}`,
      generated: true,
      timestamp: new Date().toISOString()
    });
  }
  
  return questions;
}

// Extract a topic from the question (simplified version of your server's logic)
function extractTopic(question: string): string {
  // Remove common question prefixes
  let cleanedText = question.toLowerCase()
    .replace(/does the entity|does the company|has the entity|has your company|is your company|the entity|your company/g, '')
    .replace(/\?.*$/, '')
    .replace(/;$/, '')
    .replace(/^\s*(have|has|is|are|does|did|will|would|can|could|should|must)\s+/, '')
    .trim();
  
  // If the cleaned text is too short, return a simplified version
  if (cleanedText.length < 10) {
    return "sustainability reporting";
  }
  
  return cleanedText;
}

// Get a random question for a framework
const getQuestionForFramework = (framework: string): string => {
  const questions = frameworkQuestions[framework] || ["How does your organization approach sustainability?"];
  return questions[Math.floor(Math.random() * questions.length)];
};

// Get a random category for a framework
const getCategoryForFramework = (framework: string): string => {
  const categories = ["Governance", "Environmental", "Social", "Strategy", "Disclosure", "Implementation"];
  return categories[Math.floor(Math.random() * categories.length)];
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
