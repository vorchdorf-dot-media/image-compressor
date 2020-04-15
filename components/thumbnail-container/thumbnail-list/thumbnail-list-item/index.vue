<template>
  <button :class="{ active, error, loading, ready, success }" @click="open">
    <img :src="src" />
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import { UPLOAD, ImageModel } from '~/store/queue';
import { STATE } from '~/store/statemachine';
export default Vue.extend({
  props: {
    image: {
      type: String,
      required: true
    },
    src: {
      type: String,
      required: true
    }
  },
  computed: mapState('queue', {
    active() {
      const { id } = this.$store.getters['statemachine/state'];
      return id === this.image;
    },
    upload(current: {
      images: { [key: string]: ImageModel };
    }): UPLOAD | undefined {
      const { upload } = current.images[this.image] || {};
      return upload;
    },
    error() {
      return this.upload === UPLOAD.ERROR;
    },
    disabled() {
      return !this.upload;
    },
    loading() {
      return this.upload === UPLOAD.LOADING;
    },
    ready() {
      return this.upload === UPLOAD.READY;
    },
    success() {
      return this.upload === UPLOAD.SUCCESS;
    }
  }),
  methods: {
    open(e: MouseEvent) {
      e.preventDefault();
      this.$store.commit('statemachine/set', {
        state: STATE.IMAGE,
        id: this.image
      });
    }
  }
});
</script>

<style lang="scss" scoped>
@keyframes rotating {
  to {
    transform: rotate(360deg);
  }
}

button {
  position: relative;
  border-radius: 50%;
  border: 4px solid var(--thumbnail-border, var(--color-grey));
  box-shadow: 0 2px 10px -3px var(--thumbnail-border, var(--color-grey));
  margin: 4px;
  height: 48px;
  width: 48px;

  &::after {
    animation: none;
    transition: top 200ms ease-out;
    content: '';
    display: none;
    position: absolute;
    border-radius: inherit;
    border: 6px solid var(--thumbnail-border, var(--color-grey));
    height: 0;
    width: 0;
    top: -8px;
    left: calc(50% - 6px);
    transform-origin: 6px 28px;
  }
}

img {
  border-radius: inherit;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.active,
.error,
.loading,
.ready,
.success {
  &::after {
    display: block;
  }
}

.active::after {
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.error {
  --thumbnail-border: var(--color-alert);

  &::after {
    transform: rotate(180deg);
  }
}

.loading::after {
  top: -8px;
  left: calc(50% - 6px);
  transform: unset;
  animation: rotating 3s infinite;
}

.ready {
  --thumbnail-border: var(--color-light);
}

.success {
  --thumbnail-border: var(--color-success);
}
</style>
