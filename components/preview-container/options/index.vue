<template>
  <section>
    <h2>Options</h2>
    <component :is="activeComponent" @data="update" />
    <div class="button-container">
      <div class="button-group">
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
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import CheckmarkIcon from '~/components/icon/checkmark.vue';
import EncoderForm from '~/components/preview-container/options/encoder/index.vue';
import MetaForm from '~/components/preview-container/options/meta/index.vue';
import { STATE } from '~/store/statemachine';
export default Vue.extend({
  components: {
    CheckmarkIcon,
    EncoderForm,
    MetaForm
  },
  data() {
    return {
      activeComponent: EncoderForm,
      EncoderForm,
      MetaForm
    };
  },
  methods: {
    save() {
      this.$store.commit('statemachine/set', { state: STATE.IMAGE });
    },
    update(e: any) {
      console.log(e);
    }
  }
});
</script>

<style lang="scss" scoped>
@keyframes appear {
  from {
    top: 200%;
  }
  to {
    top: 10%;
  }
}

h2 {
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  opacity: 0.5;
}

section {
  animation: appear 300ms ease-out;
  position: absolute;
  display: grid;
  grid-template-rows: auto 1fr auto;
  box-shadow: 0 -5px 10px -3px var(--color-bg-dark);
  border-radius: 8px;
  border-top: 1px solid var(--color-bg);
  background: var(--color-bg-dark);
  color: var(--color-default);
  fill: var(--color-default);
  padding: 1rem 1rem;
  min-height: 0;
  min-width: 0;
  max-height: 100%;
  max-width: 100%;
  top: 10%;
  right: 0;
  bottom: 0;
  left: 0;
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
  margin: 0.5rem auto 16px;

  &:hover {
    border-color: var(--color-default);
  }

  > span {
    margin-left: 0.5rem;
  }
}

.button-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 1rem;
  min-width: 0;
  width: 100%;

  button {
    transition: background-color 200ms ease-in, color 200ms ease-in;
    display: flex;
    justify-content: center;
    box-shadow: none;
    border-radius: 0;
    border: 2px solid var(--color-light);
    background: transparent;
    margin: 0;
    width: 100%;
  }

  .active {
    background: var(--color-light);
    color: var(--color-bg-dark);
    fill: var(--color-bg-dark);
  }
}
</style>
