export default {
  props: ['product', 'isNew'],
  data() {
    return {
      productModal: null,
    }
  },
  methods: {
    openModal() {
      this.productModal.show();
    },
    closeModal() {
      this.productModal.hide();
    }
  },
  mounted() {
    this.productModal = new bootstrap.Modal(this.$refs.productModal,
      {
        keyboard: false,
        backdrop: 'static'
      }
    );    
  },
  template: `
  <div class="modal fade" id="productModal" ref="productModal" tabindex="-1" aria-labelledby="exampleModalLabel"
  aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h3 class="modal-title fs-5 text-white">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h3>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-5">
                <label for="imageUrl" class="form-label">主要圖片</label>
                <input type="email" class="form-control mb-2" id="imageUrl" placeholder="請輸入圖片連結"
                  v-model="product.imageUrl">
                <img class="img-fluid" :src="product.imageUrl">
              </div>
              <h3 class="mb-3">多圖新增</h3>
              <div v-if="Array.isArray(product.imagesUrl)">
                <div class="mb-1" v-for="(image, key) in product.imagesUrl" :key="key">
                  <div class="mb-3">
                    <label :for="key" class="form-label">圖片網址</label>
                    <input :id="key" v-model="product.imagesUrl[key]" type="text" class="form-control"
                      placeholder="請輸入圖片連結">
                  </div>
                  <img class="img-fluid" :src="image">
                </div>
                <div v-if="!product.imagesUrl.length || product.imagesUrl[product.imagesUrl.length-1]">
                  <button class="btn btn-outline-primary btn-sm d-block w-100" @click="product.imagesUrl.push('')">
                    新增圖片
                  </button>
                </div>
                <div v-else>
                  <button class="btn btn-outline-danger btn-sm d-block w-100" @click="product.imagesUrl.pop()">
                    刪除圖片
                  </button>
                </div>
              </div>
              <div v-else>
                <button type="button" class="btn btn-outline-primary btn-sm w-100"
                  @click="createImages">新增圖片</button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input type="email" class="form-control" id="title" placeholder="請輸入標題" v-model="product.title">
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="mb-3">
                    <label for="category" class="form-label">分類</label>
                    <input type="text" class="form-control" id="category" placeholder="請輸入分類"
                      v-model="product.category">
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="mb-3">
                    <label for="unit" class="form-label">單位</label>
                    <input type="text" class="form-control" id="unit" placeholder="請輸入單位" v-model="product.unit">
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="mb-3">
                    <label for="originPrice" class="form-label">原價</label>
                    <input type="number" class="form-control" id="originPrice" min="0" placeholder="請輸入原價"
                      v-model.price="product.origin_price">
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="mb-3">
                    <label for="price" class="form-label">售價</label>
                    <input type="number" class="form-control" id="price" min="0" placeholder="請輸入售價"
                      v-model.price="product.price">
                  </div>
                </div>
              </div>
              <hr>
              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea class="form-control" id="description" rows="3" placeholder="請輸入產品描述"
                  v-model="product.description"></textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea class="form-control" id="content" rows="3" placeholder="請輸入說明內容"
                  v-model="product.content"></textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="is_enabled"
                    v-model="product.is_enabled">
                  <label class="form-check-label" for="is_enabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click.prevent="$emit('updateProduct')">確認</button>
        </div>
      </div>
    </div>
  </div>`,
}