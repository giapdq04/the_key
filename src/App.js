// App.js
import Cookies from "js-cookie";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axiosClient from "./apis/axiosClient";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import { publicRoutes } from "./routes/routes";
import { setCourses } from "./store/coursesSlice";
import { setUser } from "./store/userSlice";
import { setEnrolledCourses } from "./store/enrolledCoursesSlice";
import { setSlides } from "./store/slidesSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch thông tin user và danh sách khóa học đã đăng ký
    const fetchUserInfo = async () => {
      const userID = Cookies.get("userID");
      if (userID) {
        try {
          const userResponse = await axiosClient.get(`/user/user-info/${userID}`);
          dispatch(setUser(userResponse.data));
          const enrolledCoursesResponse = await axiosClient.get(
            `course/enrolled-courses/${userID}`
          );
          dispatch(setEnrolledCourses(enrolledCoursesResponse.data));
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu:", error);
        }
      }
    };

    // Fetch danh sách khóa học
    const fetchCourses = async () => {
      try {
        const response = await axiosClient.get("/course/all-courses");
        dispatch(setCourses(response.data));
      } catch (error) {
        console.error("Lỗi khi lấy danh sách khóa học:", error);
      }
    };

    const fetchSlides = async () => {
      try {
        const response = await axiosClient.get("/slide");
        if (Array.isArray(response.data)) {
          dispatch(setSlides(response.data));
        } else {
          console.error("Dữ liệu slides không phải là array:", response.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy slides:", error);
      }
    };

    fetchUserInfo();
    fetchCourses();
    fetchSlides();
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