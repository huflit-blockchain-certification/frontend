import * as yup from 'yup'

const RecipientProfileSchema = yup.object().shape({
  iU: yup.string().required('University is required'),
  iSt: yup.string().required('Student is required'),
  departmentName: yup.string().required('Department is required'),
  studentName: yup.string().required('Student is required'),
  universityName: yup.string().required('University is required'),
  dateOfBirth: yup.string().required('Date of Birth is required'),
  year: yup.string().required('Year is required'),
  nameCourse: yup.string().required('Course is required'),
  major: yup.string().required('Major is required'),
  placeOfBirth: yup.string().required('Place of Birth is required'),
  nation: yup.string().required('Nation is required'),
  ranking: yup.string().required('Ranking is required'),
  formOfTraining: yup.string().required('Form of Training is required'),
  CGPA: yup.number().required('CGPA is required'),
  gender: yup.string().required('Gender is required'),
})

export { RecipientProfileSchema }
