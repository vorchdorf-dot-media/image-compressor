<template>
  <div class="options-container">
    <keep-alive>
      <component :is="activeComponent" class="form-container" @data="update" />
    </keep-alive>
    <div v-if="upload" class="button-group">
      <button
        :class="{ active: activeComponent === MetaForm }"
        @click="activeComponent = MetaForm"
      >
        Meta
      </button>
      <button
        :class="{ active: activeComponent === EncoderForm }"
        @click="activeComponent = EncoderForm"
      >
        Encode
      </button>
    </div>
    <button @click="save">
      <CheckmarkIcon />
      <span>Save</span>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import { MIMETYPE } from '~/assets/helpers/formats';
import { ImageEncoderStore } from '~/assets/helpers/store';
import CheckmarkIcon from '~/components/icon/checkmark.vue';
import EncoderForm from '~/components/preview-container/options/encoder/index.vue';
import MetaForm from '~/components/preview-container/options/meta/index.vue';
import { ImageModel } from '~/store/queue';
import { STATE, StateMachine } from '~/store/statemachine';
export interface FormEvent {
  description?: string;
  mimetype?: MIMETYPE;
  quality?: number;
  size?: number;
  title?: string;
}
export default Vue.extend({
  components: {
    CheckmarkIcon,
    EncoderForm,
    MetaForm
  },
  data(): {
    activeComponent: any;
    EncoderForm: any;
    MetaForm: any;
    options: FormEvent;
    upload: Boolean;
  } {
    return {
      activeComponent: EncoderForm,
      EncoderForm,
      MetaForm,
      options: {},
      upload: process.env.UPLOAD === 'true'
    };
  },
  computed: mapState({
    image({
      queue: { images },
      statemachine: { state }
    }: ImageEncoderStore): ImageModel {
      const { id = '' } = state;
      return images[id];
    }
  }),
  methods: {
    save() {
      const { height, width } = this.image;
      const {
        description,
        mimetype,
        quality,
        size = Math.max(height, width),
        title = ''
      } = this.options;
      const {
        id = '',
        mimetype: defaultMime
      }: StateMachine = this.$store.getters['statemachine/state'];
      const mime: MIMETYPE | undefined = mimetype || defaultMime;
      const format = mime?.split('/').pop();
      const { quality: defaultQuality } = this.$store.getters[
        `${format}/options`
      ];
      if (quality) {
        format && this.$store.commit(`${format}/set`, { quality });
      }
      this.$store.commit(
        'statemachine/set',
        Object.assign(
          {},
          { state: STATE.IMAGE },
          mimetype && id.length ? { mimetype } : null
        )
      );
      if (id.length) {
        const scale = size / Math.max(height, width);
        const outHeight = Math.round(height * scale);
        const outWidth = Math.round(width * scale);
        this.$store.commit(
          'queue/set',
          Object.assign(
            {},
            { id, description, height: outHeight, width: outWidth },
            title.length ? { title } : null,
            mimetype ? { mimetype } : null
          )
        );

        if (
          (quality && defaultQuality !== quality) ||
          (mimetype && defaultMime !== mimetype) ||
          outHeight !== height ||
          outWidth !== width
        ) {
          this.$store.commit('queue/set', { id, buffer: null });
          this.$store.dispatch('queue/encode');
        }
      }
    },
    update(e: FormEvent) {
      this.options = { ...this.options, ...e };
    }
  }
});
</script>

<style lang="scss" scoped>
@keyframes appear {
  from {
    bottom: -100%;
  }
  to {
    bottom: 0;
  }
}

.options-container {
  animation: appear 300ms ease-out;
  position: absolute;
  display: grid;
  grid-area: footer;
  grid-template-rows: 1fr auto;
  box-shadow: 0 -5px 10px -3px var(--color-bg-dark);
  border-radius: 8px;
  border-top: 1px solid var(--color-light);
  background: var(--color-bg-dark);
  color: var(--color-default);
  fill: var(--color-default);
  padding-bottom: 1rem;
  min-height: 0;
  min-width: 0;
  max-height: 90%;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;

  @media screen and (min-width: 476px), (orientation: landscape) {
    width: 476px;
    top: auto;
    right: auto;
    left: 50%;
    transform: translateX(-50%);
    overflow: auto;
  }
}

button {
  transition: border-color 200ms ease-in;
  display: flex;
  align-items: center;
  box-shadow: 0 5px 10px -3px var(--color-success);
  border-radius: 9999px;
  border: 1px solid transparent;
  background: var(--color-success);
  color: inherit;
  fill: inherit;
  padding: 0.5rem;
  margin: 1.5rem auto 16px;

  &:hover {
    border-color: var(--color-default);
  }

  > span {
    margin-left: 0.5rem;
  }
}

.form-container {
  box-shadow: 0 5px 10px -3px var(--color-light),
    inset 0 0px 10px -3px var(--color-bg-dark);
  padding: 1rem;
  background: var(--color-light);
  color: var(--color-bg-dark);
  fill: var(--color-bg-dark);
}

.button-group {
  display: flex;
  justify-content: flex-end;
  box-shadow: inset 0 5px 10px -3px var(--color-bg-dark);
  min-width: 0;
  min-height: 44px;
  width: 100%;

  button {
    transition: background-color 200ms ease-in, color 200ms ease-in;
    display: inline-flex;
    position: relative;
    justify-content: center;
    box-shadow: none;
    border-radius: 0;
    border: 1px solid var(--color-light);
    border-top: none;
    background: transparent;
    margin: 0;
    min-width: 33.333%;

    &:first-child {
      border-bottom-left-radius: 4px;
    }

    &:last-child {
      border-bottom-right-radius: 4px;
    }
  }

  .active {
    box-shadow: inset 0 3px 10px -5px var(--color-bg);
    background: var(--color-light);
    color: var(--color-bg-dark);
    fill: var(--color-bg-dark);

    &::after {
      animation: none;
      content: '';
      position: absolute;
      border-top: 1px dashed var(--color-bg);
      height: 0;
      top: 0;
      right: 0;
      left: 0;
      opacity: 0.5;
    }
  }
}
</style>

<style lang="scss">
form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 0;
  min-width: 0;
  max-height: 100%;
  max-width: 100%;
}

h2 {
  margin: 0 0 2rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  opacity: 0.5;
}

span,
label {
  font-size: 0.875em;
  text-align: right;
  text-overflow: ellipsis;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  white-space: nowrap;
  overflow: hidden;
}

.input-container {
  display: grid;
  grid-template-columns: minmax(0, 0.333fr) minmax(0, 1fr);
  grid-auto-rows: minmax(44px, auto);
  column-gap: 1rem;
  row-gap: 1rem;
  align-items: center;
  min-height: 0;
  min-width: 0;
  height: 100%;
  width: 100%;
  max-height: 100%;
  max-width: 100%;
}

.button-container {
  display: inherit;
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

  input,
  textarea {
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
</style>
