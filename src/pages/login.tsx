import { Input } from '@/components/common/Form/Input/Input.component'
import { RefreshTokenDTO } from '@/DTO/User/login.dto.user'
import { APP_NAME } from '@/static'
import { FormHeader, MainLayout } from '@/layouts'
import { loginSchema } from '@/validation/User/login.user.validation'
import { yupResolver } from '@hookform/resolvers/yup'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { LoadingIndicator } from '@/components/common/LoadingIndicator/loadingIndicator.component'
import Button from '@mui/material/Button'
import { useCookies } from 'react-cookie'
import { LoginnedPage } from '@/components/common/Auth/loggined.component'
import { AuthApi } from './api/Auth/auth.api'
import { errorMessage } from '@/components/common/Toast/response.toast.component'
export interface LoginProps {}

export default function LoginPage(props: LoginProps) {
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies<any>(['access_token', 'refresh_token'])

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RefreshTokenDTO>({
    resolver: yupResolver(loginSchema),
    defaultValues: { userName: '', password: '' },
  })

  const onSubmit = async (data: RefreshTokenDTO) => {
    try {
      await AuthApi.login(data, async (record) => {
        if (!record) return
        const { accessToken, refreshToken } = record.data.tokens
        if (cookies.access_token || cookies.refresh_token) {
          removeCookie('access_token', { httpOnly: false, path: '/' })
          removeCookie('refresh_token', { httpOnly: false, path: '/' })
        }
        const now = new Date()
        const oneWeek = 7 * 24 * 60 * 60 * 1000 // one week in milliseconds
        const expires = new Date(now.getTime() + oneWeek)
        setCookie('access_token', accessToken, { httpOnly: false, expires, path: '/' })
        setCookie('refresh_token', refreshToken, { httpOnly: false, expires, path: '/' })
        localStorage.setItem('user', JSON.stringify(record.data.userData))
        router.push('/')
      })
    } catch (err: any) {
      errorMessage(err.message)
    }
  }

  if (isSubmitting) return <LoadingIndicator />

  return (
    <LoginnedPage>
      <FormHeader disableHeader onSubmit={handleSubmit(onSubmit)}>
        <div className="flex h-screen">
          <div className="m-auto">
            <div className="flex flex-col gap-5 p-10 shadow w-96 rounded-lg hover:shadow-lg">
              <div className="text-center font-semibold text-2xl">{APP_NAME}</div>
              <div className="flex flex-col gap-3">
                <Input label="Tên đăng nhập" name="userName" control={control} required fullWidth />
                <Input
                  label="Mật khẩu "
                  name="password"
                  control={control}
                  required
                  fullWidth
                  type="password"
                />
              </div>
              <div className="m-auto">
                <Button type="submit" variant="outlined">
                  Đăng nhập
                </Button>
              </div>
            </div>
          </div>
        </div>
      </FormHeader>
    </LoginnedPage>
  )
}

LoginPage.Layout = MainLayout
