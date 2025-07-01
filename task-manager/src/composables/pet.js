import { ref } from 'vue'

export const petLevel = ref(1)
export const petXP = ref(0)

export function xpForNextLevel(level) {
  return 100 + (level - 1) * 20
}

export function gainXP(xp) {
  petXP.value += xp
  while (petXP.value >= xpForNextLevel(petLevel.value)) {
    petXP.value -= xpForNextLevel(petLevel.value)
    petLevel.value++
  }
}
