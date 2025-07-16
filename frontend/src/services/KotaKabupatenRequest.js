export const getKotaKabupaten = async (search) => {
  try {
    const response = await fetch(`/api/kota-kabupaten?search=${search}`);
    return await response.json();
  } catch (error) {
    console.error("Error saat ambil data:", error);
    throw error;
  }
};

export const getProvinsi = async () => {
  try {
    const response = await fetch(`/api/provinsi`);
    return await response.json();
  } catch (error) {
    console.error("Error saat ambil data:", error);
    throw error;
  }
};

export const storeKotaKabupaten = async (request) => {
  try {
    const response = await fetch("/api/kota-kabupaten", {
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

export const showKotaKabupaten = async (id) => {
  try {
    const response = await fetch(`/api/kota-kabupaten/${id}`);
    return await response.json();
  } catch (error) {
    console.error("Error saat ambil data:", error);
    throw error;
  }
};

export const updateKotaKabupaten = async (request, id) => {
  try {
    const response = await fetch(`/api/kota-kabupaten/${id}`, {
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

export const deleteKotaKabupaten = async (id) => {
  try {
    const response = await fetch(`/api/kota-kabupaten/${id}`, {
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