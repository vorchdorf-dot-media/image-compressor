<template>
  <form>
    <div class="input-container">
      <span class="quality" :class="{ bad, good }">{{ quality }}%</span>
      <input
        id="quality-input"
        type="range"
        step="1"
        :value="quality || defaultQuality"
        @input="quality = $event.target.value"
      />
      <label for="quality-input">Quality</label>
      <div class="button-container">
        <button
          v-for="size in sizes"
          :key="size"
          :class="{ active: resize === size }"
          @change="(evt) => setSize(evt, size)"
        >
          {{ size }}
        </button>
        <div class="input-wrapper">
          <input
            id="resize-input"
            :value="resize || original"
            type="number"
            @blur="resize = parseInt($event.target.value, 10)"
          />
        </div>
      </div>
      <label for="resize-input">Resize</label>
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
      <span>Format</span>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import { FORMATS as formats } from '~/assets/helpers/formats';
import { SIZES } from '~/assets/helpers/sizes';
import { ImageEncoderStore } from '~/assets/helpers/store';
export default Vue.extend({
  data(): {
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
    bad(): Boolean {
      return this.quality < 60;
    },
    defaultFormat(): string {
      const { format } = this.$store.getters['statemachine/state'];
      this.format = format?.split('/').pop();
      return this.format;
    },
    defaultQuality(): void {
      const format: string = this.format || this.defaultFormat || 'webp';
      const { quality } = this.$store.getters[`${format}/options`];
      this.quality = quality;
      return quality;
    },
    good(): Boolean {
      return this.quality > 80;
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
  methods: {
    setFormat(e: MouseEvent, format: string): void {
      e.preventDefault();
      this.format = format;
    },
    setSize(e: MouseEvent, size: number): void {
      e.preventDefault();
      this.resize = size;
    }
  }
});
</script>

<style lang="scss" scoped>
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

.quality {
  position: relative;
  --color-background: var(--color-bg);
  --color-text: var(--color-default);
  border-radius: 4px;
  padding: 0.25em 0.5em;
  background: var(--color-background);
  color: var(--color-text);
  fill: var(--color-text);

  &::after {
    content: '';
    position: absolute;
    border: 4px solid transparent;
    border-left-color: var(--color-background);
    height: 0;
    width: 0;
    top: 50%;
    left: 100%;
    transform: translateY(-50%);
  }
}

.bad {
  --color-bg: var(--color-alert);
}

.good {
  --color-bg: var(--color-success);
}

.button-container {
  display: inherit;
  grid-column: 1 / span 2;
  grid-template-columns: repeat(3, 1fr);
  align-items: stretch;
  min-height: 0;
  height: 100%;

  button {
    transition: background-color 200ms ease-in, color 200ms ease-in;
    border: 1px solid var(--color-bg-dark);
    padding: 0.25em 0.5em;
    background: var(--color-button-bg, transparent);
    color: var(--color-button-text, inherit);

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
  --color-fill: red;
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

.format-buttons {
  grid-template-columns: repeat(2, 1fr);
}
</style>
