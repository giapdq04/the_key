import config from '../config';
import Home from '../pages/Home/Home';
import LearningPath from '../pages/LearningPath/LearningPath';
import Blog from '../pages/Blog/Blog';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.learningPath, component: LearningPath },
    { path: config.routes.blog, component: Blog },
];

export { publicRoutes };