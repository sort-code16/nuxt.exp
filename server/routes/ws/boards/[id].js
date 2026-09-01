export default defineWebSocketHandler({
    // Optional hook to inspect / intercept headers or authenticate before completing the handshake
    upgrade(request) {
        // const url = new URL(request.url);
        // const token = url.searchParams.get("token");

        // if (!isValidToken(token)) {
        //     throw new Response("Unauthorized", { status: 401 });
        // }

        request.context.board = `board:${request.url.split('/').reverse()[0]}`;
    },

    // Triggered when a client successfully connects
    open(peer) {
        peer.send(`You has been connected to the board: ${peer.context.board}`);
        peer.subscribe(peer.context.board);
        peer.publish(peer.context.board, `The client ${peer.id} has joined to board: ${peer.context.board}`);
    },

    // Triggered when the server receives data from a peer
    message(peer, message) {
        peer.publish(peer.context.board, `${peer.id}: ${message.text()}`); // .json()
    },

    // Triggered when a connection drops
    close(peer, details) {
        // 1006 - by server
        // 1001 - by client

        console.log("Disconnected:", peer.id, details.code, details.reason);
        // console.log(`Клієнт ${peer.id} закрив з'єднання з кімнатою ${channel}`);

        peer.unsubscribe(peer.context.board);
        peer.publish(peer.context.board, `The client ${peer.id} has left the board`);
    },

    // Triggered when a connection error occurs
    error(peer, error) {
        console.log('Error: ', peer.id, error);
    },
});