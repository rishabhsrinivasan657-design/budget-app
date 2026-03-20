export const CATEGORIES = [
  'Groceries','Rent','Food','Transport','Electronics',
  'Clothing','Fun','Cleaning','Furniture','Wifi','Travel','Other'
]

export const CAT_COLORS = {
  Groceries:   '#6af7b4',
  Rent:        '#f76a6a',
  Food:        '#f7c26a',
  Transport:   '#6ab4f7',
  Electronics: '#7c6af7',
  Clothing:    '#f76ac2',
  Fun:         '#f7a06a',
  Cleaning:    '#6af7e8',
  Furniture:   '#a0f76a',
  Wifi:        '#c26af7',
  Travel:      '#f7e86a',
  Other:       '#888',
}

export function getColor(cat) {
  return CAT_COLORS[cat] || CAT_COLORS.Other
}