import {Route, Routes} from 'react-router-dom'
import routesList from 'constants/routes'
import {Home} from 'screens/index'

const AppRouter = () => {
  return (
    <Routes>
      <Route path={routesList.HOME} element={<Home />} />
    </Routes>
  )
}

export default AppRouter
