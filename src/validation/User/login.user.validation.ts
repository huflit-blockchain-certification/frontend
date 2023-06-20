import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  userName: yup
    .string()
    .required('Tên đăng nhập không được để trống')
    .min(9, 'Tên đăng nhập ít nhất có 9 kí tự')
    .max(12, 'Tên đăng nhập có tối đa 12 kí tự')
    .matches(/^[0-9]+$/, 'Tên đăng nhập không hợp lệ'),
  password: yup
    .string()
    .required('Mật khẩu không được để trống')
    .min(6, 'Mật khẩu có ít nhất 6 kí tự'),
})
