<template>
  <section class="container">
    <h1>{{title}}</h1>
    <p>{{message}}</p>
    <div>
      <input type="text" v-model="msg" />
      <button @click="doClick">Search</button>
    </div>
    <hr />
    <!-- <pre>{{html_data}}</pre> -->
    <table>
      <tr>
        <th>User ID</th>
        <td>{{json_data.userId}}</td>
      </tr>
      <tr>
        <th>ID</th>
        <td>{{json_data.id}}</td>
      </tr>
      <tr>
        <th>Title</th>
        <td>{{json_data.title}}</td>
      </tr>
      <tr>
        <th>Body</th>
        <td>{{json_data.body}}</td>
      </tr>
    </table>
    <hr />
    <router-link to="/">Go to Top</router-link>
  </section>
</template>

<script>
const axios = require("axios");

// let url = "/README.md";
let url = "https://jsonplaceholder.typicode.com/posts/";
export default {
  data: function() {
    return {
      title: "Axios",
      message: "axios sample",
      msg: 1
    };
  },
  asyncData: async function() {
    let id = 1;
    let result = await axios.get(url + id);
    // console.log(result);
    // return { html_data: result.data };
    return { json_data: result.data };
  },
  methods: {
    doClick: function(event) {
      axios
        .get(url + this.msg)
        .then(res => {
          this.message = "get ID: " + this.msg;
          this.json_data = res.data;
        })
        .catch(error => {
          this.message = "ERROR!";
          this.json_data = {};
        });
    }
  }
};
</script>

<style>
.container {
  padding: 5px 10px;
}
h1 {
  font-size: 60pt;
  color: #345980;
}
p {
  padding-top: 5px;
  font-size: 20pt;
}
div {
  font-size: 14pt;
}
pre {
  padding: 10px;
  font-size: 18pt;
  background-color: #efefef;
  white-space: pre-wrap;
}
hr {
  margin: 10px 0px;
}
tr th {
  width: 150px;
  background-color: #345980;
  color: white;
  font-size: 16pt;
}
tr td {
  padding: 5px 10px;
  background-color: #eef;
  font-size: 14pt;
}
input,
button {
  font-size: 14pt;
}
</style>