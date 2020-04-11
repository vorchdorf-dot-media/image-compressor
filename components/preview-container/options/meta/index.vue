<template>
  <form @submit="noop">
    <h2>Meta Options</h2>
    <div class="input-container">
      <label for="title-input">Title</label>
      <div class="input-wrapper">
        <input
          id="title-input"
          type="text"
          :value="title || defaultTitle"
          @keyup="(evt) => debounceTitle(evt, evt.target.value)"
        />
      </div>
      <label for="description-input">Description</label>
      <div class="input-wrapper">
        <textarea
          id="description-input"
          rows="4"
          placeholder="Enter description for image"
          :value="description || defaultDescription"
          @keyup="(evt) => debounceDescription(evt, evt.target.value)"
        />
      </div>
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
    upload: boolean;
  } {
    return {
      description: undefined,
      title: undefined,
      upload: process.env.UPLOAD === 'true'
    };
  },
  computed: {
    id(): string {
      const { id = '' } = this.$store.getters['statemachine/state'];
      return id;
    },
    defaultDescription(): string {
      const { description = '' } =
        this.$store.getters['queue/image'](this.id) || {};
      return description;
    },
    defaultTitle(): string {
      const { title = '' } = this.$store.getters['queue/image'](this.id) || {};
      return title;
    }
  },
  created() {
    this.debounceDescription = debounce(this.setDescription, 1000);
    this.debounceTitle = debounce(this.setTitle, 1000);
  },
  methods: {
    async fetchAlbums(): Promise<{ [key: string]: any }> {
      if (!this.upload) {
        return {};
      }
      const self: any = this;
      const query = {
        query: '{ albums { _id title description } }'
      };
      const { data } = await self.$http.post('/api/graphql', query);
      console.log(data);
      return data;
    },
    noop: (e: Event) => e.preventDefault(),
    sanitizer: (s: string): string | null => {
      const sanitized = s && s.trim();
      return sanitized.length ? sanitized : null;
    },
    setDescription(e: KeyboardEvent, description: string): void {
      this.noop(e);
      const sanitized = this.sanitizer(description);
      this.description = sanitized || '';
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
