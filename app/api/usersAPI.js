import ajax from '../utils/ajax'
import config from '../config/index'

const { API_PROTOCOL, API_HOST } = config

const getUsers = () => ajax(`${API_PROTOCOL}/${API_HOST}/users`, {})

export default {
  getUsers,
}
