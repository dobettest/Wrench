import React from 'react';
import { createApp } from "vue";
import { createRoot } from 'react-dom'
import vueApp from './views/vue3.vue';
import App from "./views/react17";
import "core-js";
import "./test";
createApp(vueApp).mount('#vue-app');
const root = createRoot(document.getElementById("reactContainer"));
root.render(<App className="reactApp" test="hello world"/>)