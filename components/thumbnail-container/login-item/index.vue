<template>
  <button :disabled="!enabled" @click="login">
    <CogIcon />
    <span>Login</span>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import identity from 'netlify-identity-widget';
import CogIcon from '~/components/icon/cog.vue';

export default Vue.extend({
  components: {
    CogIcon
  },
  data() {
    return {
      enabled: false
    };
  },
  computed: {
    ...mapState(['user']),
    expired(): boolean {
      const {
        auth: { token: { expires_at: expiresAt = null } = {} } = {}
      } = this.user;
      console.log(expiresAt);
      return !expiresAt;
    }
  },
  created() {
    if (process.env.UPLOAD === 'true') {
      identity.init();
      identity.on('login', console.log);
      this.enabled = true;
    }
  },
  methods: {
    login(): void {
      this.enabled && identity.open('login');
    }
  }
});
</script>

<style lang="scss" scoped>
button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 16px;
  min-width: 64px;
  padding: 0.25rem 0.5rem;
  background: var(--color-bg);
  color: var(--color-default);
  fill: var(--color-default);

  &[disabled] {
    background: transparent;
    color: var(--color-grey);
    fill: var(--color-grey);
  }

  span {
    margin-top: 0.5rem;
  }
}
</style>
