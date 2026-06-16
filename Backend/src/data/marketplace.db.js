export const MARKETPLACE_DB = [
  { id: 1, title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones', category: 'Audio', price: 299 },
  { id: 2, title: 'Sony WH1000XM5 Headphones Black', category: 'Audio', price: 270 },
  { id: 3, title: 'Apple iPhone 15 Pro 256GB Natural Titanium', category: 'Mobile Phones', price: 999 },
  { id: 4, title: 'iPhone 15 Pro 256 GB Titanium Unlocked', category: 'Mobile Phones', price: 960 },
  { id: 5, title: 'Samsung Galaxy S24 Ultra 512GB Phantom Black', category: 'Mobile Phones', price: 1199 },
  { id: 6, title: 'Samsung S24 Ultra 512GB Android Smartphone', category: 'Mobile Phones', price: 1150 },
  { id: 7, title: 'Apple MacBook Air M3 13 inch Space Gray 8GB 256GB', category: 'Laptops', price: 1099 },
  { id: 8, title: 'MacBook Air M3 2024 13" SpaceGray', category: 'Laptops', price: 1089 },
  { id: 9, title: 'Dell XPS 15 9530 Intel Core i9 RTX 4060', category: 'Laptops', price: 1499 },
  { id: 10, title: 'Dell XPS 15 9530 i9 32GB 1TB OLED', category: 'Laptops', price: 1549 },
  { id: 11, title: 'Sony PlayStation 5 Console Disc Edition', category: 'Gaming', price: 499 },
  { id: 12, title: 'Apple iPad Pro 12.9 M2 256GB WiFi Space Gray', category: 'Tablets', price: 1099 },
  { id: 13, title: 'Bose QuietComfort 45 Wireless Headphones', category: 'Audio', price: 229 },
  { id: 14, title: 'Canon EOS R6 Mark II Mirrorless Camera Body', category: 'Cameras', price: 2499 },
  { id: 15, title: 'DJI Mini 3 Pro Drone with RC Controller', category: 'Electronics', price: 759 },
];

export const MOCK_TRUST_TREND = [
  { month: 'Aug', score: 71, listings: 12 },
  { month: 'Sep', score: 74, listings: 18 },
  { month: 'Oct', score: 68, listings: 15 },
  { month: 'Nov', score: 79, listings: 22 },
  { month: 'Dec', score: 83, listings: 28 },
  { month: 'Jan', score: 82, listings: 31 },
];

export const MOCK_RISK_DISTRIBUTION = [
  { name: 'Low Risk', value: 58, color: '#22C55E' },
  { name: 'Medium Risk', value: 27, color: '#F59E0B' },
  { name: 'High Risk', value: 15, color: '#EF4444' },
];

export const MOCK_LISTINGS = [
  { id: 1, title: 'Sony WH-1000XM5 Wireless Headphones', category: 'Electronics', brand: 'Sony', trustScore: 91, descriptionQuality: 88, duplicateRisk: 12, suspiciousRisk: 5, status: 'verified' },
  { id: 2, title: 'iPhone 15 Pro 256GB Natural Titanium', category: 'Mobile Phones', brand: 'Apple', trustScore: 78, descriptionQuality: 72, duplicateRisk: 34, suspiciousRisk: 18, status: 'warning' },
  { id: 3, title: 'Samsung Galaxy S24 Ultra', category: 'Mobile Phones', brand: 'Samsung', trustScore: 85, descriptionQuality: 81, duplicateRisk: 22, suspiciousRisk: 8, status: 'verified' },
  { id: 4, title: 'MacBook Air M3 13-inch Space Gray', category: 'Laptops', brand: 'Apple', trustScore: 94, descriptionQuality: 95, duplicateRisk: 8, suspiciousRisk: 3, status: 'verified' },
  { id: 5, title: 'Dell XPS 15 9530 Intel i9', category: 'Laptops', brand: 'Dell', trustScore: 62, descriptionQuality: 58, duplicateRisk: 55, suspiciousRisk: 42, status: 'flagged' },
];
