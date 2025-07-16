export const getKecamatan = async (search) => {
  try {
    const response = await fetch(`/api/kecamatan?search=${search}`);
    return await response.json();
  } catch (error) {
    console.error("Error saat ambil data:", error);
    throw error;
  }
};

export const getKotaKabupaten = async () => {
  try {
    const response = await fetch(`/api/kota-kabupaten`);
    return await response.json();
  } catch (error) {
    console.error("Error saat ambil data:", error);
    throw error;
  }
};

export const storeKecamatan = async (request) => {
  try {
    const response = await fetch("/api/kecamatan", {
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

export const showKecamatan = async (id) => {
  try {
    const response = await fetch(`/api/kecamatan/${id}`);
    return await response.json();
  } catch (error) {
    console.error("Error saat ambil data:", error);
    throw error;
  }
};

export const updateKecamatan = async (request, id) => {
  try {
    const response = await fetch(`/api/kecamatan/${id}`, {
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

export const deleteKecamatan = async (id) => {
  try {
    const response = await fetch(`/api/kecamatan/${id}`, {
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
