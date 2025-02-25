import config from '../config';
import Home from '../pages/Home/Home';
import LearningPath from '../pages/LearningPath/LearningPath';
import Blog from '../pages/Blog/Blog';
import CourseDetail from "../pages/CourseDetail/CourseDetail";

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.learningPath, component: LearningPath },
    { path: config.routes.blog, component: Blog },
    { path: config.routes.courses, component: CourseDetail }, // Sử dụng :slug để khớp với URL động
];

export { publicRoutes };