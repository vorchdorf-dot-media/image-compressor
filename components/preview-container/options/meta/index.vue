<template>
  <form @submit="noop">
    <div class="input-container">
      <label for="title-input">Title</label>
      <input
        id="title-input"
        type="text"
        @keyup="(evt) => debounceTitle(evt, evt.target.value)"
      />
      <label for="description-input">Description</label>
      <textarea
        id="description-input"
        cols="30"
        rows="10"
        @keyup="(evt) => debounceDescription(evt, evt.target.value)"
      />
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import debounce from 'lodash/debounce';
export default Vue.extend({
  data(): {
    debounceDescription?: (e: KeyboardEvent, description: string) => void;
    debounceTitle?: (e: KeyboardEvent, title: string) => void;
    description?: string;
    title?: string;
  } {
    return {
      description: undefined,
      title: undefined
    };
  },
  created() {
    this.debounceDescription = debounce(this.setDescription, 500);
    this.debounceTitle = debounce(this.setTitle, 500);
  },
  methods: {
    noop: (e: Event) => e.preventDefault(),
    sanitizer: (s: string): string | null => {
      const sanitized = s && s.trim();
      return sanitized.length ? sanitized : null;
    },
    setDescription(e: KeyboardEvent, description: string): void {
      this.noop(e);
      const current = this.description;
      const sanitized = this.sanitizer(description);
      this.description = sanitized || current;
      this.$emit('data', { description: this.description });
    },
    setTitle(e: KeyboardEvent, title: string): void {
      this.noop(e);
      const current = this.title;
      const sanitized = this.sanitizer(title);
      this.title = sanitized || current;
      this.$emit('data', { title: this.title });
    }
  }
});
</script>

<style lang="scss" scoped></style>
