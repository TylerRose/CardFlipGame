import { createApp } from "vue";
import { createVuetify } from "vuetify";
import { createCoalesceVuetify } from "coalesce-vue-vuetify3";
import { aliases, fa } from "vuetify/iconsets/fa";
import { AxiosClient as CoalesceAxiosClient } from "coalesce-vue";

import App from "./App.vue";
import router from "./router";

// Import global CSS and Fonts:
import "typeface-roboto";
import "@fortawesome/fontawesome-free/css/all.css";
import "coalesce-vue-vuetify3/styles.css";
import "@/site.scss";
import "vuetify/styles";

import $metadata from "@/metadata.g";
// viewmodels.g has side effects - it populates the global lookup on ViewModel and ListViewModel.
// This global lookup allows the admin page components to function.
import "@/viewmodels.g";

// SETUP: vuetify
const vuetify = createVuetify({
  icons: {
    defaultSet: "fa",
    aliases,
    sets: { fa },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      dark: {
        colors: {
          teal: '#007070',
          red: '#BB1111',
          green: '#3C9F40',
          blue: '#0176D3',
          orange: '#Ef7800'
        }
      },
      light: {
        colors: {
          teal: '#009090',
          red: '#FF3333',
          green: '#4CAF50',
          blue: '#2196F3',
          orange: '#ff9800'
        }
      }
    }
  }
});

// SETUP: coalesce-vue
CoalesceAxiosClient.defaults.baseURL = "/api";
CoalesceAxiosClient.defaults.withCredentials = true;

// SETUP: coalesce-vue-vuetify
const coalesceVuetify = createCoalesceVuetify({
  metadata: $metadata,
});

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.use(coalesceVuetify);
app.mount("#app");
