export const getKeluarga = async (search) => {
  try {
    const response = await fetch(`/api/keluarga?search=${search}`);
    return await response.json();
  } catch (error) {
    console.error("Error saat ambil data:", error);
    throw error;
  }
};

export const getRt = async () => {
  try {
    const response = await fetch(`/api/rt`);
    return await response.json();
  } catch (error) {
    console.error("Error saat ambil data:", error);
    throw error;
  }
};

export const getRw = async () => {
  try {
    const response = await fetch(`/api/rw`);
    return await response.json();
  } catch (error) {
    console.error("Error saat ambil data:", error);
    throw error;
  }
};

export const getDaerah = async () => {
  try {
    const response = await fetch(`/api/desa-kelurahan`);
    return await response.json();
  } catch (error) {
    console.error("Error saat ambil data:", error);
    throw error;
  }
};

export const storeKeluarga = async (request) => {
  try {
    const response = await fetch("/api/keluarga", {
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

export const showKeluarga = async (id) => {
  try {
    const response = await fetch(`/api/keluarga/${id}`);
    return await response.json();
  } catch (error) {
    console.error("Error saat ambil data:", error);
    throw error;
  }
};

export const updateKeluarga = async (request, id) => {
  try {
    const response = await fetch(`/api/keluarga/${id}`, {
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

export const deleteKeluarga = async (id) => {
  try {
    const response = await fetch(`/api/keluarga/${id}`, {
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
