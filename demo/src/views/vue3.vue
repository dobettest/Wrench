<template>
  <div class="vue3">
    <div>{{ count }}</div>
    <button @click="add">添加</button>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
export default {
  methods: {
    add() {
      this.count++;
    },
  },
  setup() {
    const count = ref(0);
    return { count };
  },
};
</script>
<style lang="scss" scoped>
.vue3 {
  color: red;
}
</style>