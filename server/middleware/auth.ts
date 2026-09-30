export default defineEventHandler(event => (
    event.context.user = getUserFromAuthCookie(event)
));
