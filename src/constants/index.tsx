import { HiOutlineChartPie, HiOutlineIdentification, HiOutlineUserCircle } from 'react-icons/hi'
import { AiOutlineSafetyCertificate, AiOutlineFieldTime, AiOutlineSnippets } from 'react-icons/ai'
import { SlGraduation } from 'react-icons/sl'
import { PluginNames } from 'models'
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || 'v1'
const API_URL = process.env.NEXT_PUBLIC_API_URL || `http://localhost:3001/api/${API_VERSION}`
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || ''
const ACCESS_TOKEN = 'accessToken'
const REFRESH_TOKEN = 'refreshToken'
const ERROR_MESSAGE = 'Đã có lỗi xảy ra !'
const UNIVERSITY_ROLE = 'UNIVERSITY'
const STUDENT_ROLE = 'STUDENT'
const DOET_ROLE = 'DOET'

const PLUGIN_NAMES = {
  // OVERVIEW: {
  //   NAME: 'Tổng quan',
  //   SLUG: '/',
  //   ICON: <HiOutlineChartPie size={20} />,
  //   ROLES: ['UNIVERSITY', 'DOET'],
  // },
  USERS: {
    NAME: 'Tài khoản',
    SLUG: '/user',
    ICON: <HiOutlineUserCircle size={20} />,
    ROLES: ['UNIVERSITY', 'DOET'],
  },
  RECIPIENT_PROFILE: {
    NAME: 'Hồ sô người nhận',
    SLUG: '/recipient-profile',
    ROLES: ['UNIVERSITY', 'DOET'],
    ICON: <HiOutlineIdentification size={20} />,
  },
  CERT_TYPE: {
    NAME: 'Loại bằng',
    SLUG: '/cert-type',
    ICON: <AiOutlineSnippets size={20} />,
    ROLES: ['DOET'],
  },
  GRADUAUATION_COURSE: {
    NAME: 'Khóa tốt nghiệp',
    SLUG: '/graduation-course',
    ROLES: ['UNIVERSITY'],
    ICON: <SlGraduation size={20} />,
  },
  GRADUAUATION_YEAR: {
    NAME: 'Năm tốt nghiệp',
    SLUG: '/graduation-year',
    ROLES: ['DOET'],
    ICON: <AiOutlineFieldTime size={20} />,
  },
  DAC: {
    NAME: 'Văn bằng chứng chỉ',
    SLUG: '/dac',
    ICON: <AiOutlineSafetyCertificate size={20} />,
    ROLES: ['UNIVERSITY', 'DOET'],
  },
}
//Redux

const defaultPlugins: PluginNames[] = [
  // {
  //   name: PLUGIN_NAMES.OVERVIEW.NAME,
  //   icon: PLUGIN_NAMES.OVERVIEW.ICON,
  //   slug: PLUGIN_NAMES.OVERVIEW.SLUG,
  //   roles: PLUGIN_NAMES.OVERVIEW.ROLES,
  // },
  {
    name: PLUGIN_NAMES.USERS.NAME,
    icon: PLUGIN_NAMES.USERS.ICON,
    slug: PLUGIN_NAMES.USERS.SLUG,
    roles: PLUGIN_NAMES.USERS.ROLES,
  },
  {
    name: PLUGIN_NAMES.RECIPIENT_PROFILE.NAME,
    icon: PLUGIN_NAMES.RECIPIENT_PROFILE.ICON,
    slug: PLUGIN_NAMES.RECIPIENT_PROFILE.SLUG,
    roles: PLUGIN_NAMES.RECIPIENT_PROFILE.ROLES,
  },
  {
    name: PLUGIN_NAMES.CERT_TYPE.NAME,
    icon: PLUGIN_NAMES.CERT_TYPE.ICON,
    slug: PLUGIN_NAMES.CERT_TYPE.SLUG,
    roles: PLUGIN_NAMES.CERT_TYPE.ROLES,
  },
  {
    name: PLUGIN_NAMES.GRADUAUATION_COURSE.NAME,
    icon: PLUGIN_NAMES.GRADUAUATION_COURSE.ICON,
    slug: PLUGIN_NAMES.GRADUAUATION_COURSE.SLUG,
    roles: PLUGIN_NAMES.GRADUAUATION_COURSE.ROLES,
  },
  {
    name: PLUGIN_NAMES.GRADUAUATION_YEAR.NAME,
    icon: PLUGIN_NAMES.GRADUAUATION_YEAR.ICON,
    slug: PLUGIN_NAMES.GRADUAUATION_YEAR.SLUG,
    roles: PLUGIN_NAMES.GRADUAUATION_YEAR.ROLES,
  },
  {
    name: PLUGIN_NAMES.DAC.NAME,
    icon: PLUGIN_NAMES.DAC.ICON,
    slug: PLUGIN_NAMES.DAC.SLUG,
    roles: PLUGIN_NAMES.DAC.ROLES,
  },
]

const fieldDefault = [
  'nameTypeCertificate',
  'id',
  'typeCertificate',
  'levelCertificate',
  'departmentName',
  'major',
  'universityName',
  'studentName',
  'gender',
  'placeOfBirth',
  'dateOfBirth',
  'nation',
  'registrationNum',
  'idNumber',
]
const fieldShareExtend = ['CGPA', 'formOfTraining', 'ranking']
const dateUpTo6Y = new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 6) // go back by 6 years
const dateMinimum100Y = new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 100) // go back by 100 years

const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN'
const SET_CHECKED_FIELD = 'SET_CHECKED_FIELD'

export {
  API_VERSION,
  API_URL,
  API_KEY,
  SET_ACCESS_TOKEN,
  SET_CHECKED_FIELD,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  ERROR_MESSAGE,
  PLUGIN_NAMES,
  UNIVERSITY_ROLE,
  STUDENT_ROLE,
  DOET_ROLE,
  defaultPlugins,
  dateUpTo6Y,
  dateMinimum100Y,
  fieldDefault,
  fieldShareExtend,
}
