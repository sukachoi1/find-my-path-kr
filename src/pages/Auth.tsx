import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().trim().email({ message: "올바른 이메일 주소를 입력해주세요" }),
  password: z.string().min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다" }),
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    const validation = authSchema.safeParse({ email, password });
    if (!validation.success) {
      toast({
        title: "입력 오류",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: validation.data.email,
          password: validation.data.password,
        });

        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast({
              title: "로그인 실패",
              description: "이메일 또는 비밀번호가 올바르지 않습니다",
              variant: "destructive",
            });
          } else {
            toast({
              title: "로그인 실패",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "로그인 성공",
            description: "환영합니다!",
          });
        }
      } else {
        const redirectUrl = `${window.location.origin}/`;
        const { error } = await supabase.auth.signUp({
          email: validation.data.email,
          password: validation.data.password,
          options: {
            emailRedirectTo: redirectUrl,
          },
        });

        if (error) {
          if (error.message.includes("User already registered")) {
            toast({
              title: "회원가입 실패",
              description: "이미 가입된 이메일입니다",
              variant: "destructive",
            });
          } else {
            toast({
              title: "회원가입 실패",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "회원가입 성공",
            description: "계정이 생성되었습니다!",
          });
        }
      }
    } catch (error) {
      toast({
        title: "오류 발생",
        description: "잠시 후 다시 시도해주세요",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl text-center bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-glow))] bg-clip-text text-transparent">
            꿈을 찾는 여정
          </CardTitle>
          <CardDescription className="text-center">
            {isLogin ? "계정에 로그인하세요" : "새로운 계정을 만드세요"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "처리 중..." : isLogin ? "로그인" : "회원가입"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              disabled={loading}
            >
              {isLogin ? "계정이 없으신가요? 회원가입" : "이미 계정이 있으신가요? 로그인"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
