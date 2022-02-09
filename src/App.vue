<template>
  <div id="nav">
    <router-link to="/">Компании</router-link>
    <router-link to="/addresses">Адреса</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 0px 50px;
}

#nav {
  padding: 20px 0px 10px;
  display: flex;

  border-bottom: 1px solid #000000;
  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &:last-child{
      margin-left: 60px;
    }

    &.router-link-exact-active {
      color: #FF3A18;
    }
  }
}

.router-none{
  text-decoration: none;
}

.pointer{
  cursor: pointer;
}
</style>
