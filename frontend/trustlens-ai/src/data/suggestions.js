export const testimonials = [
  { id: 1, name: 'Priya Ramachandran', role: 'Marketplace Manager, TechBazaar', text: 'TrustLens cut our fraudulent listing rate by 78% in the first month. The AI catches patterns our team would miss entirely.',      avatar: 'PR', rating: 5 },
  { id: 2, name: 'James Okafor',       role: 'CEO, SwapNow',                    text: 'The duplicate detection alone saved us hours of manual review every week. The trust scoring is eerily accurate.',                     avatar: 'JO', rating: 5 },
  { id: 3, name: 'Mei-Lin Zhang',      role: 'Trust & Safety Lead, ListingHub', text: 'Best investment we made this year. Sellers who run their listings through TrustLens get 40% more conversions.',                      avatar: 'MZ', rating: 5 },
];

export const faqItems = [
  { q: 'How is the Trust Score calculated?',          a: 'The Trust Score is a weighted composite: 40% listing completeness, 30% description quality, 20% duplicate risk, and 10% suspicious content risk. Scores above 80 are considered trustworthy.' },
  { q: 'What counts as a suspicious pattern?',        a: 'Our AI flags phrases associated with fraud, off-platform payment requests, unrealistic guarantees, and pressure tactics. Each pattern has a severity level from low to high.' },
  { q: 'How accurate is duplicate detection?',        a: 'Duplicate detection uses Dice coefficient bigram similarity, achieving ~94% precision on our test dataset. Similarity scores above 85% are flagged as high risk.' },
  { q: 'Can I integrate TrustLens into my platform?', a: 'Yes — TrustLens is designed for easy backend integration. The frontend uses a clean service layer that maps directly to REST API endpoints.' },
  { q: 'What happens to my listing data?',            a: 'All analysis is processed securely. Listing data is used only for trust analysis and is never shared with third parties.' },
  { q: 'How do I improve a low Trust Score?',         a: 'Each Results page includes personalized AI suggestions ranked by impact. Addressing high-priority items typically raises scores by 15–25 points.' },
];
