export async function extractProductDetails(url: string) {
  try {
    console.log(`[${new Date().toISOString()}] Fetching product details from: ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch product page');
    
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    if (!doc) throw new Error('Failed to parse HTML');

    // Extract full product name with improved accuracy
    const productName = doc.querySelector('#productTitle')?.textContent?.trim();
    
    // Enhanced company extraction with multiple fallbacks
    let company = '';
    const brandSelectors = [
      '#bylineInfo',
      '.contributorNameID',
      '[data-feature-name="brandLogo"]',
      '#brand',
      '.po-brand .a-span9',
      '.a-section.a-spacing-none.a-spacing-top-micro .a-row .a-size-base'
    ];

    for (const selector of brandSelectors) {
      const element = doc.querySelector(selector);
      if (element?.textContent) {
        company = element.textContent
          .replace(/visit the|brand:|store/gi, '')
          .replace(/\s+/g, ' ')
          .trim();
        if (company) break;
      }
    }

    // Extract description and ingredients with improved parsing
    const description = doc.querySelector('#productDescription')?.textContent?.trim();
    const ingredientsSection = doc.querySelector('#important-information, #ingredient-information, #ingredients-section')?.textContent || '';
    const ingredients = ingredientsSection
      .toLowerCase()
      .split(/ingredients?:|contains:/i)[1]
      ?.split(/[,.]/)
      .map(i => i.trim())
      .filter(i => i.length > 0 && !i.includes('*')) || [];

    console.log(`[${new Date().toISOString()}] Successfully extracted:`, {
      name: productName,
      company: company,
      ingredientsCount: ingredients.length
    });

    return { 
      name: productName, 
      company, 
      description, 
      ingredients,
      amazon_url: url
    };
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error in product extraction:`, error);
    throw error;
  }
}