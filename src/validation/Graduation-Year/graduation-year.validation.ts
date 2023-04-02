import * as yup from 'yup'

const graduationYearSchema = yup.object().shape({
  year: yup.string().required('Năm không được để trống'),
})

export { graduationYearSchema }
