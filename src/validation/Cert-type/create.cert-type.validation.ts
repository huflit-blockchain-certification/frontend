import { EnumCertType } from 'models'
import * as yup from 'yup'

const CertTypeSchema = yup.object().shape({
  name: yup.string().required('Tên bằng không được để trống'),
  type: yup.mixed<EnumCertType>().oneOf(Object.values(EnumCertType)),
  level: yup.number().nullable().min(0, 'Giá trị tối thiểu là 1').max(12, 'Giá trị tối thiểu là 2'),
})

export { CertTypeSchema }
