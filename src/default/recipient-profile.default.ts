import generator from '@/utils/generator'

export const recipientProfileDefaultForm = {
  id: `DAC${generator.generateRandomString(6)}`,
  iU: '',
  iSt: '',
  departmentName: '',
  studentName: '',
  universityName: '',
  dateOfBirth: null,
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
