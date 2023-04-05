import * as yup from 'yup'

const RecipientProfileSchema = yup.object().shape({
  iU: yup.string().required('Trường đại học không được để trống'),
  iSt: yup.string().required('Học sinh không được để trống'),
  departmentName: yup.string().required('Khoa không được để trống'),
  studentName: yup.string().required('Tên học sinh không được để trống'),
  universityName: yup.string().required('Tên trường đại học không được để trống'),
  dateOfBirth: yup.string().required('Ngày sinh không được để trống'),
  year: yup.string().required('Năm tốt nghiệp không được để trống'),
  nameCourse: yup.string().required('Tên khóa không được để trống'),
  major: yup.string().required('Ngành không được để trống'),
  placeOfBirth: yup.string().required('Nơi sinh không được để trống'),
  nation: yup.string().required('Dân tộc không được để trống'),
  ranking: yup.string().required('Xếp loại không được để trống'),
  formOfTraining: yup.string().required('Hình thức đào tạo không được để trống'),
  CGPA: yup.number().required('CGPA không được để trống'),
  gender: yup.string().required('Giới tình không được để trống'),
})

export { RecipientProfileSchema }
