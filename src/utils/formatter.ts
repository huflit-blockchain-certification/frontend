import moment from 'moment'

const dateFormat = (date: { date: any }) => moment(date).format('DD/MM/YYYY')

export { dateFormat }
