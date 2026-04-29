export interface ProductData {
  code: string;
  name: string;
  image: string;
  score: number;
  ingredients: Ingredient[];
  alternatives: Alternative[];
  category: string;
}

export interface Ingredient {
  id: string;
  name: string;
  safety: 'safe' | 'caution' | 'warning';
  description?: string;
}

export interface Alternative {
  id: string;
  name: string;
  image: string;
  score: number;
}

// Fallback Japanese mock data
const mockJapaneseProduct: ProductData = {
  code: '4901330502881',
  name: 'Calbee Potato Chips Lightly Salted',
  category: 'Snacks',
  image: 'https://images.openfoodfacts.org/images/products/490/133/050/2881/front_ja.3.400.jpg',
  score: 45,
  ingredients: [
    { id: '1', name: 'Potatoes', safety: 'safe' },
    { id: '2', name: 'Vegetable Oil', safety: 'caution', description: 'High in calories and fat' },
    { id: '3', name: 'Salt', safety: 'caution', description: 'High sodium content' },
    { id: '4', name: 'Flavor Enhancer (Amino Acids)', safety: 'warning', description: 'Artificial additive' },
  ],
  alternatives: [
    {
      id: 'alt1',
      name: 'Baked Sweet Potato Chips',
      image: 'https://images.openfoodfacts.org/images/products/490/133/050/2881/front_ja.3.400.jpg', // mock image
      score: 85
    },
    {
      id: 'alt2',
      name: 'Organic Rice Crackers',
      image: 'https://images.openfoodfacts.org/images/products/490/133/050/2881/front_ja.3.400.jpg', // mock image
      score: 92
    }
  ]
};

export const fetchProductData = async (barcode: string): Promise<ProductData> => {
  try {
    // Return mock data only if specific mock barcode is scanned
    if (barcode === mockJapaneseProduct.code) {
      return mockJapaneseProduct;
    }

    // Try multiple Open Facts databases
    const databases = [
      'https://world.openfoodfacts.org',
      'https://world.openbeautyfacts.org',
      'https://world.openproductsfacts.org'
    ];

    let product = null;

    for (const db of databases) {
      try {
        const response = await fetch(`${db}/api/v2/product/${barcode}.json`);
        if (!response.ok) continue;
        const data = await response.json();
        
        if (data.status === 1 && data.product) {
          product = data.product;
          break; // Stop at first successful match
        }
      } catch (err) {
        console.warn(`Failed to query ${db}:`, err);
      }
    }

    if (product) {
      
      // Calculate a more accurate score based on nutriscore, nova group, or ecoscore
      let calculatedScore = 50;
      if (product.nutriscore_score !== undefined) {
        // Nutriscore usually from -15 to 40. Lower is better.
        calculatedScore = Math.max(0, Math.min(100, 100 - ((product.nutriscore_score + 15) * 2)));
      } else if (product.nutriscore_grade) {
        const grades: Record<string, number> = { a: 90, b: 75, c: 50, d: 25, e: 10 };
        calculatedScore = grades[product.nutriscore_grade.toLowerCase()] || 50;
      } else if (product.nova_group) {
         // Nova 1: Unprocessed (good) -> 80
         // Nova 2: Processed culinary ingredients -> 60
         // Nova 3: Processed foods -> 40
         // Nova 4: Ultra-processed -> 20
         const novaScores: Record<number, number> = { 1: 80, 2: 60, 3: 40, 4: 20 };
         calculatedScore = novaScores[product.nova_group] || 50;
      } else if (product.ecoscore_score) {
         calculatedScore = product.ecoscore_score;
      }

      // Parse actual ingredients
      let ingredientsList: Ingredient[] = [];
      if (product.ingredients && product.ingredients.length > 0) {
        ingredientsList = product.ingredients.map((i: any, index: number) => ({
          id: index.toString(),
          name: i.text || i.id?.replace(/en:/g, '').replace(/ja:/g, '').replace(/-/g, ' ') || 'Unknown Ingredient',
          safety: (i.vegan === 'yes' || i.vegetarian === 'yes') ? 'safe' : (i.vegan === 'no' ? 'warning' : 'caution')
        }));
      } else if (product.ingredients_tags && product.ingredients_tags.length > 0) {
        // Fallback to tags which are often populated even when ingredients array is empty
        ingredientsList = product.ingredients_tags.map((tag: string, index: number) => ({
           id: index.toString(),
           name: tag.replace(/^[a-z]{2}:/, '').replace(/-/g, ' ').replace(/_/g, ' '),
           safety: 'caution' as const
        })).filter((i: any) => i.name.length > 0);
      } else {
        // Fallback to text if structured ingredients are missing
        const ingredientsText = product.ingredients_text_en || product.ingredients_text_ja || product.ingredients_text || '';
        if (ingredientsText) {
           ingredientsList = ingredientsText.split(/[,、]/).map((text: string, index: number) => ({
             id: index.toString(),
             name: text.trim().replace(/^\*+|\*+$/g, ''),
             safety: 'caution' as const
           })).filter((i: any) => i.name.length > 0);
        }
      }

      // Clean up capitalization
      ingredientsList = ingredientsList.map(i => ({
        ...i,
        name: i.name ? i.name.charAt(0).toUpperCase() + i.name.slice(1) : 'Unknown'
      }));

      // Extract best category
      const categoryStr = product.categories || product.categories_tags?.join(', ') || 'Unknown Category';
      const mainCategory = categoryStr.split(',')[0].replace(/en:/g, '').replace(/ja:/g, '').replace(/-/g, ' ').trim();

      return {
        code: barcode,
        name: product.product_name_en || product.product_name_ja || product.product_name || 'Unknown Product',
        image: product.image_url || product.image_front_url || 'https://via.placeholder.com/400',
        score: calculatedScore,
        category: mainCategory.charAt(0).toUpperCase() + mainCategory.slice(1),
        ingredients: ingredientsList,
        alternatives: [] // Open Food Facts doesn't easily provide alternatives out of the box
      };
    } else {
      throw new Error('Product not found in any Open Facts database');
    }
  } catch (error: any) {
    console.warn('ScannerService Error:', error.message || error);
    throw error;
  }
};
