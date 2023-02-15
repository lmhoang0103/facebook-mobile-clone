export const isParsable = (data) => {
    try {
        const parsedData = JSON.parse(data);
        if (typeof parsedData === 'object') return true;
        return false;
    } catch (error) {
        return false;
    }
};
