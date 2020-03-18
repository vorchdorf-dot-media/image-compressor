<template>
  <section>
    <h2>Options</h2>
    <div></div>
    <button @click="save">
      <CheckmarkIcon />
      <span>Save</span>
    </button>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import CheckmarkIcon from '~/components/icon/checkmark.vue';
import { STATE } from '~/store/statemachine';
export default Vue.extend({
  components: {
    CheckmarkIcon
  },
  methods: {
    save() {
      this.$store.commit('statemachine/set', { state: STATE.IMAGE });
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
  background: var(--color-bg-dark);
  color: var(--color-default);
  fill: var(--color-default);
  padding: 1rem;
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
</style>
