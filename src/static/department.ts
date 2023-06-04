const departmentOptions = [
  { value: 'Khoa Công nghệ thông tin', label: 'Khoa Công nghệ thông tin' },
  { value: 'Khoa Kỹ thuật phần mềm', label: 'Khoa Kỹ thuật phần mềm' },
  { value: 'Khoa Hệ thống thông tin', label: 'Khoa Hệ thống thông tin' },
  { value: 'Khoa Khoa học máy tính', label: 'Khoa Khoa học máy tính' },
  { value: 'Khoa Quản trị mạng', label: 'Khoa Quản trị mạng' },
  { value: 'Khoa Truyền thông đa phương tiện', label: 'Khoa Truyền thông đa phương tiện' },
  { value: 'Khoa Kỹ thuật điện tử', label: 'Khoa Kỹ thuật điện tử' },
  { value: 'Khoa Kỹ thuật viễn thông', label: 'Khoa Kỹ thuật viễn thông' },
  { value: 'Khoa Kỹ thuật máy tính', label: 'Khoa Kỹ thuật máy tính' },
  { value: 'Khoa Công nghệ kỹ thuật điện', label: 'Khoa Công nghệ kỹ thuật điện' },
  { value: 'Khoa Công nghệ kỹ thuật điện tử', label: 'Khoa Công nghệ kỹ thuật điện tử' },
  { value: 'Khoa Kỹ thuật ô tô', label: 'Khoa Kỹ thuật ô tô' },
  { value: 'Khoa Kỹ thuật xây dựng', label: 'Khoa Kỹ thuật xây dựng' },
  { value: 'Khoa Kỹ thuật cơ khí', label: 'Khoa Kỹ thuật cơ khí' },
  { value: 'Khoa Kỹ thuật công trình xây dựng', label: 'Khoa Kỹ thuật công trình xây dựng' },
  { value: 'Khoa Kiến trúc', label: 'Khoa Kiến trúc' },
  { value: 'Khoa Quản trị kinh doanh', label: 'Khoa Quản trị kinh doanh' },
  { value: 'Khoa Marketing', label: 'Khoa Marketing' },
  { value: 'Khoa Tài chính ngân hàng', label: 'Khoa Tài chính ngân hàng' },
  { value: 'Khoa Kế toán', label: 'Khoa Kế toán' },
  { value: 'Khoa Quản trị nhân lực', label: 'Khoa Quản trị nhân lực' },
  { value: 'Khoa Quản trị khách sạn', label: 'Khoa Quản trị khách sạn' },
  { value: 'Khoa Du lịch và lữ hành', label: 'Khoa Du lịch và lữ hành' },
  { value: 'Khoa Ngôn ngữ Anh', label: 'Khoa Ngôn ngữ Anh' },
  { value: 'Khoa Ngôn ngữ Nhật', label: 'Khoa Ngôn ngữ Nhật' },
  { value: 'Khoa Ngôn ngữ Hàn Quốc', label: 'Khoa Ngôn ngữ Hàn Quốc' },
  { value: 'Khoa Ngôn ngữ Trung Quốc', label: 'Khoa Ngôn ngữ Trung Quốc' },
  { value: 'Khoa Văn hóa học', label: 'Khoa Văn hóa học' },
  { value: 'Khoa Lịch sử', label: 'Khoa Lịch sử' },
  { value: 'Khoa Triết học', label: 'Khoa Triết học' },
  { value: 'Khoa Văn học', label: 'Khoa Văn học' },
  { value: 'Khoa Đông phương học', label: 'Khoa Đông phương học' },
  { value: 'Khoa Luật học', label: 'Khoa Luật học' },
  { value: 'Khoa Khoa học xã hội', label: 'Khoa Khoa học xã hội' },
  { value: 'Khoa Tâm lý học', label: 'Khoa Tâm lý học' },
  { value: 'Khoa Sư phạm Tiếng Anh', label: 'Khoa Sư phạm Tiếng Anh' },
  { value: 'Khoa Sư phạm Tiếng Việt', label: 'Khoa Sư phạm Tiếng Việt' },
  { value: 'Khoa Sư phạm Toán học', label: 'Khoa Sư phạm Toán học' },
  { value: 'Khoa Sư phạm Vật lý', label: 'Khoa Sư phạm Vật lý' },
  { value: 'Khoa Sư phạm Hóa học', label: 'Khoa Sư phạm Hóa học' },
  { value: 'Khoa Sư phạm Sinh học', label: 'Khoa Sư phạm Sinh học' },
  { value: 'Khoa Sư phạm Ngữ văn', label: 'Khoa Sư phạm Ngữ văn' },
  { value: 'Khoa Sư phạm Lịch sử', label: 'Khoa Sư phạm Lịch sử' },
  { value: 'Khoa Sư phạm Địa lý', label: 'Khoa Sư phạm Địa lý' },
  { value: 'Khoa Sư phạm Công nghệ', label: 'Khoa Sư phạm Công nghệ' },
  { value: 'Khoa Y học', label: 'Khoa Y học' },
  { value: 'Khoa Nha khoa', label: 'Khoa Nha khoa' },
  { value: 'Khoa Dược học', label: 'Khoa Dược học' },
  { value: 'Khoa Kỹ thuật y sinh', label: 'Khoa Kỹ thuật y sinh' },
  { value: 'Khoa Khoa học máy tính ứng dụng', label: 'Khoa Khoa học máy tính ứng dụng' },
  { value: 'Khoa Hệ thống thông tin ứng dụng', label: 'Khoa Hệ thống thông tin ứng dụng' },
  { value: 'Khoa Quản trị mạng ứng dụng', label: 'Khoa Quản trị mạng ứng dụng' },
]

export { departmentOptions }
