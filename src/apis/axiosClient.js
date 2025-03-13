import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosClient.interceptors.request.use(
    async (config) => {
        const accessToken = Cookies.get('accessToken');

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    }, (err) => {
        return Promise.reject(err);
    }
);

axiosClient.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originnalRequest = err.config;

        if (err.response.status === 401 && !originnalRequest._retry) {
            originnalRequest._retry = true;

            const refreshToken = Cookies.get('refreshToken');

            if (!refreshToken) return Promise.reject(err);

            try {
                const res = await axiosClient.post('/refresh-token', {
                    token: refreshToken
                });

                const newAccessToken = res.data.accessToken;
                Cookies.set('accessToken', newAccessToken);

                originnalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return axiosClient(originnalRequest);
            } catch (error) {
                Cookies.remove('accessToken');
                Cookies.remove('refreshToken');

                return Promise.reject(error);
            }
        }

        return Promise.reject(err);
    }
);

export default axiosClient;