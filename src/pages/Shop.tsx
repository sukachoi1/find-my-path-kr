import { useState, useEffect } from "react";
import { Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  product_id: string;
  product_title: string;
  product_price: string;
  product_main_image_url: string;
  product_url: string;
  product_star_rating?: string;
  product_num_ratings?: number;
}

const Shop = () => {
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadBestProducts();
  }, []);

  const loadBestProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('search-products', {
        body: { keyword: "popular products korea", page: 1 }
      });

      if (error) {
        console.error('Load error:', error);
        toast({
          title: "오류",
          description: "상품을 불러올 수 없습니다.",
          variant: "destructive",
        });
        return;
      }

      if (data?.items && data.items.length > 0) {
        setProducts(data.items);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = async () => {
    if (!keyword.trim()) {
      toast({
        title: "검색어 입력",
        description: "검색할 상품명을 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('search-products', {
        body: { keyword, page: 1 }
      });

      if (error) {
        console.error('Search error:', error);
        toast({
          title: "검색 실패",
          description: "상품 검색 중 오류가 발생했습니다.",
          variant: "destructive",
        });
        return;
      }

      if (data?.items && data.items.length > 0) {
        setProducts(data.items);
        toast({
          title: "검색 완료",
          description: `${data.items.length}개의 상품을 찾았습니다.`,
        });
      } else {
        setProducts([]);
        toast({
          title: "검색 결과 없음",
          description: "검색 결과가 없습니다.",
        });
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast({
        title: "오류",
        description: "검색 중 문제가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchProducts();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">아마존 쇼핑</h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="상품 검색..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={searchProducts} disabled={loading}>
              <Search className="w-4 h-4 mr-2" />
              검색
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">상품을 검색하는 중...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.product_id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <a href={product.product_url} target="_blank" rel="noopener noreferrer">
                  <div className="aspect-square relative bg-gray-100">
                    <img
                      src={product.product_main_image_url}
                      alt={product.product_title}
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm line-clamp-2 mb-2 min-h-[2.5rem]">
                      {product.product_title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-primary">
                        {product.product_price}
                      </p>
                      {product.product_star_rating && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <span>⭐ {product.product_star_rating}</span>
                          {product.product_num_ratings && (
                            <span>({product.product_num_ratings})</span>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </a>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
