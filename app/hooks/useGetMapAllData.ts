export const useGetMapAllData = async () => {
    const response = await fetch("http://localhost:3000/api/post", {
        cache: "no-store",
    });

    const mapAllData = await response.json();

    return { mapAllData };
};
