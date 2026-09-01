export default defineEventHandler((event) => {
  try {
    const req = event.node.req;

    if (!req || !req.url) return;

    if (req.url.startsWith('/boards/4444')) {
      console.log('[ws-debug] incoming request:', req.method, req.url);
      console.log('[ws-debug] headers.upgrade:', req.headers && req.headers.upgrade);
      console.log('[ws-debug] headers.connection:', req.headers && req.headers.connection);
      console.log('[ws-debug] full headers:', req.headers);
    }
  } catch (e) {
    console.error('[ws-debug] error reading request', e);
  }
});
