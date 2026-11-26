---
description: "Apply only to Vue components directly inside app/components/base or its subdirectories."
applyTo: "app/components/base/**/*.vue"
---

# Base Vue component conventions

- These instructions apply only to `.vue` files directly inside `app/components/base/` or its subdirectories.
- Prefer `<script setup lang="ts">` for new components.
- Define props and emits with TypeScript interfaces, following the `IComponentNameProps` and `IComponentNameEmits` naming pattern used by neighboring components.
- Destructure props with defaults in `defineProps` when a prop has a default value.
- Put shared base UI components in `app/components/base/`. Use PascalCase filenames and let Nuxt apply the directory prefix (for example, `Button.vue` becomes `BaseButton`); do not repeat `Base` in the filename.
- Name component classes with the `nexp-` prefix and use BEM elements and modifiers.
- Keep component styles in `<style scoped lang="scss">` and follow existing SCSS nesting patterns.
- Preserve native HTML semantics and accessibility: provide associated labels and accessible names, and connect hints or errors with unique IDs and `aria-describedby` where applicable.
- For wrapper components, forward native control attributes (such as `name`, `autocomplete`, and `disabled`) to the underlying control, not the wrapper. Preserve caller-provided `id` and merge `aria-describedby` when the component adds its own descriptions.
- Check neighboring components before introducing a new API or styling pattern; keep changes consistent with established usage.
