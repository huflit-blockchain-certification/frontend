import { HiOutlineChartPie, HiOutlineIdentification, HiOutlineUserCircle } from 'react-icons/hi'
import { AiOutlineSafetyCertificate, AiOutlineFieldTime, AiOutlineSnippets } from 'react-icons/ai'
import { SlGraduation } from 'react-icons/sl'
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || 'v1'
const API_URL = process.env.NEXT_PUBLIC_API_URL || `http://localhost:3001/api/${API_VERSION}`
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || ''
const ACCESS_TOKEN = 'accessToken'
const REFRESH_TOKEN = 'refreshToken'
const ERROR_MESSAGE = 'Đã có lỗi xảy ra !'
const PLUGIN_NAMES = {
  OVERVIEW: {
    NAME: 'Tổng quan',
    SLUG: '/',
    ICON: <HiOutlineChartPie size={20} />,
    ROLES: ['UNIVERSITY', 'STUDENT', 'DOET'],
  },
  USERS: {
    NAME: 'Tài khoản',
    SLUG: '/user',
    ICON: <HiOutlineUserCircle size={20} />,
    ROLES: ['UNIVERSITY', 'STUDENT', 'DOET'],
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
    ROLES: ['UNIVERSITY', 'STUDENT', 'DOET'],
  },
}
//Redux

const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN'
export {
  API_VERSION,
  API_URL,
  API_KEY,
  SET_ACCESS_TOKEN,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  ERROR_MESSAGE,
  PLUGIN_NAMES,
}
