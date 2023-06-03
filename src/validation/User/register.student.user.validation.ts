import { dateMinimum100Y, dateUpTo6Y } from '@/constants'
import * as yup from 'yup'

const registerStudentSchema = yup.object().shape({
  name: yup
    .string()
    .required('Tên không được để trống')
    .min(3, 'Tên sinh viên cần ít nhất 3 ký tự')
    .max(50, 'Tên sinh viên không được vượt quá 50 ký tự')
    .matches(
      /^[^\d!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~0-9]+$/,
      'Tên sinh viên không được có ký tự đặc biệt và số'
    ),
  phone: yup
    .string()
    .required('Số điện thoại không được để trống')
    .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ'),
  gender: yup.string().required('Giới tính không được để trống'),
  address: yup.string().required('Địa chỉ không được để trống'),
  email: yup.string().email('Không đúng định dạng email').required('Email không được để trống'),
  identity: yup
    .string()
    .required('CMND không được để trống')
    .matches(/^[0-9]{12}$/, 'CMND phải có 12 số'),
  password: yup.string().required('Mật khẩu không được để trống'),
  nation: yup.string().required('Dân tộc không được để trống'),
  dateOfBirth: yup
    .date()
    .required('Ngày sinh không được để trống')
    .min(dateMinimum100Y)
    .max(dateUpTo6Y),
  userName: yup
    .string()
    .oneOf([yup.ref('identity')], 'Tên tài khoản không khớp với CMND')
    .min(9)
    .max(12)
    .matches(/^[0-9]+$/),
  roles: yup.array().min(1),
})

const editStudentSchema = yup.object().shape({
  //Edit student there is no fields name email identity password
  phone: yup
    .string()
    .required('Số điện thoại không được để trống')
    .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ'),
  gender: yup.string().required('Giới tính không được để trống'),
  address: yup.string().required('Địa chỉ không được để trống'),
  nation: yup.string().required('Dân tộc không được để trống'),
  dateOfBirth: yup
    .date()
    .required('Ngày sinh không được để trống')
    .min(dateMinimum100Y)
    .max(dateUpTo6Y),
  userName: yup
    .string()
    .oneOf([yup.ref('identity')], 'Tên tài khoản không khớp với CMND')
    .min(9)
    .max(12)
    .matches(/^[0-9]+$/),
  roles: yup.array().min(1),
})

export { registerStudentSchema, editStudentSchema }
