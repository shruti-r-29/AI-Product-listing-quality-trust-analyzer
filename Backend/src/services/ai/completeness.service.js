import { scoreCompleteness } from './scoring.service.js';

const FIELD_META = {
  'Product Name': { icon: 'tag', hint: 'Add a clear, descriptive product name' },
  Category: { icon: 'grid', hint: 'Select the most relevant category' },
  Brand: { icon: 'award', hint: 'Specify the manufacturer or brand' },
  Model: { icon: 'hash', hint: 'Include the exact model number' },
  Condition: { icon: 'star', hint: 'Describe the physical condition honestly' },
  'Product Age': { icon: 'clock', hint: 'Mention how long you have owned this item' },
  Warranty: { icon: 'shield', hint: 'Specify remaining warranty if any' },
  Description: { icon: 'file', hint: 'Write at least 100 characters of detail' },
  Images: { icon: 'image', hint: 'Upload at least 3 clear product photos' },
};

export function checkCompleteness(formData) {
  const { completeness, missingFields, presentFields } = scoreCompleteness(formData);

  const enrichedMissing = missingFields.map((f) => ({
    ...f,
    ...(FIELD_META[f.field] || {}),
  }));

  let completenessLevel;
  if (completeness >= 85) completenessLevel = 'Excellent';
  else if (completeness >= 65) completenessLevel = 'Good';
  else if (completeness >= 45) completenessLevel = 'Fair';
  else completenessLevel = 'Poor';

  return {
    completenessScore: completeness,
    missingFields: enrichedMissing,
    presentFields,
    completenessLevel,
  };
}
