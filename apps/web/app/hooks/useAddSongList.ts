'use client';

import { useEffect, useState } from 'react';

import useLoadingStore from '@/stores/useLoadingStore';
import useSongStore from '@/stores/useSongStore';

export default function useAddSongList() {
  const [activeTab, setActiveTab] = useState('liked');

  const [songSelected, setSongSelected] = useState<string[]>([]);
  const { startLoading, stopLoading, initialLoading } = useLoadingStore();

  const { refreshLikedSongs, refreshRecentSongs, postToSingSongs } = useSongStore();

  const handleApiCall = async <T>(apiCall: () => Promise<T>, onError?: () => void) => {
    startLoading();
    try {
      const result = await apiCall();
      return result;
    } catch (error) {
      console.error('API 호출 실패:', error);
      if (onError) onError();
      return null;
    } finally {
      stopLoading();
    }
  };

  const getLikedSongs = async () => {
    await handleApiCall(async () => {
      refreshLikedSongs();
    });
  };

  const getRecentSongs = async () => {
    await handleApiCall(async () => {
      refreshRecentSongs();
    });
  };

  const handleToggleSelect = (songId: string) => {
    setSongSelected(prev =>
      prev.includes(songId) ? prev.filter(id => id !== songId) : [...prev, songId],
    );
  };

  const handleConfirmAdd = async () => {
    await handleApiCall(async () => {
      await postToSingSongs(songSelected);
      setSongSelected([]);
    });
  };

  const totalSelectedCount = songSelected.length;

  useEffect(() => {
    getLikedSongs();
    getRecentSongs();
    initialLoading();
  }, []);

  return {
    activeTab,
    setActiveTab,
    songSelected,
    handleToggleSelect,
    handleConfirmAdd,
    totalSelectedCount,
  };
}
