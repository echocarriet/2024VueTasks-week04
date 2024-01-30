export default {
  props: ['product'],
  data() {
    return {
      delProductModal: null,
    }
  },
  methods: {
    openModal() {
      this.delProductModal.show();
    },
    closeModal() {
      this.delProductModal.hide();
    }
  },
  mounted() {
    this.delProductModal = new bootstrap.Modal(this.$refs.delProductModal,
      {
        keyboard: false,
        backdrop: 'static'
      }
    );
  },
  template: `<div class="modal fade" id="delProductModal" ref="delProductModal" tabindex="-1"
  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header bg-danger">
        <h1 class="modal-title fs-5 text-white" id="exampleModalLabel">刪除產品</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        是否刪除「{{ product.title }}」商品(刪除後將無法恢復)。
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
        <button type="button" class="btn btn-danger" @click.prevent="$emit('delProduct')">確認刪除</button>
      </div>
    </div>
  </div>
</div>`,
}