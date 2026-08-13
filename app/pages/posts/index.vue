<script setup>
const confirmationDialogId = 'removeEntryConfirmation';
const confirmationDialog = useTemplateRef(confirmationDialogId);
const isConfirmationDialogLoading = ref(false);

const settings = reactive({
    title: 'Are you sure? Sed voluptatibus accusantium et facilis velit. Ea voluptatum laudantium ut esse voluptatem sit sapiente cumque.',
    immediately: true,
    isConfirmationMode: true,
});

// const dialogElement = ref(null);

// const setDialogElement = el => dialogElement.value = el;

// const openDialog = (event) => {
//     console.log('openDialog() event', event);
//     console.log('dialogElement', dialogElement);

//     dialogElement.value?.showModal();
// };

// const closeDialog = (event) => {
//     // console.log('closeDialog() event', event);
//     console.log('dialogElement returnValue 111', dialogElement);

//     dialogElement.value?.close();
// };

const closeConfirmation = () => confirmationDialog.value.dialog.close();

const closeConfirmationByAction = event => {
    // console.log('event', event);

    if (event.submitter.value === 'cancel') {
        closeConfirmation();

        return;
    }

    if (event.submitter.value === 'confirm') {
        isConfirmationDialogLoading.value = true;

        setTimeout(() => {
            closeConfirmation();
            
            isConfirmationDialogLoading.value = false;
        }, 3000);
    }
};
</script>

