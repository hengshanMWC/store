import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index.js'],
  clean: true,
  failOnWarn: false,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
    // dts: {
    //   respectExternal: false,
    // },
  },
})
