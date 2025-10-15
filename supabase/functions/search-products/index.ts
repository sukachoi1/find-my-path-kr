import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    // Transform Amazon API response
    const transformedData = {
      items: data.data?.products?.map((product: any) => ({
        product_id: product.asin || '',
        product_title: product.product_title || 'No title',
        product_price: convertToKRW(product.product_price || '0'),
        product_main_image_url: product.product_photo || '',
        product_url: product.product_url || '#',
        product_star_rating: product.product_star_rating || undefined,
        product_num_ratings: product.product_num_ratings || 0
      })) || []
    };

    return new Response(
      JSON.stringify(transformedData),
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
