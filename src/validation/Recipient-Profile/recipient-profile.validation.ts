import { dateMinimum100Y, dateUpTo6Y } from '@/constants'
import * as yup from 'yup'
import { ExtendValidation } from '../extend.validation'

const RecipientProfileSchema = yup.object().shape({
  id: yup.string().required('Mã hồ sơ không được để trống').min(5).max(100),
  iU: yup
    .string()
    .required('Trường đại học không được để trống')
    .matches(/^[0-9]{12}$/),
  iSt: yup
    .string()
    .matches(/^[0-9]{12}$/, 'Mã sinh viên phải có 12 số')
    .required('Mã học sinh không được để trống'),
  departmentName: yup.string().required('Khoa không được để trống').min(3).max(50),
  studentName: yup.string().required('Tên học sinh không được để trống').min(3).max(50),
  universityName: yup.string().required('Tên trường đại học không được để trống'),
  dateOfBirth: yup
    .date()
    .required('Ngày sinh không được để trống')
    .min(dateMinimum100Y)
    .max(dateUpTo6Y),
  year: yup.string().required('Năm tốt nghiệp không được để trống'),
  nameCourse: yup.string().required('Tên khóa không được để trống'),
  major: yup.string().required('Ngành không được để trống'),
  placeOfBirth: yup.string().required('Nơi sinh không được để trống'),
  nation: yup.string().required('Dân tộc không được để trống'),
  ranking: yup
    .string()
    .required('Xếp loại không được để trống')
    .test('is-valid-ranking', 'Xếp loại không khớp với CGPA', function (value) {
      const cgpa = this.parent.CGPA
      return ExtendValidation.rankingCategoriesMapping({ ranking: value, cgpa })
    }),
  formOfTraining: yup.string().required('Hình thức đào tạo không được để trống'),
  CGPA: yup
    .number()
    .required('CGPA không được để trống')
    .min(0)
    .max(10)
    .test('is-valid-cgpa', 'CGPA không khớp với xếp loại', function (value) {
      if (!value) return false
      const ranking = this.parent.ranking
      return ExtendValidation.rankingCategoriesMapping({ ranking, cgpa: value })
    }),
  gender: yup.string().required('Giới tình không được để trống'),
})

const EditRecipientProfileSchema = yup.object().shape({
  departmentName: yup.string().required('Khoa không được để trống').min(3).max(50),
  year: yup.string().required('Năm tốt nghiệp không được để trống'),
  nameCourse: yup.string().required('Tên khóa không được để trống'),
  major: yup.string().required('Ngành không được để trống'),
  ranking: yup.string().required('Xếp loại không được để trống'),
  formOfTraining: yup.string().required('Hình thức đào tạo không được để trống'),
  CGPA: yup.number().required('CGPA không được để trống').min(0).max(10),
})

export { RecipientProfileSchema, EditRecipientProfileSchema }
