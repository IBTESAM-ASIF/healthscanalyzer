export const placeholderProducts = {
  healthy: [
    {
      id: 'h1',
      name: 'Organic Green Tea',
      health_score: 95,
      ingredients: ['Green Tea Leaves', 'Natural Antioxidants'],
      pros: ['Rich in antioxidants', 'Boosts metabolism', 'Natural energy'],
      cons: ['Contains caffeine'],
      category: 'healthy',
      amazon_url: 'https://amazon.com',
      analysis_summary: 'A highly beneficial beverage with numerous health benefits.'
    },
    {
      id: 'h2',
      name: 'Quinoa Bowl',
      health_score: 90,
      ingredients: ['Quinoa', 'Vegetables', 'Olive Oil'],
      pros: ['High protein', 'Rich in fiber', 'Complete protein'],
      cons: ['May contain traces of saponin'],
      category: 'healthy',
      amazon_url: 'https://amazon.com',
      analysis_summary: 'Nutrient-dense superfood great for daily consumption.'
    }
  ],
  restricted: [
    {
      id: 'r1',
      name: 'Dark Chocolate Bar',
      health_score: 65,
      ingredients: ['Cocoa Mass', 'Sugar', 'Cocoa Butter'],
      pros: ['Contains antioxidants', 'May improve mood'],
      cons: ['High in calories', 'Contains sugar'],
      category: 'restricted',
      amazon_url: 'https://amazon.com',
      analysis_summary: 'Moderate consumption recommended due to sugar content.'
    },
    {
      id: 'r2',
      name: 'Greek Yogurt',
      health_score: 70,
      ingredients: ['Milk', 'Live Cultures'],
      pros: ['High protein', 'Probiotics'],
      cons: ['Contains lactose', 'High in saturated fat'],
      category: 'restricted',
      amazon_url: 'https://amazon.com',
      analysis_summary: 'Good in moderation, especially for those without lactose intolerance.'
    }
  ],
  harmful: [
    {
      id: 'ha1',
      name: 'Processed Energy Drink',
      health_score: 20,
      ingredients: ['Caffeine', 'Sugar', 'Artificial Colors'],
      pros: ['Quick energy boost'],
      cons: ['High sugar content', 'Artificial additives', 'May cause jitters'],
      category: 'harmful',
      amazon_url: 'https://amazon.com',
      analysis_summary: 'High in artificial ingredients and sugar, not recommended for regular consumption.'
    },
    {
      id: 'ha2',
      name: 'Ultra-Processed Snack',
      health_score: 15,
      ingredients: ['Refined Flour', 'Artificial Flavors', 'Preservatives'],
      pros: ['Convenient'],
      cons: ['No nutritional value', 'Contains harmful additives', 'High in sodium'],
      category: 'harmful',
      amazon_url: 'https://amazon.com',
      analysis_summary: 'Contains multiple harmful ingredients, best avoided.'
    }
  ]
};