import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import packageJson from "./package.json";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

const plugins = [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    postcss({
        inject: true,
    }),
    typescript({
        tsconfig: "./tsconfig.json",
    }),
    babel({
        babelHelpers: "runtime",
        extensions,
        exclude: "node_modules/**",
        plugins: ["@babel/plugin-transform-runtime"],
    }),
    terser(),
];

const external = ["react", "react-dom"];

export default [
    {
        input: "src/index.tsx",
        output: [
            {
                file: packageJson.main,
                format: "esm",
                exports: "named",
            },
            {
                file: packageJson.module,
                format: "cjs",
                exports: "named",
            },
        ],
        plugins,
        external,
    },
];
