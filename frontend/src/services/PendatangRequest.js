export const getPendatang = async (search) => {
  try {
    const response = await fetch(`/api/pendatang?search=${search}`);
    return await response.json();
  } catch (error) {
    console.error("Error saat ambil data:", error);
    throw error;
  }
};

export const getTempat = async () => {
  try {
    const response = await fetch(`/api/kota-kabupaten`);
    return await response.json();
  } catch (error) {
    console.error("Error saat ambil data:", error);
    throw error;
  }
};

export const getPekerjaan = async () => {
  try {
    const response = await fetch(`/api/pekerjaan`);
    return await response.json();
  } catch (error) {
    console.error("Error saat ambil data:", error);
    throw error;
  }
};

export const getPendidikan = async () => {
  try {
    const response = await fetch(`/api/pendidikan`);
    return await response.json();
  } catch (error) {
    console.error("Error saat ambil data:", error);
    throw error;
  }
};

export const storePendatang = async (request) => {
  try {
    const response = await fetch("/api/pendatang", {
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

export const showPendatang = async (id) => {
  try {
    const response = await fetch(`/api/pendatang/${id}`);
    return await response.json();
  } catch (error) {
    console.error("Error saat ambil data:", error);
    throw error;
  }
};

export const updatePendatang = async (request, id) => {
  try {
    const response = await fetch(`/api/pendatang/${id}`, {
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

export const deletePendatang = async (id) => {
  try {
    const response = await fetch(`/api/pendatang/${id}`, {
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