<template>
    <main>
        <h1 class="nexp-title">Confirmation dialog settings</h1>

        <form>
            <div class="form-group">
                <label for="title" style="margin-inline-end: 4px">
                    Title:
                </label>

                <input id="title" v-model="settings.title" />
            </div>

            <div class="form-group">
                <label>
                    <input type="checkbox" v-model="settings.immediately" />
                    Close immediately
                </label>
            </div>

            <fieldset class="form-group">
                <legend>Choose the mode:</legend>

                <input
                    type="radio"
                    id="info"
                    v-model="settings.isConfirmationMode"
                    :value="false"
                />

                <label for="info">Information</label>

                <input
                    type="radio"
                    id="confirmation"
                    v-model="settings.isConfirmationMode"
                    :value="true"
                />

                <label for="confirmation">Confirmation</label>
            </fieldset>
        </form>

        <BaseButton
            level="primary"
            command="show-modal"
            :commandfor="confirmationDialogId"
        >
            Open confirmation
        </BaseButton>

        <article>
            <h2>Ea voluptatum laudantium ut esse voluptatem sit sapiente cumque.</h2>
            <p>Lorem ipsum dolor sit amet. Ea voluptas repellat ut sint dolores eum officiis quam a dolores officiis sit aliquam cupiditate ut eligendi quam ut quasi quasi. Sed nemo molestias eos eius obcaecati est nulla cumque sed suscipit accusamus aut doloribus omnis ut delectus corporis. Et dolorum veritatis a sapiente nemo sed totam dolores ut odio culpa aut provident magni est sint enim? Sed possimus ullam et omnis laudantium aut voluptas dolorum ut voluptatem dolor ea nesciunt minima ut eius galisum. Sit omnis veniam vel sint vitae eum similique sunt et libero distinctio aut autem consequatur. Quo dignissimos laboriosam At inventore velit et molestiae Quis quo illum nihil et voluptatem officia qui accusamus provident eos accusamus accusamus. Ex deserunt nostrum sed tempora quaerat qui voluptate corrupti et eligendi ducimus est galisum debitis in molestiae quas.</p>

            <h2>Sed voluptatibus accusantium et facilis velit.</h2>
            <p>Qui enim maxime ut accusamus voluptas nam soluta obcaecati quo omnis culpa in incidunt autem et dolorem sapiente aut assumenda tempora. Qui nemo voluptatibus quo enim totam ut aspernatur illo. Et quia consequuntur aut suscipit sunt et reprehenderit unde et saepe consectetur sed odit laborum 33 impedit inventore in eius nostrum. Nam amet dolorem qui deleniti dolorum quo aperiam omnis ut minima natus ut sunt culpa ex magnam quidem ut maiores quasi. Et quaerat molestiae 33 molestiae dolor ab error saepe. Ut voluptatem laborum sit maxime libero hic velit corrupti in alias veniam. Ut quia quae a velit porro cum fuga blanditiis aut omnis nisi et repellendus porro.</p>

            <h2>Qui nihil maxime est mollitia vero.</h2>
            <p>Ut cupiditate eaque sit voluptatem exercitationem et aliquid vero qui nostrum ipsa rem commodi voluptatem. In laudantium veniam et tempora minus et internos odit ea eligendi impedit et consequatur corrupti. Est amet quisquam est porro tenetur et atque laborum non reprehenderit aliquid et placeat veritatis ut quia autem et magni dignissimos. Ut quisquam optio ut amet consequatur aut odit sint est consequatur dolores id quibusdam perspiciatis aut alias repellendus. Qui eaque ipsam cum laborum nemo non mollitia pariatur quo adipisci aliquid quo dolores ipsa quo excepturi molestiae! Id perspiciatis beatae At suscipit Quis et velit autem aut quisquam quia! Et harum maxime in consequuntur accusantium qui atque veritatis eum reprehenderit minus ab galisum velit. Non quibusdam alias ut impedit illo ut aliquid obcaecati in doloremque incidunt eos omnis accusantium. Sed modi nulla sed ratione autem et officiis reprehenderit ea consequatur incidunt.</p>
        </article>

        <template v-if="settings.immediately">
            <BaseConfirmationDialog
              :ref="confirmationDialogId"
              :id="confirmationDialogId"
              :title="settings.title"
              :isConfirmationMode="settings.isConfirmationMode"
              immediately
              @close="closeConfirmation"
            >
                <p>Qui enim maxime ut accusamus voluptas nam soluta obcaecati quo omnis culpa in incidunt autem et dolorem sapiente aut assumenda tempora. Qui nemo voluptatibus quo enim totam ut aspernatur illo. Et quia consequuntur aut suscipit sunt et reprehenderit unde et saepe consectetur sed odit laborum 33 impedit inventore in eius nostrum. Nam amet dolorem qui deleniti dolorum quo aperiam omnis ut minima natus ut sunt culpa ex magnam quidem ut maiores quasi. Et quaerat molestiae 33 molestiae dolor ab error saepe. Ut voluptatem laborum sit maxime libero hic velit corrupti in alias veniam. Ut quia quae a velit porro cum fuga blanditiis aut omnis nisi et repellendus porro.</p>
                <p>Ut cupiditate eaque sit voluptatem exercitationem et aliquid vero qui nostrum ipsa rem commodi voluptatem. In laudantium veniam et tempora minus et internos odit ea eligendi impedit et consequatur corrupti. Est amet quisquam est porro tenetur et atque laborum non reprehenderit aliquid et placeat veritatis ut quia autem et magni dignissimos. Ut quisquam optio ut amet consequatur aut odit sint est consequatur dolores id quibusdam perspiciatis aut alias repellendus. Qui eaque ipsam cum laborum nemo non mollitia pariatur quo adipisci aliquid quo dolores ipsa quo excepturi molestiae! Id perspiciatis beatae At suscipit Quis et velit autem aut quisquam quia! Et harum maxime in consequuntur accusantium qui atque veritatis eum reprehenderit minus ab galisum velit. Non quibusdam alias ut impedit illo ut aliquid obcaecati in doloremque incidunt eos omnis accusantium. Sed modi nulla sed ratione autem et officiis reprehenderit ea consequatur incidunt.</p>
                <p>Lorem ipsum dolor sit amet. Ea voluptas repellat ut sint dolores eum officiis quam a dolores officiis sit aliquam cupiditate ut eligendi quam ut quasi quasi. Sed nemo molestias eos eius obcaecati est nulla cumque sed suscipit accusamus aut doloribus omnis ut delectus corporis. Et dolorum veritatis a sapiente nemo sed totam dolores ut odio culpa aut provident magni est sint enim? Sed possimus ullam et omnis laudantium aut voluptas dolorum ut voluptatem dolor ea nesciunt minima ut eius galisum. Sit omnis veniam vel sint vitae eum similique sunt et libero distinctio aut autem consequatur. Quo dignissimos laboriosam At inventore velit et molestiae Quis quo illum nihil et voluptatem officia qui accusamus provident eos accusamus accusamus. Ex deserunt nostrum sed tempora quaerat qui voluptate corrupti et eligendi ducimus est galisum debitis in molestiae quas.</p>
                <p>Ut cupiditate eaque sit voluptatem exercitationem et aliquid vero qui nostrum ipsa rem commodi voluptatem. In laudantium veniam et tempora minus et internos odit ea eligendi impedit et consequatur corrupti. Est amet quisquam est porro tenetur et atque laborum non reprehenderit aliquid et placeat veritatis ut quia autem et magni dignissimos. Ut quisquam optio ut amet consequatur aut odit sint est consequatur dolores id quibusdam perspiciatis aut alias repellendus. Qui eaque ipsam cum laborum nemo non mollitia pariatur quo adipisci aliquid quo dolores ipsa quo excepturi molestiae! Id perspiciatis beatae At suscipit Quis et velit autem aut quisquam quia! Et harum maxime in consequuntur accusantium qui atque veritatis eum reprehenderit minus ab galisum velit. Non quibusdam alias ut impedit illo ut aliquid obcaecati in doloremque incidunt eos omnis accusantium. Sed modi nulla sed ratione autem et officiis reprehenderit ea consequatur incidunt.</p>
            </BaseConfirmationDialog>
        </template>

        <template v-else>
            <BaseConfirmationDialog
              :ref="confirmationDialogId"
              :id="confirmationDialogId"
              :isLoading="isConfirmationDialogLoading"
              :title="settings.title"
              :isConfirmationMode="settings.isConfirmationMode"
              @close="closeConfirmationByAction"
          >
              <p>Qui nemo voluptatibus quo enim totam ut aspernatur illo. Et quia consequuntur aut suscipit sunt et reprehenderit unde et saepe consectetur sed odit laborum 33 impedit inventore in eius nostrum.</p>
          </BaseConfirmationDialog>
        </template>

        <!-- <section>
            <p>No posts available yet. Check back soon.</p>

            <BaseButton @click="openDialog">
                Open dialog
            </BaseButton>
        </section>

        <BaseDialog :set-ref="setDialogElement">
            <p>Test dialog content</p>

            <BaseButton @click="closeDialog">
                Close
            </BaseButton>
        </BaseDialog> -->
    </main>
</template>

<style scoped lang="scss">
.form-group {
    margin-block: 8px;
}

article {
    h2 {
        margin-block: 12px 8px;
    }
}
</style>