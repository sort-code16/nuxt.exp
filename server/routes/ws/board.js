export default defineWebSocketHandler({
    // const reqUrl = node?.req?.url || '';
    // const parsed = new URL(reqUrl, 'http://localhost');
    // const boardId = parsed.searchParams.get('id') || (parsed.pathname.split('/').pop() || 'unknown');

    open(peer) {
        // const url = new URL(peer.url);
        console.log('Connected:', peer.id/*, 'board id:', boardId*/);
        
        // peer.send('Welcome to the board!');
        // peer.subscribe('board');
        // peer.subscribe(`board:${boardId}`);
    },

    message(peer, message) {
        console.log('Message received:', message.toString());
        // peer.publish('board', `Broadcast: ${message.toString()}`);
        // peer.publish(`board:${boardId}`, `Broadcast: ${message.toString()}`);
    },

    close(peer, event) {
        console.log('Closed:', peer.id);
    },

    error(peer, error) {
        console.log('Error:', peer.id, error);
    },
});
