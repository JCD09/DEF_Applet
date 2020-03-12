<template>
<div class="body">
  <p>{{size}}</p>

  <b-button v-b-modal.addValue >Value</b-button>
    <b-modal 
      ref="valueModal"
      id="addValue"
      title="Add Value to the Calculator">
      <p>Input Forms Go Here</p>
      <div slot="modal-footer">
            <b-btn squared variant="secondary">Insert New Value</b-btn>
            <b-btn squared variant="secondary" @click="hideModal">Exit</b-btn>
      </div>
    </b-modal>
  <b-button>Alternative</b-button>
</div>
</template>


<script>
import Value from './Value.vue'
import Alternative from './Alternative.vue'

export default {
  name: 'Body',
   data() {
      return {
        show: false,
      }
   },

  methods:{
    hideModal() {
        this.$refs['valueModal'].hide()
      },

  },
  computed:{
    size(){
      return this.$store.getters.size
    }
  }
}
</script>