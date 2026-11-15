---
description: "Use when creating or editing Vue components. Follow the project's existing component, prop, event, and styling conventions."
applyTo: "app/components/base/*.vue"
---

# Vue component conventions

- Use Vue single-file components with `<script setup lang="ts">` for new typed components.
- Define props and emits with TypeScript interfaces, following the `IComponentNameProps` and `IComponentNameEmits` naming pattern used by neighboring components.
- Destructure props with defaults in `defineProps` when a prop has a default value.
- Use typed `defineEmits` event signatures and emit events rather than coupling reusable components to parent behavior.
- Name component classes with the `nexp-` prefix and use BEM elements and modifiers.
- Keep component styles in `<style scoped lang="scss">` and follow existing SCSS nesting patterns.
- Check neighboring components before introducing a new API or styling pattern; keep changes consistent with established usage.
