import Generator from '@/utils/generator'
import { RecipientProfile } from 'models/RecipientProfile'

export const recipientProfileDefaultForm = (): RecipientProfile => {
  return {
    id: `DAC${Generator.generateRandomString(6)}`,
    iU: '',
    iSt: '',
    departmentName: '',
    studentName: '',
    universityName: '',
    dateOfBirth: undefined,
    year: undefined,
    nameCourse: '',
    major: '',
    placeOfBirth: '',
    nation: '',
    ranking: '',
    formOfTraining: '',
    CGPA: undefined,
    gender: '',
  }
}
