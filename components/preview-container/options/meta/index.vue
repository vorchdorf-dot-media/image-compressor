<template>
  <form>
    <div class="input-container">
      <label for="title-input">Title</label>
      <input
        id="title-input"
        v-model="title"
        type="text"
        @blur="$emit('data', { title })"
      />
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      title: ''
    };
  }
});
</script>

<style lang="scss" scoped></style>
