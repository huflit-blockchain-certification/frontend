import moment from 'moment'

const dateFormat = (date: { date: any }) => moment.utc(date).format('DD/MM/YYYY')

export { dateFormat }
