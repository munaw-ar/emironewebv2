import { useCallback, useSyncExternalStore } from 'react';

// Simple global state for modal open/close
let isModalOpen = false;
let skipToStep2 = false;
const listeners = new Set<() => void>();

const notify = () => listeners.forEach((l) => l());

export const openBookingModal = () => {
  isModalOpen = true;
  notify();
};

export const openBookingModalWithEmail = (email: string) => {
  localStorage.setItem("booking_email", email.trim());
  skipToStep2 = true;
  openBookingModal();
};

export const getSkipToStep2 = () => skipToStep2;
export const resetSkipToStep2 = () => { skipToStep2 = false; };

export const closeBookingModal = () => {
  isModalOpen = false;
  notify();
};

const subscribe = (callback: () => void) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};

const getSnapshot = () => isModalOpen;

export const useBookingModalState = () => {
  return useSyncExternalStore(subscribe, getSnapshot);
};

export const useBookingTrigger = () => {
  const triggerBookingFlow = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    openBookingModal();
  }, []);

  return { triggerBookingFlow };
};
