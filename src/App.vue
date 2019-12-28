<template>
  <div id="app">
    <div @click="close()">
      <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    close () {
      this.$eventBus.$emit('close', true)
    }
  }
}
</script>

