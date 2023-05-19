import moment from 'moment'
import * as React from 'react'

export interface DACCustomRenderProps {
  field: any
  data: any
}

export function DACCustomRender({ field, data }: DACCustomRenderProps) {
  switch (field) {
    case 'id':
      return (
        <p>
          Mã hồ sơ: <span className="font-bold"> {data}</span>
        </p>
      )
    case 'placeOfBirth':
      return (
        <p>
          Nơi sinh: <span className="font-bold"> {data}</span>
        </p>
      )
    case 'gender':
      return (
        <p>
          Giới tính: <span className="font-bold"> {data}</span>
        </p>
      )
    case 'nation':
      return (
        <p>
          Dân tộc: <span className="font-bold"> {data}</span>
        </p>
      )
    case 'nameTypeCertificate':
      return (
        <p>
          Tên bằng: <span className="font-bold"> {data}</span>
        </p>
      )
    case 'typeCertificate':
      return (
        <p>
          Loại bằng: <span className="font-bold"> {data}</span>
        </p>
      )
    case 'departmentName':
      return (
        <p>
          Khoa: <span className="font-bold"> {data}</span>
        </p>
      )
    case 'levelCertificate':
      return (
        <p>
          Cấp bậc: <span className="font-bold"> {data}</span>
        </p>
      )
    case 'studentName':
      return (
        <p>
          Cho: <span className="font-bold"> {data}</span>
        </p>
      )
    case 'dateOfBirth':
      return (
        <p>
          Ngày sinh:
          <span className="font-bold">{moment(data).format('DD-MM-YYYY')}</span>
        </p>
      )
    case 'year':
      return (
        <p>
          Năm tốt nghiệp: <span className="font-bold"> {data}</span>
        </p>
      )
    case 'ranking':
      return (
        <p>
          Xếp loại tốt nghiệp: <span className="font-bold"> {data}</span>
        </p>
      )
    case 'formOfTraining':
      return (
        <p>
          Hình thức đào tạo: <span className="font-bold"> {data}</span>
        </p>
      )
    case 'registrationNum':
      return (
        <p>
          Số hiệu: <span className="font-bold"> {data}</span>
        </p>
      )
    case 'idNumber':
      return (
        <p>
          Số vào sổ: <span className="font-bold"> {data}</span>
        </p>
      )
    case 'universityName':
      return (
        <p>
          Trường: <span className="font-bold"> {data}</span>
        </p>
      )
    case 'major':
      return (
        <p>
          Ngành: <span className="font-bold"> {data}</span>
        </p>
      )
    case 'CGPA':
      return (
        <p>
          CGPA: <span className="font-bold"> {data}</span>
        </p>
      )
    case 'formOFTraining':
      return (
        <p>
          Hình thức đào tạo: <span className="font-bold"> {data}</span>
        </p>
      )
    case 'ranking':
      return (
        <p>
          Xếp loại tốt nghiệp: <span className="font-bold"> {data}</span>
        </p>
      )
    default:
      return <></>
  }
}
