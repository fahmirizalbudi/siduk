export const getPindah = async (search) => {
  try {
    const response = await fetch(`/api/pindah?search=${search}`);
    return await response.json();
  } catch (error) {
    console.error("Error saat ambil data:", error);
    throw error;
  }
};

export const getPenduduk = async () => {
  try {
    const response = await fetch(`/api/pindah/alt`);
    return await response.json();
  } catch (error) {
    console.error("Error saat ambil data:", error);
    throw error;
  }
};

export const storePindah = async (request) => {
  try {
    const response = await fetch("/api/pindah", {
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

export const showPindah = async (id) => {
  try {
    const response = await fetch(`/api/pindah/${id}`);
    return await response.json();
  } catch (error) {
    console.error("Error saat ambil data:", error);
    throw error;
  }
};

export const updatePindah = async (request, id) => {
  try {
    const response = await fetch(`/api/pindah/${id}`, {
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

export const deletePindah = async (id) => {
  try {
    const response = await fetch(`/api/pindah/${id}`, {
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
