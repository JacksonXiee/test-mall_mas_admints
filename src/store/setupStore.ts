import {useLogin} from './useLogin'
import { useMain } from './useMain'
//pinia

function setupStore(){
  const Login = useLogin()
  const Main = useMain()
  Login.loadLocalLogin()
  // Main.getInitialDataAction()
}

export default setupStore
