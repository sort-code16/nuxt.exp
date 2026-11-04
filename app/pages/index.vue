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

        <div class="nexp-mb-4" style="display: flex; justify-content: space-between">
            <span>
                Some text

                <BaseHint text="The default value. There are no position try fallback options set.">
                    <BaseIcon name="info" />
                </BaseHint>
            </span>

            <BaseHint text="position-area values cannot be combined like this.">
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
.dialog-actions-group {
    display: flex;
    justify-content: space-between;
    padding-top: 14px;
}
</style>
