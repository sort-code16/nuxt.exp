<script setup lang="ts">
interface IDropdownButtonProps {
    id?: string;
    label?: string;
    up?: boolean;
    right?: boolean;
}

const {
    id = useId(),
    label = '',
    up = false,
    right = false,
} = defineProps<IDropdownButtonProps>();

const popoverElement = useTemplateRef<HTMLElement>('nexpDropdownButtonPopover');

const iconOnly = computed(() => !label);

const close = () => {
    if (popoverElement.value) {
        popoverElement.value.hidePopover();
    }
};

defineExpose({
    close,
});
</script>

<template>
    <div
        class="nexp-dropdown-button"
        :class="{
            'nexp-dropdown-button--up': up,
            'nexp-dropdown-button--right': right,
        }"
    >
        <BaseButton
            type="button"
            :popovertarget="id"
            :aria-label="iconOnly ? 'Open dropdown': undefined"
            :iconOnly
            class="nexp-dropdown-button__btn"
        >
            <span v-if="label" class="nexp-dropdown-button__label">
                {{ label }}
            </span>

            <BaseIcon name="chevron-down" class="nexp-dropdown-button__arrow" />
        </BaseButton>

        <div
            :id
            popover
            ref="nexpDropdownButtonPopover"
            class="nexp-dropdown-button__popover"
        >
            <slot>Nothing to display</slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
.nexp-dropdown-button {
    --top: calc(anchor(bottom) + 8px);
    --right: auto;
    --bottom: auto;
    --left: anchor(left);

    &--up {
        --top: auto;
        --bottom: calc(anchor(top) + 8px);
    }

    &--right {
        --left: auto;
        --right: anchor(right);
    }

    &__btn {
        display: flex;
        flex-wrap: nowrap;
        gap: 4px;
    }

    &__label {
        text-wrap: nowrap;
    }

    &__popover {
        position-anchor: auto;
        inset: var(--top) var(--right) var(--bottom) var(--left);
        padding: 8px;
    }

    // ensure the &__arrow displays as an inline-block or inline-flex element for correct rotation
    &:has(:popover-open) &__arrow {
        rotate: 180deg;
    }

    &--up &__arrow {
        rotate: 180deg;
    }

    &--up:has(:popover-open) &__arrow {
        rotate: 0deg;
    }
}
</style>
