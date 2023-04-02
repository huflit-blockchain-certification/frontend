export enum EnumCertType {
  DIPLOMA = 'DIPLOMA',
  CERTIFICATE = 'CERTIFICATE',
}
export interface CertType {
  name: string
  type: EnumCertType | string
  level: number | null
}
