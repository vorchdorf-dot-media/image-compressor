<template>
  <form @submit="noop">
    <h2>Encode Options</h2>
    <div class="input-container">
      <label for="quality-input">Quality</label>
      <div class="button-container quality-buttons">
        <button
          :disabled="quality === 0"
          @click="(evt) => setQuality(evt, --quality)"
        >
          <MinusIcon />
        </button>
        <div class="input-wrapper">
          <input
            id="quality-input"
            type="number"
            :value="quality || defaultQuality"
            @keyup="
              (evt) => debounceQuality(evt, parseInt(evt.target.value, 10))
            "
          />
        </div>
        <button
          :disabled="quality === 100"
          @click="(evt) => setQuality(evt, ++quality)"
        >
          <PlusIcon />
        </button>
      </div>
      <label for="resize-input">Resize</label>
      <div class="button-container">
        <button
          v-for="size in sizes"
          :key="size"
          :class="{ active: resize === size }"
          @click="(evt) => setSize(evt, size)"
        >
          {{ size }}
        </button>
        <div class="input-wrapper">
          <input
            id="resize-input"
            :value="resize || original"
            type="number"
            @keyup="(evt) => debounceSize(evt, parseInt(evt.target.value, 10))"
          />
        </div>
      </div>
      <span>Format</span>
      <div class="button-container format-buttons">
        <button
          v-for="encoding in formats"
          :key="encoding"
          :class="{ active: (format || defaultFormat) === encoding }"
          @click="(evt) => setFormat(evt, encoding)"
        >
          {{ encoding }}
        </button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import debounce from 'lodash/debounce';
import MinusIcon from '~/components/icon/minus.vue';
import PlusIcon from '~/components/icon/plus.vue';
import { FORMATS as formats } from '~/assets/helpers/formats';
import { SIZES } from '~/assets/helpers/sizes';
import { ImageEncoderStore } from '~/assets/helpers/store';
export default Vue.extend({
  components: {
    MinusIcon,
    PlusIcon
  },
  data(): {
    debounceQuality?: (e: KeyboardEvent, quality: number) => void;
    debounceSize?: (e: KeyboardEvent, size: number) => void;
    formats: string[];
    format?: string;
    quality: number;
    resize: number;
  } {
    return {
      formats,
      format: undefined,
      quality: 0,
      resize: 0
    };
  },
  computed: mapState({
    defaultFormat(): string {
      const { mimetype } = this.$store.getters['statemachine/state'];
      this.format = mimetype?.split('/').pop();
      return this.format;
    },
    defaultQuality(): number {
      const format: string = this.format || this.defaultFormat || 'webp';
      const { quality } = this.$store.getters[`${format}/options`];
      this.quality = quality;
      return quality;
    },
    id: ({
      statemachine: {
        state: { id }
      }
    }: ImageEncoderStore): string => id || '',
    original({ originals: { images } }: ImageEncoderStore): number {
      const { height = 0, width = 0 } = images.get(this.id) || {};
      return Math.max(height, width);
    },
    sizes({ originals: { images } }: ImageEncoderStore): number[] {
      const currentSize: any = this.original;
      return SIZES.filter((size: number) => size < currentSize);
    }
  }),
  created() {
    this.debounceQuality = debounce(this.setQuality, 1000);
    this.debounceSize = debounce(this.setSize, 1000);
  },
  methods: {
    noop: (e: Event) => e.preventDefault(),
    setFormat(e: MouseEvent, format: string): void {
      this.noop(e);
      this.format = format;
      this.$emit('data', { mimetype: `image/${format}` });
    },
    setQuality(e: KeyboardEvent, quality: number): void {
      this.noop(e);
      const current = this.quality;
      this.quality = !isNaN(quality) ? quality : this.defaultQuality;
      this.quality =
        this.quality < 0 || this.quality > 100 ? current : this.quality;
      this.$emit('data', {
        quality: this.quality
      });
    },
    setSize(e: MouseEvent | KeyboardEvent, size: number): void {
      this.noop(e);
      const current = this.resize;
      this.resize = !isNaN(size) ? size : this.original;
      this.resize =
        this.resize < 0 || this.resize > this.original ? current : this.resize;
      this.$emit('data', { size: this.resize });
    }
  }
});
</script>

<style lang="scss" scoped>
.quality-buttons {
  grid-template-columns: 0.5fr 1fr 0.5fr;

  button {
    &:first-child {
      border-right: none;
    }
    &:last-child {
      border-left: none;
    }
  }

  .input-wrapper {
    border-left: 1px solid var(--color-bg-dark);
  }
}

.format-buttons {
  grid-template-columns: repeat(2, 1fr);
}
</style>
