export default function () {
    const isValidParam = (id) => !isNaN(+id) && +id > 0;
    
    return {
        isValidParam,
    }
};