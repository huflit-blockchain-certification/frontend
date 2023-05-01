import * as yup from 'yup'

const graduationCourseSchema = yup.object().shape({
  name: yup.string().required('Tên bằng không được để trống'),
  startDate: yup.date().required('Ngày bắt đầu không được để trống'),
  endDate: yup
    .date()
    .min(yup.ref('startDate'), 'Ngày bắt đầu không thể trước ngày kết thúc')
    .required('Ngày kết thúc không được để trống'),
})

export { graduationCourseSchema }
