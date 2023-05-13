import moment from 'moment'

const dateFormat = (date: { date: any }) => moment.utc(date).format('DD/MM/YYYY')
const captalizeFirstWord = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
export { dateFormat, captalizeFirstWord }
