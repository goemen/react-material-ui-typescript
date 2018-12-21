import typescript from 'rollup-plugin-typescript';
import postcss from 'rollup-plugin-postcss';

export default {
    input: './server.tsx',
    output: {
        file: './server/index.js',
        format: 'cjs'
      },
    plugins: [
        postcss({
            plugins: []
          }),
      typescript({
        tsconfig: './tsconfig.server.json'
      })
    ]
  }