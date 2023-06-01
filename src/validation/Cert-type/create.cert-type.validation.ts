import { CERTIFICATE } from '@/constants'
import { EnumCertType } from 'models'
import * as yup from 'yup'

const CertTypeSchema = yup.object().shape({
  name: yup.string().required('Tên bằng không được để trống'),
  type: yup.mixed<EnumCertType>().oneOf(Object.values(EnumCertType)),
  level: yup
    .number()
    .min(1, 'Giá trị tối thiểu là 1')
    .max(12, 'Giá trị tối thiểu là 2')
    .test('is-valid-cgpa', 'Cấp bậc không được để trống', function (value) {
      const type = this.parent.type
      if (type !== CERTIFICATE) return true
      if (value === undefined) {
        return false
      }
      return true
    }),
})

export { CertTypeSchema }
