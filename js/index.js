import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import pagination from './pagination.js';
import productModal from './productModal.js';
import delProductModal from './delProductModal.js';

const app = createApp({
  components: {
    pagination,
    productModal,
    delProductModal
  },
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io',
      apiPath: 'carriet',
      products: [],
      product: {
        imagesUrl: [],
      },
      pagination: {},
      isNew: false, //判別新增或編輯
    }
  },
  methods: {
    stillLogin() {
      axios.post(`${this.apiUrl}/v2/api/user/check`)
        .then((res) => {
          this.getProducts();
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = 'login.html';
        })
    },
    getProducts(page = 1) {
      axios.get(`${this.apiUrl}/v2/api/${this.apiPath}/admin/products?page=${page}`)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
    },
    openModal(status, item) {
      if (status === 'new') {
        this.product = {
          imagesUrl: [],
        };
        this.isNew = true;
        this.$refs.controlProductModal.openModal();
      } else if (status === 'edit') {
        this.product = JSON.parse(JSON.stringify(item));
        this.isNew = false;
        this.$refs.controlProductModal.openModal();
      } else if (status === 'del') {
        this.product = JSON.parse(JSON.stringify(item));
        this.$refs.controlDelProductModal.openModal();
      }

    },
    updateProduct() {
      let http = 'post';
      let url = `${this.apiUrl}/v2/api/${this.apiPath}/admin/product`;
      if (!this.isNew) {
        http = 'put';
        url = `${this.apiUrl}/v2/api/${this.apiPath}/admin/product/${this.product.id}`;
      }

      axios[http](url, { data: this.product })
        .then((res) => {
          alert(res.data.message);
          // this.productModal.hide();
          // 注意：這邊closeModal() 為子元件productModal.js 中把BS modal方法包在methods中拿來用
          this.$refs.controlProductModal.closeModal();
          this.getProducts();
        })
        .catch((err) => {
          alert(err.response.data.message);
        })

    },
    delProduct() {
      axios.delete(`${this.apiUrl}/v2/api/${this.apiPath}/admin/product/${this.product.id}`)
        .then((res) => {
          alert(res.data.message);
          this.$refs.controlDelProductModal.closeModal();
          this.getProducts();
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
    },
    createImages() {
      this.product.imagesUrl = [];
      this.product.imagesUrl.push('');
    }
  },
  mounted() {
    // 從cookie取出token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)carrieToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
    // 所有axios加上token
    axios.defaults.headers.common.Authorization = token;
    this.stillLogin();
  },
});


app.mount('#app');