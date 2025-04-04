import config from '../config';
import Blog from '../pages/Blog/Blog';
import CourseDetail from "../pages/CourseDetail/CourseDetail";
import DetailLearningPath from '../pages/DetailLearningPath/DetailLearningPath';
import Home from '../pages/Home/Home';
import Learning from '../pages/Learning/Learning';
import LearningCenter from '../pages/LearningCenter/LearningCenter';
import LearningPath from '../pages/LearningPath/LearningPath';
import Profile from '../pages/Profile/Profile';
import Setting from '../pages/Setting/Setting';

const publicRoutes = [
    {path: config.routes.home, component: Home},
    {path: config.routes.learningPath, component: LearningPath},
    {path: config.routes.blog, component: Blog},
    {path: config.routes.courses, component: CourseDetail},
    {path: config.routes.learning, component: Learning, layout: null},
    {path: config.routes.detailLearningPath, component: DetailLearningPath},
    {path: config.routes.profile, component: Profile},
    {path: config.routes.setting, component: Setting, layout: null},
    {path: config.routes.learningCenter, component: LearningCenter}
];

export {publicRoutes};
