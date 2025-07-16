export const getHome = async () => {
  try {
    const response = await fetch(`/api/home`);
    return await response.json();
  } catch (error) {
    console.error("Error saat ambil data:", error);
    throw error;
  }
};
