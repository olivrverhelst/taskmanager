import { ref } from 'vue'

export const petLevel = ref(1)
export const petXP = ref(0)

export function xpForNextLevel(level) {
  return 100 + (level - 1) * 20
}

// Instead of local gainXP, you will update XP/Level from backend response,
// but you can keep this for local calculation if you want.
export function gainXP(xp) {
  petXP.value += xp
  while (petXP.value >= xpForNextLevel(petLevel.value)) {
    petXP.value -= xpForNextLevel(petLevel.value)
    petLevel.value++
  }
}

export function setPetStats(level, xp) {
  petLevel.value = level
  petXP.value = xp
}
