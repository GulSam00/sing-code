'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import RankingList from '@/components/RankingList';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import useUserStat from '@/hooks/useUserStat';

export default function StatsPage() {
  const router = useRouter();

  const { userStat } = useUserStat();

  return (
    <div className="bg-background h-full py-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">노래방 통계</h1>
      </div>

      <ScrollArea className="h-[calc(100vh-40rem)] w-[360px]">
        <RankingList title="가장 많이 부른 곡" items={userStat.slice(0, 10)} />
      </ScrollArea>
    </div>
  );
}
