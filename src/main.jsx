import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import {router} from "./router.jsx";
import { AuthContextProvider } from './context/AuthContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
    <h1 className="absolute top-[5%] left-0 w-full text-center font-bold ">React Supabase Auth Testing Python project</h1>

    <AuthContextProvider>
    <RouterProvider router={router}/>
    </AuthContextProvider>
    </>
  </StrictMode>,
)
