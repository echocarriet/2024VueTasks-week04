export default {
  props: ['pages'],
  template: `
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled : !pages.has_pre }">
        <a class="page-link" href="#" @click.prevent="$emit('update-page', pages.current_page-1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" :class="{ active : item === pages.current_page}"
        v-for="item in pages.total_pages" :key="item">
        <a class="page-link" href="#" @click.prevent="$emit('update-page', item)">{{item}}</a>
      </li>
      <li class="page-item" :class="{ disabled : !pages.has_next }">
        <a class="page-link" href="#" @click.prevent="$emit('update-page', pages.current_page+1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>`,
}