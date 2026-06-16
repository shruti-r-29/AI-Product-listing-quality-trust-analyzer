import Joi from 'joi';

const CATEGORIES = ['Electronics', 'Mobile Phones', 'Laptops', 'Cameras', 'Audio', 'Tablets', 'Accessories', 'Other'];
const CONDITIONS = ['New', 'Like New', 'Excellent', 'Good', 'Fair', 'For Parts'];
const WARRANTY_OPTIONS = ['No Warranty', 'Seller Warranty (30 days)', 'Seller Warranty (90 days)', 'Manufacturer Warranty', 'Extended Warranty'];

const imageSchema = Joi.object({
  name: Joi.string().required(),
  size: Joi.number().required(),
});

export const listingSchema = Joi.object({
  productName: Joi.string().trim().required(),
  category: Joi.string().valid(...CATEGORIES).required(),
  brand: Joi.string().allow('').optional(),
  model: Joi.string().allow('').optional(),
  condition: Joi.string().valid(...CONDITIONS).required(),
  age: Joi.string().allow('').optional(),
  warranty: Joi.string().valid(...WARRANTY_OPTIONS, '').optional(),
  description: Joi.string().allow('').optional(),
  images: Joi.array().items(imageSchema).optional().default([]),
});

export const analysisRunSchema = Joi.object({
  productName: Joi.string().trim().required(),
  category: Joi.string().valid(...CATEGORIES).required(),
  brand: Joi.string().allow('').optional(),
  model: Joi.string().allow('').optional(),
  condition: Joi.string().valid(...CONDITIONS).required(),
  age: Joi.string().allow('').optional(),
  warranty: Joi.string().valid(...WARRANTY_OPTIONS, '').optional(),
  description: Joi.string().min(20).required(),
  images: Joi.array().items(imageSchema).optional().default([]),
});
