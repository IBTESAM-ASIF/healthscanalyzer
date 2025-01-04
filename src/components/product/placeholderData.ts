export const placeholderProducts = {
  healthy: [
    {
      id: 'h1',
      name: 'Organic Matcha Green Tea Extract',
      company: 'Pure Leaf Organics',
      health_score: 95,
      ingredients: ['Green Tea Leaves', 'Natural Antioxidants', 'L-Theanine'],
      pros: ['Rich in antioxidants', 'Boosts metabolism', 'Enhances mental clarity', 'Supports immune system'],
      cons: ['Contains caffeine', 'May interact with certain medications'],
      category: 'healthy',
      analysis_summary: 'A highly beneficial supplement with extensive research backing its health benefits. Clinical studies show significant positive effects on metabolism and cognitive function.',
      environmental_impact: 'Sustainably sourced from organic farms with minimal environmental impact.',
      allergy_risks: ['Caffeine sensitivity'],
      drug_interactions: ['Blood thinners', 'Blood pressure medication']
    },
    {
      id: 'h2',
      name: 'Ancient Grains Quinoa Bowl',
      company: 'Wholesome Foods Co.',
      health_score: 92,
      ingredients: ['Organic Quinoa', 'Mixed Vegetables', 'Extra Virgin Olive Oil', 'Sea Salt'],
      pros: ['Complete protein source', 'High in fiber', 'Rich in minerals', 'Gluten-free'],
      cons: ['May contain traces of saponin'],
      category: 'healthy',
      analysis_summary: 'Nutrient-dense superfood with exceptional protein quality. Research indicates significant benefits for heart health and blood sugar control.',
      environmental_impact: 'Grown using sustainable farming practices with minimal water usage.',
      allergy_risks: ['Saponin sensitivity']
    },
    {
      id: 'h3',
      name: 'Wild Alaskan Salmon Oil Omega-3',
      company: 'Nordic Naturals',
      health_score: 90,
      ingredients: ['Pure Salmon Oil', 'Natural Vitamin E', 'Omega-3 Fatty Acids'],
      pros: ['High in Omega-3', 'Supports brain health', 'Anti-inflammatory', 'Heart health benefits'],
      cons: ['Fish aftertaste', 'Contains fish allergens'],
      category: 'healthy',
      analysis_summary: 'Premium quality fish oil with exceptional purity levels. Clinical studies show significant benefits for cardiovascular and cognitive health.',
      environmental_impact: 'Sustainably sourced from wild-caught Alaskan salmon.',
      allergy_risks: ['Fish allergies'],
      drug_interactions: ['Blood thinners']
    },
    {
      id: 'h4',
      name: 'Advanced Probiotic Complex',
      company: 'Vital Probiotics',
      health_score: 88,
      ingredients: ['Multiple Probiotic Strains', 'Prebiotic Fiber', 'Vegetable Capsule'],
      pros: ['Supports gut health', 'Improves immunity', 'Aids digestion', 'Mood support'],
      cons: ['May cause initial bloating', 'Requires refrigeration'],
      category: 'healthy',
      analysis_summary: 'Advanced probiotic formula with clinically studied bacterial strains. Research shows significant benefits for digestive and immune health.',
      environmental_impact: 'Manufactured using eco-friendly processes with minimal waste.',
      allergy_risks: ['Milk proteins'],
      drug_interactions: ['Antibiotics']
    }
  ],
  restricted: [
    {
      id: 'r1',
      name: '70% Dark Chocolate Bar',
      company: 'Divine Chocolates',
      health_score: 65,
      ingredients: ['Cocoa Mass', 'Organic Sugar', 'Cocoa Butter', 'Natural Flavors'],
      pros: ['Rich in antioxidants', 'May improve mood', 'Heart health benefits'],
      cons: ['High in calories', 'Contains sugar', 'Caffeine content'],
      category: 'restricted',
      analysis_summary: 'While offering significant antioxidant benefits, moderation is key due to sugar and calorie content. Studies suggest positive effects on cardiovascular health when consumed in moderation.',
      environmental_impact: 'Sourced from sustainable cocoa farms with fair trade certification.',
      allergy_risks: ['Milk', 'Soy', 'Tree nuts'],
      drug_interactions: ['Caffeine-sensitive medications']
    },
    {
      id: 'r2',
      name: 'Traditional Greek Yogurt',
      company: 'Mediterranean Dairy',
      health_score: 70,
      ingredients: ['Milk', 'Live Cultures', 'Cream'],
      pros: ['High protein content', 'Probiotics', 'Calcium rich', 'Versatile food'],
      cons: ['Contains lactose', 'High in saturated fat', 'Caloric density'],
      category: 'restricted',
      analysis_summary: 'Nutritious dairy product with significant protein content, but consideration needed for those with lactose sensitivity or watching saturated fat intake.',
      environmental_impact: 'Produced using traditional methods with focus on reducing water usage.',
      allergy_risks: ['Milk', 'Lactose intolerance'],
      drug_interactions: ['Certain antibiotics']
    },
    {
      id: 'r3',
      name: 'Natural Honey Almond Granola',
      company: 'Nature\'s Path',
      health_score: 60,
      ingredients: ['Oats', 'Honey', 'Almonds', 'Dried Fruits'],
      pros: ['Natural ingredients', 'Fiber rich', 'Energy boost'],
      cons: ['High in sugar', 'Calorie dense', 'Portion control needed'],
      category: 'restricted',
      analysis_summary: 'While containing beneficial whole grains and nuts, sugar content from honey and dried fruits requires portion control.',
      environmental_impact: 'Made with locally sourced ingredients and honey.',
      allergy_risks: ['Tree nuts', 'Wheat', 'Gluten'],
    }
  ],
  harmful: [
    {
      id: 'ha1',
      name: 'Monster Energy Drink',
      company: 'Monster Beverage Corporation',
      health_score: 20,
      ingredients: ['Caffeine', 'High Fructose Corn Syrup', 'Artificial Colors', 'Taurine'],
      pros: ['Quick energy boost', 'Mental alertness'],
      cons: ['Excessive sugar', 'Artificial additives', 'Risk of overconsumption'],
      category: 'harmful',
      has_fatal_incidents: true,
      has_serious_adverse_events: true,
      analysis_summary: 'High risk product with documented cases of adverse effects. Contains concerning levels of stimulants and sugar.',
      safety_incidents: [
        'Multiple cases of cardiac events reported',
        'Associated with several fatalities in combination with alcohol',
        'Numerous emergency room visits documented'
      ],
      allergy_risks: ['Artificial colors', 'Caffeine sensitivity'],
      drug_interactions: ['Heart medications', 'Blood pressure medications', 'Antidepressants'],
      environmental_impact: 'High carbon footprint from packaging and production.'
    },
    {
      id: 'ha2',
      name: 'Equal Artificial Sweetener',
      company: 'Merisant Company',
      health_score: 15,
      ingredients: ['Aspartame', 'Dextrose', 'Maltodextrin'],
      pros: ['Zero calories', 'Sugar-free alternative'],
      cons: ['Artificial chemicals', 'Potential health risks', 'Taste alterations'],
      category: 'harmful',
      has_serious_adverse_events: true,
      analysis_summary: 'Long-term safety concerns raised by multiple studies. Associated with metabolic disruption and other health issues.',
      safety_incidents: [
        'Multiple reports of severe allergic reactions',
        'Linked to digestive system disorders'
      ],
      allergy_risks: ['Chemical sensitivities', 'Phenylketonuria'],
      drug_interactions: ['Insulin', 'Diabetes medications'],
      environmental_impact: 'Non-biodegradable components affect marine life.'
    },
    {
      id: 'ha3',
      name: 'Red 40 Food Coloring',
      company: 'McCormick & Company',
      health_score: 10,
      ingredients: ['Red 40', 'Propylene Glycol', 'Propylparaben'],
      pros: ['Vibrant color', 'Long shelf life'],
      cons: ['Purely artificial', 'Health risks', 'Behavioral effects'],
      category: 'harmful',
      has_serious_adverse_events: true,
      analysis_summary: 'Associated with numerous health concerns including behavioral issues in children and allergic reactions.',
      safety_incidents: [
        'Multiple cases of severe allergic reactions',
        'Linked to hyperactivity in children'
      ],
      allergy_risks: ['Multiple dye sensitivities', 'Aspirin sensitivity'],
      environmental_impact: 'Chemical runoff affects aquatic ecosystems.'
    }
  ]
};