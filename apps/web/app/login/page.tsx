'use client';

import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
// import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { createClient } from '@/supabase/client';

import KakaoLogin from './KakaoLogin';
import { login } from './actions';

// 새로운 클라이언트 컴포넌트

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await login(email, password);
    setIsLoading(false);
  };

  const getUser = async () => {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();

    if (data) {
      console.log('data : ', data);
      // redirect('/');
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div
      className="bg-background flex min-h-screen flex-col justify-center px-4"
      style={{ maxWidth: '360px', margin: '0 auto' }}
    >
      <div className="w-full space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">로그인</h1>
          <p className="text-muted-foreground text-sm">계정에 로그인하여 서비스를 이용하세요</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 transform"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? '로그인 중...' : '로그인'}
          </Button>

          <div className="text-center">
            <Link href="/signup" className="text-primary text-sm hover:underline">
              계정이 없으신가요? 회원가입
            </Link>
          </div>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background text-muted-foreground px-2 text-xs">또는</span>
          </div>
        </div>

        <KakaoLogin />
      </div>
    </div>
  );
}
