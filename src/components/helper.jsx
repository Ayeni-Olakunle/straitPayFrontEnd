export const timeStampDate = (created_at) => {
    const year = created_at.slice(0, 4);
    const month = created_at.slice(5, 7);
    const day = created_at.slice(8, 10);

    return `${year}-${month}-${day}}`
}