export const site = {
  name: 'Sharpe Wise Insights',
  description: 'Thoughtful, evidence-informed program evaluation.',
  navigation: [
    { label: 'About', href: '/#about' },
    { label: 'Approach', href: '/#approach' },
    { label: 'What We Do', href: '/#services' },
    { label: 'Start a Conversation', href: '/#contact' },
  ],
} as const;

export const evaluationJourneys = [
  "We're just beginning",
  'We know what we want to understand',
  "We have data but don't know what it's telling us",
  "We have an existing evaluation approach we'd like to strengthen",
  "We're not sure, that's why we're here",
] as const;

export const processStages = [
  { number: '01', title: 'Explore', question: 'What is really happening here?', description: 'We immerse ourselves in the program, its origins, evidence, philosophy, people, context, and existing knowledge.' },
  { number: '02', title: 'Explain', question: 'What is distinctive about this work?', description: "We translate what we learn into a clear and compelling articulation of the program's purpose and intended impact." },
  { number: '03', title: 'Examine', question: 'How is change expected to happen?', description: "We make the program's underlying logic visible, tracing the relationship between experience, mechanism, and outcome." },
  { number: '04', title: 'Evidence', question: 'What would allow us to know?', description: 'We determine what meaningful evidence looks like and design the measures, instruments, and evaluation approach needed to capture it.' },
  { number: '05', title: 'Evolve', question: "What does what we've learned make possible?", description: "We interpret findings in context and turn evidence into insight that can strengthen the program's next iteration." },
] as const;

export const services = [
  { number: '01', title: 'Evaluation Foundations', summary: 'For organizations that need to make their program and its intended impact explicit.', image: '/images/service-materials.png', imageAlt: 'Hands arranging material samples on a table', items: ['Program Narratives', 'Theory of Change', 'Logic Models', 'Evaluation Frameworks'] },
  { number: '02', title: 'Measurement & Instrument Design', summary: 'For organizations ready to understand what meaningful evidence should look like.', image: '/images/service-lamp.png', imageAlt: 'A sculptural table lamp and material swatches', items: ['Measurement Frameworks', 'Outcome & Indicator Development', 'Instrument Selection & Design', 'Pilot Testing & Assessments'] },
  { number: '03', title: 'Program Evaluation', summary: 'For organizations ready to examine their program in practice.', items: ['Process Evaluation', 'Outcome Evaluation', 'Qualitative Research', 'Quantitative Research', 'Mixed-Methods Evaluation', 'Data Analysis & Interpretation'] },
  { number: '04', title: 'Evaluation Strategy & Capacity', summary: 'For organizations that want evaluation embedded into how they work.', items: ['Evaluation Planning', 'Measurement Systems', 'Internal Capacity Building', 'Ongoing Advisory'] },
] as const;
