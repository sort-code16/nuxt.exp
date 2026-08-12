<script setup>
definePageMeta({
    name: 'home',
    title: 'Home',
    // description: 'The home page at NUXT.EXP',
});

const dialogRef = useTemplateRef('favDialog');

const openDialog = (value) => {
    console.log('openDialog() value', value);
    dialogRef.value?.showModal();
};

const closeDialog = (value) => {
    console.log('closeDialog() value', value);
    dialogRef.value?.close();
};

onMounted(() => {
    console.log('Dialog ref:', dialogRef);
});
</script>

<template>
    <div>
        <h1>Welcome to the homepage</h1>
        
        <button type="button" @click="openDialog">
            Update details
        </button>

        <button
            type="button"
            command="show-modal"
            commandfor="nexp-dialog-1"
        >
            Open native dialog
        </button>

        <dialog id="nexp-dialog-1">
            <h2>Native dialog</h2>

            <p>This is a native dialog element.</p>

            <button
                type="button"
                command="close"
                commandfor="nexp-dialog-1"
            >
                Close
            </button>
        </dialog>

        <dialog ref="favDialog">
            <form method="dialog">
                <section>
                    <p>
                        <label for="membersCount">Favorite animal:</label>

                        <select id="membersCount">
                            <option>4</option>
                            <option>6</option>
                            <option>8</option>
                            <option>10</option>
                        </select>
                    </p>
                </section>

                <menu>
                    <button type="reset" @click="closeDialog">
                        Cancel 1
                    </button>

                    <button type="submit">Confirm</button>
                </menu>
            </form>
        </dialog>
    </div>
</template>