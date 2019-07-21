<template>
  <div id="app">
    <div id="top_bar">
      <div id="top_bar_inner">
        <div id="logo">Motive🎖</div>
      </div>
    </div>
    <div id="app_box">
      <div id="content_wrapper">
        <div id="left_menu">
          <div id="list_box">
            <ul>
              <li>
                <span class="item_icon">✍️</span>
                <span class="item_name">
                  <router-link to="/todo">Todo</router-link>
                </span>
              </li>
              <li>
                <span class="item_icon">🎯</span>
                <span class="item_name">
                  <router-link to="/habbit">Habbit</router-link>
                </span>
              </li>
              <li>
                <span class="item_icon">🗺</span>
                <span class="item_name">
                  <router-link to="/mission">Mission</router-link>
                </span>
              </li>
              <li>
                <span class="item_icon">⭐️</span>
                <span class="item_name">
                  <router-link to="/value">Value</router-link>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div id="content">
          <div id="editor">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
body {
  color: #202020;
  background-color: #fafafa;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#top_bar {
  z-index: 400;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  height: 44px;
  background: linear-gradient(to right, rgb(239, 50, 217), rgb(137, 255, 253))
}

#top_bar_inner {
  height: 100%;
  width: 922px;
  padding-left: 13px;
}

#logo {
  float: left;
  line-height: 44px;
  font-weight: bold;
}
@keyframes effect-fade-in {
  0% {
    opacity: 0;
  }
  20% {
      opacity: .2;
  }
  40% {
      opacity: .4;
  }
  60% {
      opacity: .6;
  }
  80% {
      opacity: .9;
  }
  100% {
      opacity: 1;
  }
}
#app_box {
  -webkit-animation-name: effect-fade-in;
  animation-name: effect-fade-in;
  -webkit-animation-duration: 120ms;
  animation-duration: 800ms;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  min-height: calc(100vh);
  margin-left: calc(100vw - 100%);
  margin-right: 0;
}

#content_wrapper {
  width: 922px;
}

#left_menu {
  width: 266px;
  height: calc(100vh - 50px);
  padding-top: 74px;
  padding-left: 32px;
  margin-left: -32px;
  position: fixed;
  overflow-x: hidden;
  overflow-y: hidden;
  border-right: 1px solid #f1f1f1;
  background-color: #fafafa;
}

#list_box {
  width: 265px;
  padding-bottom: 30px;
}
#list_box ul {
  margin: 0;
  padding: 0;
}

#list_box li {
  min-height: 24px;
  font-size: 14px;
  color: #333;
  list-style: none;
  cursor: pointer;
  padding: 9px 16px 9px 5px;
  -webkit-transition: color .1s ease-in,background-color .1s ease-in;
  transition: color .1s ease-in,background-color .1s ease-in;
  line-height: 1.25;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  border-radius: 3px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
#list_box li .item_name {
  display: inline-block;
  width: 187px;
  vertical-align: top;
  text-align: left;
  font-weight: 500;
  margin-left: 10px;
}
#list_box li .item_name a {
  display: inline-block;
  color: #333;
  text-decoration: none;
  width: 100%;
}

#content {
  width: 656px;
  min-height: 380px;
  background-color: #fff;
  margin-left: 266px;
  border-right: 1px solid #f1f1f1;
  min-height: calc(100vh);
  -webkit-transition: opacity 250ms cubic-bezier(0.4,0,0.6,1);
  transition: opacity 250ms cubic-bezier(0.4,0,0.6,1);
}
#editor {
  vertical-align: top;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 80px;
  padding-bottom: 84px;
}
</style>
