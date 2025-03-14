import Cookies from "js-cookie";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Sửa "react-router" thành "react-router-dom"
import { ToastContainer } from "react-toastify";
import axiosClient from "./apis/axiosClient";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import { publicRoutes } from "./routes/routes";
import { setCourses } from "./store/courseSlice";
import { setUser } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch thông tin user
    const fetchUserInfo = async () => {
      const userID = Cookies.get("userID");

      if (userID) {
        try {
          const response = await axiosClient.get(`/user/user-info/${userID}`);
          dispatch(setUser(response.data));
        } catch (error) {
          console.error("Lỗi khi lấy thông tin người dùng:", error);
        }
      }
    };

    // Fetch danh sách khóa học từ API
  const fetchCourses = async () => {
    try {
      const response = await axiosClient.get("/course/all-courses");

      dispatch(setCourses(response.data));
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khóa học:", error);
    }
  };

    fetchUserInfo();
    fetchCourses();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer />
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;