import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'

const steps = ['Chọn thông tin thêm', 'Chia sẽ']

interface DACStepperProps {
  children: React.ReactNode | null
  activeStep: number
  setActiveStep: any
  qrURL?: string
}

export function DACStepper({ children, activeStep, setActiveStep, qrURL }: DACStepperProps) {
  const router = useRouter()
  const [skipped, setSkipped] = React.useState(new Set<number>())

  const isStepOptional = (step: number) => {
    return step === 0
  }

  const isStepSkipped = (step: number) => {
    return skipped.has(step)
  }

  const handleNext = () => {
    if (activeStep === steps.length - 1 && qrURL) {
      window.open(qrURL, '_blank')
      return
    }
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }
    setActiveStep((prevActiveStep: any) => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep: any) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const handleCopyToClipBoard = () => {
    navigator.clipboard.writeText(qrURL || '')
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {}
          const labelProps: {
            optional?: React.ReactNode
          } = {}
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      <React.Fragment>
        <Typography sx={{ mt: 2, mb: 1 }}>Bước {activeStep + 1}</Typography>
        {children}
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
            Quay lại
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          <div className="flex">
            {activeStep === steps.length - 1 && (
              <Button onClick={handleCopyToClipBoard}>Lưu đường dẫn</Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Xác thực' : 'Tiếp tục'}
            </Button>
          </div>
        </Box>
      </React.Fragment>
    </Box>
  )
}
