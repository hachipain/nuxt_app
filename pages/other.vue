<template>
  <section class="container">
    <h1>{{title}}</h1>
    <p>{{message}}</p>
    <router-link to="/">Go to Top</router-link>
    <hr />
  </section>
</template>

<script>
export default {
  data: function() {
    return {
      title: "Other",
      message: "これは、別のページです。"
    };
  }
};
</script>

<style>
</style>