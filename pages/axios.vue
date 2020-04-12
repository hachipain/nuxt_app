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
    <table>
      <tr>
        <th>Email</th>
        <td>
          <input type="text" v-model="email" />
        </td>
      </tr>
      <tr>
        <th>Name</th>
        <td>
          <input type="text" v-model="username" />
        </td>
      </tr>
      <tr>
        <th>Age</th>
        <td>
          <input type="number" v-model="age" />
        </td>
      </tr>
      <tr>
        <th>Tel</th>
        <td>
          <input type="text" v-model="tel" />
        </td>
      </tr>
      <tr>
        <th></th>
        <td>
          <button @click="addData">Add</button>
          <button @click="deleteData">Delete</button>
        </td>
      </tr>
    </table>
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
let all_url = "https://nuxt-firebase-sample-e3b55.firebaseio.com/person";
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
      age_range: "",
      email: "",
      username: "",
      tel: "",
      age: 0
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
    },
    getData: function() {
      axios
        .get(all_url + ".json")
        .then(res => {
          this.message = "get all data";
          this.json_data = res.data;
        })
        .catch(error => {
          this.message = "ERROR!";
          this.json_data = {};
        });
    },
    addData: function(event) {
      let add_url = all_url + "/" + this.email + ".json";
      let data = {
        name: this.username,
        age: this.age,
        tel: this.tel
      };
      axios.put(add_url, data).then(re => {
        this.email = "";
        this.username = "";
        this.age = 0;
        this.tel = "";
        this.getData();
      });
    },
    deleteData: function(event) {
      let del_url = all_url + "/" + this.email + ".json";

      axios.delete(del_url).then(re => {
        this.message = this.message + "を削除しました。";
        this.email = "";
        this.getData();
      });
    }
  },
  created: function() {
    this.getData();
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