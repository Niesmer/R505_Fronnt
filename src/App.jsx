import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import RootStore from './RootStore';
import STORE from './store';
import Lobby from './lobby/components/Lobby';
import Login from './login/components/Login';
import Root from './common/components/Root';
import FatalError from './common/components/FatalError';
import Acceuil from './common/components/Acceuil';
import DrawTestView from './drawtest/components/DrawTestView';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <FatalError />,
    loader: async () => {
      STORE.userManager.init();
      return null;
    },
    children: [
      {
        index: true,
        element: <Acceuil />,
      },
      {
        path: 'lobby',
        loader: async () => {
          await STORE.userManager.ready;
          return null;
        },
        element: <Lobby />,
      },
      {
        path: 'login',
        loader: async () => {
          await STORE.userManager.ready;
          return null;
        },
        element: <Login />,
      },
      {
        path: 'drawtest',
        element: <DrawTestView />,
      },
    ],
  },
]);

function App() {
  return (
    <RootStore.Provider value={STORE}>
      <RouterProvider router={router} />
    </RootStore.Provider>
  );
}

export default App;
