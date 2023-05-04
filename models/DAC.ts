export enum Ranking {
  EXCELLENT = 'EXCELLENT',
  VERY_GOOD = 'VERY_GOOD',
  GOOD = 'GOOD',
  AVERAGE_GOOD = 'AVERAGE_GOOD',
  ORDINAL = 'ORDINAL',
}

export enum FormOfTraining {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  DISTANCE_LEARNING = 'DISTANCE_LEARNING',
  GUIDED_SELF_LEARNING = 'GUIDED_SELF_LEARNING',
}
export enum DACGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export interface DAC {
  _id: string
  id: string
  idNumber: string | null // IDENTIFICATION NUMBER
  registrationNum: string | null // REGISTRATION NUMBER
  iU: string //idIdentityUniversity
  iSt: string //idIdentityStudent,
  departmentName: string
  studentName?: string
  universityName?: string
  placeOfBirth: string
  nation: string
  dateOfBirth?: Date
  year?: string
  nameCourse?: string
  major?: string
  nameTypeCertificate: string | null
  typeCertificate: string | null
  levelCertificate: number | null
  ranking?: Ranking
  dateOfIssuing: Date | null
  formOfTraining?: FormOfTraining
  CGPA?: string
  gender?: DACGender
  dispensingStatus: boolean
}
