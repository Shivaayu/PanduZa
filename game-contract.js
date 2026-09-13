// Shared contract every PañduZa game must implement.
export function createGameResult({
  gameId, score = 0, bestScore = 0, durationMs = 0,
  won = false, metrics = {}
}) {
  return {
    gameId,
    score,
    bestScore,
    newRecord: score > bestScore,
    durationMs,
    won,
    metrics,
    timestamp: Date.now()
  };
}

// Integration pipeline:
// GAME RESULT → RECORD → XP → LEAVES/REWARD → ACHIEVEMENTS → PANDA REACTION → SAVE
