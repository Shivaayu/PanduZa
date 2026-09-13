const KEY = 'panduza.player.v1';

const DEFAULT_PLAYER = {
  tag: '',
  level: 1,
  xp: 0,
  leaves: { bamboo: 0, fern: 0, clover: 0, autumn: 0 },
  food: { cookie: 0, bagel: 0, donut: 0 },
  stats: { gamesPlayed: 0, totalPlayTime: 0 },
  streak: { current: 0, best: 0, lastClaim: null }
};

export function getPlayer() {
  try {
    return { ...DEFAULT_PLAYER, ...JSON.parse(localStorage.getItem(KEY) || '{}') };
  } catch {
    return structuredClone(DEFAULT_PLAYER);
  }
}

export function savePlayer(patch) {
  const current = getPlayer();
  const next = {
    ...current,
    ...patch,
    leaves: { ...current.leaves, ...(patch.leaves || {}) },
    food: { ...current.food, ...(patch.food || {}) },
    stats: { ...current.stats, ...(patch.stats || {}) },
    streak: { ...current.streak, ...(patch.streak || {}) }
  };
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}
