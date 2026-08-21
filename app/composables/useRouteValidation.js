export default function () {
    // TODO: Move to /shared
    const isValidParam = (id) => !isNaN(+id) && +id > 0;
    
    return {
        isValidParam,
    }
};