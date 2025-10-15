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
  product_original_price?: string;
  product_main_image_url: string;
  product_url: string;
  product_star_rating?: string;
}

const Shop = () => {
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // 첫 화면 로드 시 베스트 상품 자동 표시
  useEffect(() => {
    loadBestProducts();
  }, []);

  const loadBestProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('search-products', {
        body: { keyword: "best sellers", page: 1 }
      });

      if (error) {
        console.error('Load best products error:', error);
        toast({
          title: "API 구독 필요",
          description: "RapidAPI에서 AliExpress API를 구독해주세요.",
          variant: "destructive",
        });
        return;
      }

      if (data?.error) {
        toast({
          title: "API 오류",
          description: "RapidAPI에서 AliExpress API2를 구독했는지 확인해주세요.",
          variant: "destructive",
        });
        return;
      }

      if (data?.items) {
        setProducts(data.items);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast({
        title: "오류 발생",
        description: "API 연결에 문제가 있습니다.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = async () => {
    if (!keyword.trim()) {
      toast({
        title: "검색어를 입력하세요",
        description: "상품을 검색하려면 키워드를 입력해주세요.",
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

      if (data?.error) {
        toast({
          title: "API 오류",
          description: "RapidAPI에서 AliExpress API2를 구독했는지 확인해주세요.",
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
        title: "오류 발생",
        description: "예상치 못한 오류가 발생했습니다.",
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">AliExpress 쇼핑몰</h1>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="container py-12">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-center mb-8">상품 검색</h2>
          <div className="flex gap-2">
            <Input
              placeholder="검색할 상품을 입력하세요 (예: phone, laptop, dress)"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={searchProducts} disabled={loading}>
              <Search className="h-4 w-4 mr-2" />
              {loading ? "검색 중..." : "검색"}
            </Button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container pb-12">
        {loading && products.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            베스트 상품을 불러오는 중...
          </div>
        ) : products.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold mb-6">
              {keyword ? `"${keyword}" 검색 결과` : "베스트 상품"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.product_id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <a href={product.product_url} target="_blank" rel="noopener noreferrer" className="block">
                    <img
                      src={product.product_main_image_url}
                      alt={product.product_title}
                      className="w-full h-64 object-cover hover:scale-105 transition-transform"
                    />
                    <CardContent className="p-4 space-y-2">
                      <h3 className="font-semibold line-clamp-2 text-sm">
                        {product.product_title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">
                          ${product.product_price}
                        </span>
                        {product.product_original_price && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.product_original_price}
                          </span>
                        )}
                      </div>
                      {product.product_star_rating && (
                        <div className="text-sm text-muted-foreground">
                          ⭐ {product.product_star_rating}
                        </div>
                      )}
                    </CardContent>
                  </a>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            검색 결과가 없습니다
          </div>
        )}
      </section>
    </div>
  );
};

export default Shop;
