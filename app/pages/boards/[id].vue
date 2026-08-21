<script setup>
const route = useRoute();

const { isValidParam } = useRouteValidation();

definePageMeta({
    // name: 'board',
    title: 'Board',
    validate: ({ params }) => isValidParam(params.id) || { status: 404, statusText: 'Board not found' }
});

const id = route.params.id;

const messages = ref([]);
const messageInput = ref('');

let ws = null;

onMounted(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const wsUrl = `${protocol}://${window.location.host}/ws/boards/${id}`;

    console.log('[board] connecting to', wsUrl);
    
    try {
        ws = new WebSocket(wsUrl);

        ws.onmessage = (event) => {
            console.log('onmessage() event: ', event);

            messages.value.push(event.data);
        };

        ws.onclose = () => {
            console.log('Connection is closed');
        };
    } catch (e) {
        console.error('[board] WebSocket failed to construct', e);

        return;
    }
});

onUnmounted(() => {
    if (ws) ws.close();
});

const sendMessage = () => {
    if (!messageInput.value.trim()) return;

    if (!ws || ws.readyState !== WebSocket.OPEN) {
        console.warn('WebSocket not open');

        return;
    }

    ws.send(messageInput.value);
    messageInput.value = '';
};
</script>

<template>
    <div>
        <h1>Board chat #{{ id }}</h1>

        <div>
            <div>
                <p v-for="(msg, idx) in messages" :key="idx">
                    {{ msg }}
                </p>
            </div>

            <div>
                <input
                    v-model="messageInput"
                    @keydown.enter="sendMessage"
                />

                <button type="button" @click="sendMessage">
                    Send
                </button>
            </div>
        </div>
    </div>
</template>