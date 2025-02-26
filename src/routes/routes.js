import config from '../config';
import Home from '../pages/Home/Home';
import LearningPath from '../pages/LearningPath/LearningPath';
import Blog from '../pages/Blog/Blog';
import CourseDetail from "../pages/CourseDetail/CourseDetail";
import Learning from '../pages/Learning/Learning';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.learningPath, component: LearningPath },
    { path: config.routes.blog, component: Blog },
    { path: config.routes.courses, component: CourseDetail },
    { path: config.routes.learning, component: Learning , layout: null},
];

export { publicRoutes };