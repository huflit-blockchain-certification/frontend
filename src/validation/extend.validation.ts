import { Ranking } from 'models/DAC'

const ExtendValidation = {
  rankingCategoriesMapping: ({ ranking, cgpa }: { ranking?: string; cgpa: number }) => {
    if (!cgpa || !ranking) return false
    switch (ranking) {
      case Ranking.EXCELLENT:
        return cgpa >= 8.5 && cgpa <= 10
      case Ranking.VERY_GOOD:
        return cgpa >= 7.5 && cgpa < 8.5
      case Ranking.GOOD:
        return cgpa >= 6.5 && cgpa < 7.5
      case Ranking.AVERAGE_GOOD:
        return cgpa >= 5.5 && cgpa < 6.5
      case Ranking.ORDINAL:
        return cgpa >= 0 && cgpa < 5.5
      default:
        return false
    }
  },
}

export { ExtendValidation }
