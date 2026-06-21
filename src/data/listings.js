export const mockListings = [
  { id: 1, title: 'Sony WH-1000XM5 Wireless Headphones',    category: 'Electronics',   brand: 'Sony',    model: 'WH-1000XM5',      condition: 'Like New',  price: 280,  trustScore: 91, descriptionQuality: 88, duplicateRisk: 12, suspiciousRisk: 5,  status: 'verified', date: '2024-01-15' },
  { id: 2, title: 'iPhone 15 Pro 256GB Natural Titanium',    category: 'Mobile Phones', brand: 'Apple',   model: 'iPhone 15 Pro',   condition: 'Excellent', price: 950,  trustScore: 78, descriptionQuality: 72, duplicateRisk: 34, suspiciousRisk: 18, status: 'warning',  date: '2024-01-14' },
  { id: 3, title: 'Samsung Galaxy S24 Ultra',                category: 'Mobile Phones', brand: 'Samsung', model: 'Galaxy S24 Ultra', condition: 'Good',      price: 820,  trustScore: 85, descriptionQuality: 81, duplicateRisk: 22, suspiciousRisk: 8,  status: 'verified', date: '2024-01-13' },
  { id: 4, title: 'MacBook Air M3 13-inch Space Gray',       category: 'Laptops',       brand: 'Apple',   model: 'MacBook Air M3',  condition: 'New',       price: 1100, trustScore: 94, descriptionQuality: 95, duplicateRisk: 8,  suspiciousRisk: 3,  status: 'verified', date: '2024-01-12' },
  { id: 5, title: 'Dell XPS 15 9530 Intel i9',               category: 'Laptops',       brand: 'Dell',    model: 'XPS 15 9530',     condition: 'Good',      price: 1350, trustScore: 62, descriptionQuality: 58, duplicateRisk: 55, suspiciousRisk: 42, status: 'flagged',  date: '2024-01-11' },
];

export const mockAlerts = [
  { id: 1, type: 'suspicious', severity: 'high',   title: 'Suspicious phrase detected',  message: '"Send money directly" found in Dell XPS listing',   listing: 'Dell XPS 15 9530',    time: '2 hours ago' },
  { id: 2, type: 'duplicate',  severity: 'high',   title: 'High duplicate similarity',   message: 'Sony WH-1000XM5 matches another listing at 92%',     listing: 'Sony WH-1000XM5',     time: '4 hours ago' },
  { id: 3, type: 'missing',    severity: 'medium', title: 'Missing information',          message: 'iPhone 15 Pro is missing warranty and image details', listing: 'iPhone 15 Pro',        time: '6 hours ago' },
  { id: 4, type: 'quality',    severity: 'low',    title: 'Low description quality',      message: 'Dell XPS 15 description score is below threshold',    listing: 'Dell XPS 15 9530',    time: '8 hours ago' },
];
