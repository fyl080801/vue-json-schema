import vjsContainerComponent from './container/mixins'

export function install(
  Vue,
  options = {
    component: 'vue-json-schema'
  }
) {
  if (!install.installed) {
    install.installed = true
    Vue.component(options.component, vjsContainerComponent)
  }
}

const plugin = {
  install
}

let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}

if (GlobalVue) {
  GlobalVue.use(plugin)
}

export default plugin
