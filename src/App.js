import { BrowserRouter, Route, Routes } from "react-router";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import { publicRoutes } from './routes/routes';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <DefaultLayout>
                    <Page />
                  </DefaultLayout>}
              />
            )
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
