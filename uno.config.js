import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  shortcuts: {
    btn: 'text-blue text-2xl p-3 ',
  },
  presets:[
    presetUno()
  ]
})
