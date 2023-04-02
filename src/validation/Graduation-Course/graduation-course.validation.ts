import * as yup from 'yup'

const graduationCourseSchema = yup.object().shape({
  name: yup.string().required('Tên bằng không được để trống'),
  startDate: yup.date().required(),
  endDate: yup.date().required(),
})

export { graduationCourseSchema }
