import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier";

const eslintConfig = [...nextVitals, prettier];

export default eslintConfig;
