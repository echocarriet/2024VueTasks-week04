import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

    const app = createApp({
      data() {
        return {
          apiUrl: 'https://vue3-course-api.hexschool.io',
          user: {
            username: '',
            password: '',
          }
        }
      },
      methods: {
        login() {
          axios.post(`${this.apiUrl}/v2/admin/signin`, this.user)
            .then((res) => {
              alert(res.data.message);
              // 解構式取出token, expired
              const { token, expired } = res.data;
              // 把token存入cookie
              document.cookie = `carrieToken=${token}; expires=${new Date(expired)};`;
              // 進入後台商品頁面
              window.location = 'index.html';

            })
            .catch((err) => {
              alert(err.response.data.message)
            })
        },
      },
    });

    app.mount('#app');