import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import { ToastProvider } from './prodivers/toasts/toastProvider'
import { ThemeProdiver } from './prodivers/theme/themeProdiver'
import { AuthProdiver } from './prodivers/auth/authProvider'

function App() {


  return (
<ThemeProdiver>
  <ToastProvider>
    <AuthProdiver>
        <RouterProvider router={router}></RouterProvider>
    </AuthProdiver>
  </ToastProvider>
</ThemeProdiver>
  )
}

export default App
