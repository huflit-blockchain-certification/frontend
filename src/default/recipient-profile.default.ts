import generator from '@/utils/generator'

export const recipientProfileDefaultForm = () => {
  return {
    id: `DAC${generator.generateRandomString(6)}`,
    iU: '',
    iSt: '',
    departmentName: '',
    studentName: '',
    universityName: '',
    dateOfBirth: undefined,
    year: '2023',
    nameCourse: '',
    major: '',
    placeOfBirth: '',
    nation: 'Kinh',
    ranking: '',
    formOfTraining: '',
    CGPA: 5,
    gender: '',
  }
}
