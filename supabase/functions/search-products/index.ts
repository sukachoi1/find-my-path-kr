import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const translateToKorean = async (text: string, apiKey: string): Promise<string> => {
  try {
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: '당신은 상품명을 한글로 번역하는 전문가입니다. 상품명만 간결하게 번역하세요.'
          },
          {
            role: 'user',
            content: `다음 상품명을 한글로 번역해주세요: ${text}`
          }
        ],
        max_tokens: 100
      })
    });

    if (!response.ok) {
      console.error('Translation API error:', response.status);
      return text; // Return original if translation fails
    }

    const data = await response.json();
    return data.choices[0]?.message?.content?.trim() || text;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
};

const convertToKRW = (priceStr: string): string => {
  try {
    // Extract numeric value from price string (e.g., "$29.99" -> 29.99)
    const numericPrice = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    if (isNaN(numericPrice)) return priceStr;
    
    // Convert USD to KRW (approximate exchange rate: 1 USD = 1300 KRW)
    const krw = Math.round(numericPrice * 1300);
    return `₩${krw.toLocaleString('ko-KR')}`;
  } catch (error) {
    return priceStr;
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { keyword, page = 1 } = await req.json();
    
    if (!keyword) {
      return new Response(
        JSON.stringify({ error: 'Keyword is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const RAPIDAPI_KEY = Deno.env.get('RAPIDAPI_KEY');
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!RAPIDAPI_KEY) {
      console.error('RAPIDAPI_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Searching Amazon products: ${keyword}, page: ${page}`);

    const response = await fetch(
      `https://real-time-amazon-data.p.rapidapi.com/search?query=${encodeURIComponent(keyword)}&page=${page}&country=US`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com'
        }
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Amazon API error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch products from Amazon' }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('Amazon products fetched successfully');

    // Get products
    const products = data.data?.products || [];
    
    // Translate titles and convert prices
    const translatedProducts = await Promise.all(
      products.slice(0, 20).map(async (product: any) => {
        const translatedTitle = LOVABLE_API_KEY 
          ? await translateToKorean(product.product_title || '', LOVABLE_API_KEY)
          : product.product_title || 'No title';
        
        return {
          product_id: product.asin || '',
          product_title: translatedTitle,
          product_price: convertToKRW(product.product_price || '0'),
          product_main_image_url: product.product_photo || '',
          product_url: product.product_url || '#',
          product_star_rating: product.product_star_rating || undefined,
          product_num_ratings: product.product_num_ratings || 0
        };
      })
    );

    return new Response(
      JSON.stringify({ items: translatedProducts }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in search-products function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
