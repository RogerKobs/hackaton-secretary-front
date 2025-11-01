import { create } from 'zustand';
import type { IProducers } from '@/@types/IProducers';

interface ProducersStores {
  producers: IProducers[] | null;
  setProducers: (producers: IProducers[]) => void;
}

export const useProducersStores = create<ProducersStores>((set) => ({
  producers: null,
  setProducers: (producers) => set({ producers }),
}));