'use client';

import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <TamaguiProvider config={config}>{children}</TamaguiProvider>;
}
