//开发环境
let BASE_URL = ''
const TIME_OUT = 10000

if (import.meta.env.DEV) {
  BASE_URL = '/api'
} else if (import.meta.env.PROD) {
  BASE_URL = 'http://152.136.185.210:5000'
} else {
  BASE_URL = 'http://152.136.185.210:5000'
}

export { BASE_URL, TIME_OUT }
