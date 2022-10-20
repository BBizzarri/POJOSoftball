<template>
  <div class="nav">
      <ul>
        <li class="home"><a href="#">Home</a></li>
        <li class="tutorials"><a href="#">Calander</a></li>
        <li class="tutorials"><a href="#">Events</a></li>
        <li class="about"><a href="#">Gallery</a></li>
        <li class="news"><a href="#">Registrations</a></li>
        <li class="contact"><a href="#">About us</a></li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  margin: 0;
  padding: 0;
  background: #ccc;
}

.nav ul {
  list-style: none;
  background-color: #444;
  text-align: center;
  padding: 0;
  margin: 0;
}

.nav li {
  font-family: 'Oswald', sans-serif;
  font-size: 1.2em;
  line-height: 40px;
  height: 40px;
  border-bottom: 1px solid #888;
}

.nav a {
  text-decoration: none;
  color: #fff;
}

.nav li:hover {
  background-color: black;
}

.a.active {
  background-color: #fff;
  color: #444;
}

.nav li {
  width: 180px;
  border-bottom: none;
  height: 50px;
  line-height: 50px;
  font-size: 1.4em;
}

.nav li {
  display: inline-block;
}


.nav ul {
  overflow: auto;
}

</style>
