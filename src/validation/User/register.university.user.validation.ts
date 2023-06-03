import * as yup from 'yup'

export const registerUniversitySchema = yup.object().shape({
  name: yup
    .string()
    .required('Tên không được để trống')
    .min(3, 'Tên trường đại học cần ít nhất 3 ký tự')
    .max(50, 'Tên trường đại học không được vượt quá 50 ký tự')
    .matches(
      /^[^\d!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~0-9]+$/,
      'Tên trường đại học không được có ký tự đặc biệt và số'
    ),
  phone: yup
    .string()
    .required('Số điện thoại không được để trống')
    .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ'),
  email: yup.string().email('Không đúng định dạng email').required('Email không được để trống'),
  gender: yup.string().required('Giới tính không được để trống'),
  address: yup.string().required('Địa chỉ không được để trống'),
  identity: yup
    .string()
    .matches(/^[0-9]{12}$/, 'CMND phải có 12 số')
    .required('CMND không được để trống'),
  userName: yup
    .string()
    .oneOf([yup.ref('identity')], 'Tên tài khoản không khớp với CMND')
    .min(9)
    .max(12)
    .required('Tên tài khoản không được để trông')
    .matches(/^[0-9]+$/),
  password: yup
    .string()
    .required('Mật khẩu không được để trống')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  roles: yup.array().min(1),
})
