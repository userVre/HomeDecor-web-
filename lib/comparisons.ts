export type ComparisonPage = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  bestFor: string[];
  rows: Array<{
    label: string;
    homedecor: string;
    alternative: string;
  }>;
  takeaway: string;
};

export const comparisonPages: ComparisonPage[] = [
  {
    slug: "homedecor-ai-vs-traditional-interior-design",
    title: "HomeDecor AI vs Traditional Interior Design",
    description:
      "Compare HomeDecor AI with traditional interior design and learn when AI visual concepts are useful before hiring a professional.",
    intro:
      "Traditional interior design gives you expert planning, sourcing, measurements, and project management. HomeDecor AI is different: it helps you explore visual directions quickly before you commit budget to a larger project.",
    bestFor: [
      "Testing styles before a renovation",
      "Creating visual direction for a room",
      "Preparing clearer references for a designer",
      "Avoiding expensive early design mistakes",
    ],
    rows: [
      {
        label: "Speed",
        homedecor:
          "Generates one visual concept from a photo in moments; real timing can vary.",
        alternative: "Usually involves consultations, measurements, and design rounds.",
      },
      {
        label: "Cost",
        homedecor:
          "Free to start with Diamonds for generations, plus Pro for heavier exploration.",
        alternative: "Higher professional fees, often worth it for complex projects.",
      },
      {
        label: "Accuracy",
        homedecor:
          "Great for inspiration, mood, color, materials, and visual layout direction.",
        alternative:
          "Better for measured plans, material specifications, sourcing, and construction.",
      },
      {
        label: "Best use",
        homedecor: "Early-stage visual idea exploration.",
        alternative: "Final planning, purchasing, technical drawings, and project delivery.",
      },
    ],
    takeaway:
      "Use HomeDecor AI before the professional phase so you understand what you like. For structural work, permits, budgets, measurements, and final specifications, bring in qualified experts.",
  },
  {
    slug: "homedecor-ai-vs-hiring-an-interior-designer",
    title: "HomeDecor AI vs Hiring an Interior Designer",
    description:
      "See when HomeDecor AI is useful for quick visual ideas and when hiring an interior designer is the better choice.",
    intro:
      "Hiring an interior designer can be the right move for big renovations, custom furniture, sourcing, and full-service execution. HomeDecor AI helps you move faster at the inspiration stage.",
    bestFor: [
      "Trying several styles before a design meeting",
      "Finding the right mood for one room",
      "Homeowners who are not ready for a full design package",
      "Real estate visuals and quick renovation ideas",
    ],
    rows: [
      {
        label: "Creative options",
        homedecor:
          "Lets you regenerate and compare visual directions from your own photo.",
        alternative: "Designers create fewer but more deeply considered directions.",
      },
      {
        label: "Personal guidance",
        homedecor: "AI-guided visual concepts without human consultation.",
        alternative: "Human expertise, taste, constraints, and trade coordination.",
      },
      {
        label: "Commitment",
        homedecor: "Easy to try before spending heavily.",
        alternative: "Better once you are ready to invest in the full project.",
      },
      {
        label: "Deliverables",
        homedecor:
          "Visual redesign concepts, before/after comparison, downloads, sharing, and saved portfolio history.",
        alternative: "May include plans, shopping lists, schedules, and installation help.",
      },
    ],
    takeaway:
      "HomeDecor AI is a smart first visual step. A designer is still valuable when the project needs measured planning, sourcing, installation, or professional accountability.",
  },
  {
    slug: "homedecor-ai-vs-pinterest-inspiration",
    title: "HomeDecor AI vs Pinterest Inspiration",
    description:
      "Compare HomeDecor AI with Pinterest and learn why AI photo redesigns can make inspiration more personal.",
    intro:
      "Pinterest is excellent for collecting inspiration, but the rooms are not your room. HomeDecor AI makes the inspiration more personal by applying design ideas to your own photo.",
    bestFor: [
      "Seeing styles inside your real space",
      "Reducing endless scrolling",
      "Testing paint, floors, and furniture moods",
      "Turning inspiration boards into practical visual concepts",
    ],
    rows: [
      {
        label: "Personalization",
        homedecor: "Uses your actual room, garden, exterior, wall, or floor photo.",
        alternative: "Shows other people's rooms and polished reference images.",
      },
      {
        label: "Action",
        homedecor: "Creates a concept you can compare with your current space.",
        alternative: "Requires imagination to translate an idea into your home.",
      },
      {
        label: "Speed",
        homedecor: "Fast style testing from one uploaded or captured photo.",
        alternative: "Can become a long scrolling and saving session.",
      },
      {
        label: "Best use",
        homedecor: "Previewing how ideas might look in your space.",
        alternative: "Collecting broad taste references and trend inspiration.",
      },
    ],
    takeaway:
      "Use Pinterest to discover what you love, then use HomeDecor AI to see whether that direction works in your own space.",
  },
  {
    slug: "homedecor-ai-vs-mood-boards",
    title: "HomeDecor AI vs Mood Boards",
    description:
      "Learn the difference between AI redesign concepts and traditional interior design mood boards.",
    intro:
      "Mood boards are useful for colors, textures, and materials, but they can feel abstract. HomeDecor AI turns those ideas into visual concepts inside a real photo.",
    bestFor: [
      "Turning a mood into a room concept",
      "Previewing color palettes quickly",
      "Exploring materials like marble, oak, tile, and concrete",
      "Making design ideas easier to understand",
    ],
    rows: [
      {
        label: "Format",
        homedecor: "Photo-based redesign concepts.",
        alternative: "Collages of materials, colors, furniture, and references.",
      },
      {
        label: "Clarity",
        homedecor: "Shows a more complete visual direction.",
        alternative: "Communicates taste but may require imagination.",
      },
      {
        label: "Iteration",
        homedecor: "Easy to regenerate different options.",
        alternative: "Manual updates can take more time.",
      },
      {
        label: "Best use",
        homedecor: "Seeing a design mood in context.",
        alternative: "Collecting and aligning on materials and style language.",
      },
    ],
    takeaway:
      "Mood boards and AI concepts work well together. Use mood boards to define taste, then use HomeDecor AI to preview that taste in a real space.",
  },
  {
    slug: "ai-interior-design-app-vs-manual-room-planning",
    title: "AI Interior Design App vs Manual Room Planning",
    description:
      "Compare AI interior design apps with manual room planning for layouts, colors, materials, and renovation ideas.",
    intro:
      "Manual planning is useful when you need accuracy. An AI interior design app is useful when you need visual momentum and fast creative options before you measure and buy.",
    bestFor: [
      "Exploring multiple layouts visually",
      "Testing visual styles before manual planning",
      "Previewing wall paint and floor finishes",
      "Creating a direction before measurements",
    ],
    rows: [
      {
        label: "Workflow",
        homedecor: "Start with a photo and generate visual options.",
        alternative: "Start with measurements, sketches, software, or spreadsheets.",
      },
      {
        label: "Learning curve",
        homedecor: "Designed for quick mobile use.",
        alternative: "May require planning tools, design knowledge, and more time.",
      },
      {
        label: "Precision",
        homedecor: "Conceptual and inspirational.",
        alternative: "Better for measured dimensions, traffic flow, and purchasing.",
      },
      {
        label: "Best use",
        homedecor: "Fast visual exploration.",
        alternative: "Final layout decisions and measurements.",
      },
    ],
    takeaway:
      "Use AI first to choose the visual direction. Use manual planning afterward to confirm measurements, fit, traffic flow, cost, and real-world feasibility.",
  },
];

export function getComparisonPage(slug: string) {
  return comparisonPages.find((page) => page.slug === slug) ?? null;
}
