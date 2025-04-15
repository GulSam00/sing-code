import { Checkbox } from '@/components/ui/checkbox';
import { AddListModalSong } from '@/types/song';
import { cn } from '@/utils/cn';

// 노래 항목 컴포넌트
export default function SongItem({
  song,
  isSelected,
  onToggleSelect,
}: {
  song: AddListModalSong;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}) {
  return (
    <div className={cn('border-border flex items-center space-x-3 border-b py-2 last:border-0')}>
      <Checkbox
        id={`song-${song.id}`}
        checked={isSelected}
        onCheckedChange={() => onToggleSelect(song.id)}
      />
      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-medium">{song.title}</h4>
        <p className="text-muted-foreground truncate text-xs">{song.artist}</p>
      </div>
    </div>
  );
}
