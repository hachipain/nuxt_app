<template>
  <section class="container">
    <h1>{{title}}</h1>
    <p>{{message}}</p>
    <div>
      <input type="text" v-model="msg" />
      <button @click="doClick">Search</button>
    </div>
    <hr />
    <div>
      <input type="text" v-model="age_range" />
      <button @click="doRange">Age range</button>
    </div>
    <hr />
    <!-- <pre>{{html_data}}</pre> -->
    <!-- <table>
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
    </table>-->

    <!-- <ul v-for="(data,key) in json_data" :key="key">
      <li>{{data.name}} ({{data.age}}) [{{key}}]</li>
    </ul>-->

    <!-- <ul>
      <li>{{json_data}}</li>
    </ul>-->

    <ul v-for="(data,key) in json_data" :key="key">
      <li>
        <strong>{{key}}</strong>
        <br />
        {{data}}
      </li>
    </ul>
    <hr />
    <router-link to="/">Go to Top</router-link>
  </section>
</template>

<script>
const axios = require("axios");

// let url = "/README.md";
// let url = "https://jsonplaceholder.typicode.com/posts/";
// let url = "https://nuxt-firebase-sample-e3b55.firebaseio.com/person.json";
// let url = "https://nuxt-firebase-sample-e3b55.firebaseio.com/person/";
let url =
  "https://nuxt-firebase-sample-e3b55.firebaseio.com/person.json?orderBy=%22$key%22&equalTo=%22";
let range_url =
  "https://nuxt-firebase-sample-e3b55.firebaseio.com/person.json?orderBy=%22age%22";
export default {
  data: function() {
    return {
      title: "Axios",
      message: "axios sample",
      msg: "",
      json_data: {},
      age_range: ""
    };
  },
  // asyncData: async function() {
  //   // let id = 1;
  //   // let result = await axios.get(url + id);

  //   // console.log(result);
  //   // return { html_data: result.data };

  //   let result = await axios.get(url);
  //   return { json_data: result.data };
  // }
  methods: {
    doClick: function(event) {
      // let id_url = url + this.msg + ".json";
      let id_url = url + this.msg + "%22";
      console.log(id_url);
      axios
        .get(id_url)
        .then(res => {
          this.message = "get ID: " + this.msg;
          this.json_data = res.data;
          console.log(res);
        })
        .catch(error => {
          console.log(error);
          this.message = "ERROR!";
          this.json_data = {};
        });
    },
    doRange: function(event) {
      let range = this.age_range.split(",");
      let find_url = range_url + "&startAt=" + range[0] + "&endAt=" + range[1];
      console.log(find_url);
      axios
        .get(find_url)
        .then(res => {
          this.message = "get: " + range[0] + " < age < " + range[1];
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

ul {
  margin: 0px 10px;
  background-color: aliceblue;
}
li {
  padding: 10px;
  font-size: 16pt;
}
</style>