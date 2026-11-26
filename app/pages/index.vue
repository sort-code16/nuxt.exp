<script setup lang="ts">
definePageMeta({
    name: 'home',
    title: 'Home',
    // description: 'The home page at NUXT.EXP',
});

const dialogRef = useTemplateRef('favDialog');
const dropdownRef = useTemplateRef('dropdownButton');
// const favoriteAnimal = ref('cat');

// const animalOptions = [
//     { label: 'Cat', value: 'cat' },
//     { label: 'Dog', value: 'dog' },
//     { label: 'Rabbit', value: 'rabbit' },
// ];

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

        <!-- <div class="nexp-mb-4">
            <BaseSelect
                v-model="favoriteAnimal"
                label="Favorite animal"
                hint="Choose an animal to see the selected value."
                :options="animalOptions"
            />
            <p>Selected: {{ favoriteAnimal }}</p>
        </div> -->

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

        <section class="nexp-mb-4 accordion">
            <details name="tool" open>
                <summary>What is Vue?</summary>
                <p>Vue (pronounced /vjuː/, like view) is a JavaScript framework for building user interfaces.</p>
                <!-- eslint-disable-next-line @stylistic/max-len -->
                <p>It builds on top of standard HTML, CSS, and JavaScript and provides a declarative, component-based programming model that helps you efficiently develop user interfaces of any complexity.</p>
            </details>

            <details name="tool">
                <summary>What is Nuxt?</summary>
                <p>The Full-Stack Vue Framework</p>
                <!-- eslint-disable-next-line @stylistic/max-len -->
                <p>Build fast, production-ready web apps with Vue. File-based routing, auto-imports, and server-side rendering, all configured out of the box.</p>
            </details>

            <details name="tool">
                <summary>What is Drizzle ORM?</summary>
                <p>Drizzle ORM - next gen TypeScript ORM.</p>
                <p>Drizzle ORM is a lightweight and performant TypeScript ORM with developer experience in mind.</p>
            </details>
        </section>

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

.accordion {
    p {
        line-height: 20px;
    }

    details {
        margin-bottom: 8px;

        summary {
            cursor: pointer;
            border: 1px solid;
            background-color: #eee;
            padding: 8px 12px;

            &:hover,
            &:focus-visible {
                outline: none;
                box-shadow: inset 0 0 0 1px #fff, inset 0 0 0 2px rgb(0 0 0 / .4);
            }
        }

        &:open {
            summary {
                background-color: #ddd;
            }

            &::details-content {
                border: 1px solid;
                border-top: none;
                padding: 8px 12px;
            }
        }
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
