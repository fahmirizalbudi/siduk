export const getKematian = async (search) => {
  try {
    const response = await fetch(`/api/kematian?search=${search}`);
    return await response.json();
  } catch (error) {
    console.error("Error saat ambil data:", error);
    throw error;
  }
};

export const getPenduduk = async () => {
  try {
    const response = await fetch(`/api/kematian/alt`);
    return await response.json();
  } catch (error) {
    console.error("Error saat ambil data:", error);
    throw error;
  }
};

export const storeKematian = async (request) => {
  try {
    const response = await fetch("/api/kematian", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    return await response.json();
  } catch (error) {
    console.error("Error saat post data:", error);
    throw error;
  }
};

export const showKematian = async (id) => {
  try {
    const response = await fetch(`/api/kematian/${id}`);
    return await response.json();
  } catch (error) {
    console.error("Error saat ambil data:", error);
    throw error;
  }
};

export const updateKematian = async (request, id) => {
  try {
    const response = await fetch(`/api/kematian/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    return await response.json();
  } catch (error) {
    console.error("Error saat update data:", error);
    throw error;
  }
};

export const deleteKematian = async (id) => {
  try {
    const response = await fetch(`/api/kematian/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Gagal fetch data");
    return await response.json();
  } catch (error) {
    console.error("Error saat delete data:", error);
    throw error;
  }
};
