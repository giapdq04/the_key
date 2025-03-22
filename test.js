import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 500, // 500 người dùng đồng thời
  duration: '30s', // Chạy trong 30 giây
};

export default function () {
  let userID = 'your_user_id';
  let slug = 'your_course_slug';

  let urls = [
    `http://localhost:8080/api/course/all-courses`,
    `http://localhost:8080/api/course/enrolled-courses/${userID}`,
    `http://localhost:8080/api/course/course-detail/${slug}`,
    `http://localhost:8080/api/course/${slug}/${userID}`
  ];

  urls.forEach(url => {
    let res = http.get(url);
    check(res, {
      'status is 200': (r) => r.status === 200,
      'response time < 500ms': (r) => r.timings.duration < 500,
    });
    sleep(1);
  });
}
