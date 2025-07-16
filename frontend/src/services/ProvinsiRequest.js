export const getProvinsi = async (search) => {
  try {
    const response = await fetch(`/api/provinsi?search=${search}`);
    return await response.json();
  } catch (error) {
    console.error("Error saat ambil data:", error);
    throw error;
  }
};

export const storeProvinsi = async (request) => {
  try {
    const response = await fetch("/api/provinsi", {
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

export const showProvinsi = async (id) => {
  try {
    const response = await fetch(`/api/provinsi/${id}`);
    return await response.json();
  } catch (error) {
    console.error("Error saat ambil data:", error);
    throw error;
  }
};

export const updateProvinsi = async (request, id) => {
  try {
    const response = await fetch(`/api/provinsi/${id}`, {
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

export const deleteProvinsi = async (id) => {
  try {
    const response = await fetch(`/api/provinsi/${id}`, {
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
