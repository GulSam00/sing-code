'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

const navigation = [
  { name: '검색', href: '/' },
  { name: '부를 곡', href: '/tosing' },
  { name: '인기곡', href: '/popular' },
  { name: '라이브러리', href: '/library' },
];

export default function Footer() {
  const pathname = usePathname();
  const navPath = pathname.split('/')[1];

  return (
    <footer className="bg-background fixed bottom-0 flex h-8 w-[360px] justify-between">
      {navigation.map(item => {
        const isActive = '/' + navPath === item.href;
        return (
          <Button
            asChild
            key={item.name}
            className={cn('w-[90px] flex-auto', isActive && 'bg-accent text-accent-foreground')}
            variant="ghost"
          >
            <Link href={item.href}>{item.name}</Link>
          </Button>
        );
      })}
    </footer>
  );
}
