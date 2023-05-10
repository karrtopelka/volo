import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/uk' // import locale
import 'dayjs/locale/en'
import relativeTime from 'dayjs/plugin/relativeTime'

// Don't install timezone with advanced format plugins as it breaks DATE_API_UTC_FORMAT const format

dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(customParseFormat)
dayjs.locale('uk') // use locale
