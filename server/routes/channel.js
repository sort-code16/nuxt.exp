export default defineWebSocketHandler({
    open(peer) {
        const url = new URL(peer.url, 'http://localhost');
        const id = url.searchParams.get('id') || 'general';
        const channel = `board:${id}`;

        console.log('channel', channel);
        console.log('peer', peer);

        peer.context.board = channel;
        
        peer.subscribe(channel);
        peer.publish(channel, `The client ${peer.id} has joined to channel: ${channel}`);
    },

    message(peer, message) {
        peer.publish(peer.context.board, `${peer.id}: ${message.toString()}`);
    },

    close(peer) {
        const channel = peer.context.board;

        peer.unsubscribe(channel);
        peer.publish(channel, `The client ${peer.id} has left the channel`);
    },
});