<script setup lang="ts">
definePageMeta({
    name: 'home',
    title: 'Home',
    // description: 'The home page at NUXT.EXP',
});

const dialogRef = useTemplateRef('favDialog');
const dropdownRef = useTemplateRef('dropdownButton');

const openDialog = (value: MouseEvent) => {
    console.log('openDialog() value', value);
    dialogRef.value?.showModal();
};

const closeDialog = (value: MouseEvent) => {
    console.log('closeDialog() value', value);
    dialogRef.value?.close();
};

onMounted(() => {
    console.log('Dialog ref:', dialogRef);
});
</script>

<template>
    <main>
        <h2 class="nexp-mb-4">Welcome to the homepage</h2>

        <div class="nexp-mb-4 slider-wrapper">
            <section class="slider">
                <div class="slider__item">1</div>
                <div class="slider__item">2</div>
                <div class="slider__item">3</div>
                <div class="slider__item">4</div>
                <div class="slider__item">5</div>
                <div class="slider__item">6</div>
                <div class="slider__item">7</div>
                <div class="slider__item">8</div>
                <div class="slider__item">9</div>
            </section>
        </div>

        <div class="nexp-mb-4" style="display: flex; justify-content: space-between; gap: 16px">
            <p style="line-height: 20px">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est

                <BaseHint text="There are no position try fallback options set.">
                    <span>laborum</span>
                </BaseHint>.
            </p>

            <BaseHint text="Values cannot be combined like this.">
                <BaseIcon name="circle-alert" />
            </BaseHint>
        </div>

        <div class="nexp-mb-4" style="display: flex; justify-content: space-between">
            <BaseDropdownButton ref="dropdownButton" label="Dropdown">
                <ul>
                    <li>
                        <button type="button" @click="() => dropdownRef?.close()">Close dropdown</button>
                    </li>

                    <li>Test item 1</li>
                    <li>Test item 2</li>
                    <li>Test item 3</li>
                </ul>
            </BaseDropdownButton>

            <BaseDropdownButton up right />
        </div>

        <BaseButton type="button" class="nexp-me-2" @click="openDialog">
            Update details
        </BaseButton>

        <BaseButton
            type="button"
            command="show-modal"
            commandfor="nexp-dialog-info"
        >
            Info
        </BaseButton>

        <dialog id="nexp-dialog-info">
            <h2 class="nexp-mb-3">Info</h2>

            <div>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <p>Contrary to popular belief, Lorem Ipsum is not simply random text.</p>
            </div>

            <div class="dialog-actions-group">
                <BaseButton
                    type="button"
                    command="close"
                    commandfor="nexp-dialog-info"
                >
                    Close
                </BaseButton>
            </div>
        </dialog>

        <dialog ref="favDialog">
            <form method="dialog">
                <section>
                    <div>
                        <label for="membersCount" class="nexp-me-1">
                            Favorite animal:
                        </label>

                        <select id="membersCount">
                            <option>4</option>
                            <option>6</option>
                            <option>8</option>
                            <option>10</option>
                        </select>
                    </div>
                </section>

                <menu class="dialog-actions-group">
                    <BaseButton type="reset" @click="closeDialog">
                        Cancel
                    </BaseButton>

                    <BaseButton type="submit">Confirm</BaseButton>
                </menu>
            </form>
        </dialog>
    </main>
</template>

<style scoped lang="scss">
.slider-wrapper {
    position: relative;

    &::before {
        position: absolute;
        content: '▼';
        top: -4px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 32px;
        z-index: 1;
        opacity: .2;
    }
}

.slider {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 33%;
    gap: .5%;
    overflow-x: scroll;
    padding-bottom: 4px;
    scroll-snap-type: inline mandatory;
    position: relative;

    &__item {
        scroll-snap-align: center;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f00;
        font-size: 32px;
        color: #fff;

        &:nth-child(2n) {
            background-color: #0f0;
        }

        &:nth-child(3n+1) {
            background-color: #00f;
        }

        @media (width >= 576px) {
            height: 200px;
        }
    }

    &:focus-visible {
        outline: 2px solid #00f;
        outline-offset: 2px;
    }
}

p + p {
    margin-top: 8px;
}

.dialog-actions-group {
    display: flex;
    justify-content: space-between;
    padding-top: 14px;
}
</style>
