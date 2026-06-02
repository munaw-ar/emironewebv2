declare module 'animejs' {
  // Minimal typing for anime.js v3 — enough for our timeline usage.
  interface AnimeInstance {
    add: (params: Record<string, unknown>, offset?: string | number) => AnimeInstance;
    play: () => void;
    pause: () => void;
    finished: Promise<void>;
  }
  interface Anime {
    (params: Record<string, unknown>): AnimeInstance;
    timeline: (params?: Record<string, unknown>) => AnimeInstance;
    set: (targets: unknown, params: Record<string, unknown>) => void;
    stagger: (value: number | string, params?: Record<string, unknown>) => unknown;
    remove: (targets: unknown) => void;
  }
  const anime: Anime;
  export default anime;
}
