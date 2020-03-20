<template>
  <form @submit="onSubmit">
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
    this.debounceQuality = debounce(this.setQuality, 500);
    this.debounceSize = debounce(this.setSize, 500);
  },
  methods: {
    onSubmit(e: Event) {
      e.preventDefault();
    },
    setFormat(e: MouseEvent, format: string): void {
      e.preventDefault();
      this.format = format;
      this.$emit('data', { mimetype: `image/${format}` });
    },
    setQuality(e: KeyboardEvent, quality: number): void {
      e.preventDefault();
      const current = this.quality;
      this.quality = !isNaN(quality) ? quality : this.defaultQuality;
      this.quality =
        this.quality < 0 || this.quality > 100 ? current : this.quality;
      this.$emit('data', {
        quality: this.quality
      });
    },
    setSize(e: MouseEvent | KeyboardEvent, size: number): void {
      e.preventDefault();
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
form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

h2 {
  margin: 0;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  opacity: 0.5;
}

span,
label {
  font-size: 0.875em;
  text-align: right;
  text-transform: uppercase;
  letter-spacing: 0.25em;
}

.input-container {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-auto-rows: minmax(44px, auto);
  column-gap: 1rem;
  row-gap: 1rem;
  align-items: center;
  min-height: 0;
  min-width: 0;
}

.button-container {
  display: inherit;
  grid-column: 2 / span 2;
  grid-template-columns: repeat(3, auto);
  align-items: stretch;
  min-height: 0;
  height: 100%;

  button {
    transition: background-color 200ms ease-in, color 200ms ease-in;
    border: 1px solid var(--color-bg-dark);
    padding: 0.25em 0.5em;
    background: var(--color-button-bg, transparent);
    color: var(--color-button-text, inherit);

    &:disabled {
      opacity: 0.333;
    }

    &.active {
      --color-button-bg: var(--color-bg);
      --color-button-text: var(--color-default);
    }

    + * {
      border-left: 0;
    }
  }

  input {
    height: 100%;
    width: 100%;
  }

  button,
  .input-wrapper {
    &:first-child {
      border-bottom-left-radius: 4px;
      border-top-left-radius: 4px;
    }

    &:last-child {
      border-bottom-right-radius: 4px;
      border-top-right-radius: 4px;
    }
  }
}

.input-wrapper {
  position: relative;
  border: 1px solid var(--color-bg-dark);

  input {
    border: none;
  }

  &::after {
    content: url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA2NCA2NCIgc3R5bGU9ImZpbGw6IHZhcigtLWNvbG9yLWZpbGwpIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHBhdGggZD0iTTYyLjgsMTIuMWMtMy40LTMuNS02LjktNy4yLTEwLjMtMTAuNmMtMC44LTAuOC0xLjktMS4zLTIuOS0xLjNzLTEuOSwwLjItMi43LDFMNi42LDQxLjFjLTAuMSwwLjEtMC4yLDAuMi0wLjIsMC40bC02LDE4LjYKCWwtMC4xLDAuM2MtMC4zLDAuOC0wLjEsMS43LDAuNCwyLjRoMGwwLDBDMS41LDYzLjcsMi44LDY0LDQsNjMuNmwxOC41LTZjMC4xLDAsMC4zLTAuMSwwLjQtMC4ybDM5LjktMzkuOWMwLjgtMC44LDEuMS0xLjYsMS4xLTIuNwoJUzYzLjQsMTIuNiw2Mi44LDEyLjF6IE0xOS44LDUyLjdMNi44LDU3TDExLDQ0bDI4LjctMjguMWw4LjUsOC41TDE5LjgsNTIuN3ogTTUxLjksMjAuNmwtOC41LTguNWw1LjgtNS44YzIuOSwyLjksNS44LDUuOCw4LjUsOC44CglMNTEuOSwyMC42eiIvPgo8L3N2Zz4=');
    position: absolute;
    height: auto;
    width: 1em;
    top: 50%;
    right: 0.25em;
    transform: translateY(-50%);
  }
}

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
