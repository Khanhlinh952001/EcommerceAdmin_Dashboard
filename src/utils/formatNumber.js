export const formatNumber = (number) => {
    // Ensure number is a valid number
    if (typeof number !== 'number') {
        return '';
    }

    // Format the number using Math.floor and toLocaleString
    return Math.floor(number).toLocaleString('en');
};
