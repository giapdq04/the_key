import Cookies from "js-cookie";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Sửa "react-router" thành "react-router-dom"
import { ToastContainer } from "react-toastify";
import axiosClient from "./apis/axiosClient";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import { publicRoutes } from "./routes/routes";
import { setUser } from "./store/userSlice";
import { fetchCoursesStart, fetchCoursesSuccess, fetchCoursesFailure } from "./store/courseSlice";

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
    dispatch(fetchCoursesStart()); // Bắt đầu fetch, set loading = true
    console.log("App.js - Fetching courses started"); // Log khi bắt đầu fetch
    try {
      const response = await axiosClient.get("/course/all-courses");
      console.log("App.js - Courses API response:", response.data); // Log dữ liệu thô từ API

      // Không ánh xạ toàn bộ, chỉ thêm thumbnail trực tiếp từ ytbVideoId
      const coursesWithThumbnail = response.data.map((course) => ({
        ...course, // Giữ nguyên tất cả các trường từ API
        thumbnail: `https://img.youtube.com/vi/${course.ytbVideoId}/hqdefault.jpg`, // Gán thumbnail trực tiếp
      }));

      console.log("App.js - Courses with thumbnail:", coursesWithThumbnail); // Log dữ liệu sau khi thêm thumbnail
      dispatch(fetchCoursesSuccess(coursesWithThumbnail)); // Thành công, lưu courses vào store
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khóa học:", error);
      dispatch(fetchCoursesFailure(error.message)); // Thất bại, lưu lỗi
      console.log("App.js - Fetch courses failed:", error.message); // Log lỗi
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