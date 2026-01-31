import { defineConfig } from "eslint/config"
import next from "eslint-config-next"

export default defineConfig([
  ...next,
  {
    ignores: ["node_modules", ".next", "dist"],
    rules: {
      "react-hooks/immutability": "off",
      "react-hooks/purity": "off",
          "react-hooks/set-state-in-effect": "off"

    }
  }
])
