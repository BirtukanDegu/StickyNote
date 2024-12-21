export const bodyParser = (value) => {
    try {
        JSON.parse(value);
        return JSON.parse(value);
    } catch (error) {
        return value;
    }
}