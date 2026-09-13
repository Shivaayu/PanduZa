export const PANDA_REACTIONS = {
  idle: 'idle',
  happy: 'happy',
  excited: 'excited',
  focused: 'focused',
  surprised: 'surprised',
  celebrating: 'celebrating',
  disappointed: 'disappointed',
  sad: 'sad',
  crying: 'crying',
  proud: 'proud',
  shocked: 'shocked'
};

export function reactionForResult({ won, newRecord = false, rareReward = false, scoreRatio = 0 }) {
  if (newRecord) return PANDA_REACTIONS.celebrating;
  if (rareReward) return PANDA_REACTIONS.shocked;
  if (won) return PANDA_REACTIONS.excited;
  if (scoreRatio >= 0.9) return PANDA_REACTIONS.disappointed;
  return PANDA_REACTIONS.crying;
}
