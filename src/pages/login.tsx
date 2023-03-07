import { Input } from '@/components/common/Form/Input/Input'
import { RefreshTokenDTO } from '@/DTO/User/login.dto.user'
import { ACCESS_TOKEN, APP_NAME, REFRESH_TOKEN } from '@/dynamic'
import { FormLayout, MainLayout } from '@/layouts'
import { loginSchema } from '@/validation/User/login.user.validation'
import { yupResolver } from '@hookform/resolvers/yup'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { login } from './api/User/login.user.api'
import { useRouter } from 'next/router'
import { LoadingIndicator } from '@/components/common/LoadingIndicator/loadingIndicator'
import Button from '@mui/material/Button'
import { useCookies } from 'react-cookie'
import { LoginnedPage } from '@/components/common/Auth/logined'
import { Toast } from '@/components/common/Toast/toast'
export interface LoginProps {}

export default function LoginPage(props: LoginProps) {
  const router = useRouter()
  const [cookies, setCookie] = useCookies<any>(['cookie-name'])

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RefreshTokenDTO>({
    resolver: yupResolver(loginSchema),
    defaultValues: { userName: '', password: '' },
  })

  const onSubmit = (data: RefreshTokenDTO) => {
    login(data, async (record) => {
      if (!record) return
      const { accessToken, refreshToken } = record.data.tokens
      setCookie('access_token', accessToken)
      setCookie('refresh_token', refreshToken)
      setCookie
      router.push('/')
      Toast.fire({ title: 'Login succesfully', icon: 'success' })
    })
  }

  if (isSubmitting) return <LoadingIndicator />

  return (
    <LoginnedPage>
      <FormLayout disableHeader onSubmit={handleSubmit(onSubmit)}>
        <div className="flex h-screen">
          <div className="m-auto">
            <div className="flex flex-col gap-5 p-10 shadow w-96 rounded-lg hover:shadow-lg">
              <div className="text-center font-semibold text-2xl">{APP_NAME}</div>
              <div className="flex flex-col gap-3">
                <Input label="Tên đăng nhập" name="userName" control={control} required fullWidth />
                <Input label="Mật khẩu " name="password" control={control} required fullWidth />
              </div>
              <div className="m-auto">
                <Button type="submit" variant="outlined">
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </FormLayout>
    </LoginnedPage>
  )
}

LoginPage.Layout = MainLayout
