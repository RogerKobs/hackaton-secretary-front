import { create } from 'zustand';
import type { ITechnicians } from '@/@types/ITechnicians';

interface TechniciansStores {
  technicians: ITechnicians[] | null;
  setTechnicians: (technicians: ITechnicians[]) => void;
}

export const useTechniciansStores = create<TechniciansStores>((set) => ({
  technicians: null,
  setTechnicians: (technicians) => set({ technicians }),
}));    