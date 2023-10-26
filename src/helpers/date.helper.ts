const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    return date.toLocaleString("us-US", options);
};

export default formatDate;
