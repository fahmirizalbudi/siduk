export const getPekerjaan = async (search) => {
  try {
    const response = await fetch(`/api/pekerjaan?search=${search}`);
    return await response.json();
  } catch (error) {
    console.error("Error saat ambil data:", error);
    throw error;
  }
};

export const storePekerjaan = async (request) => {
  try {
    const response = await fetch("/api/pekerjaan", {
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

export const showPekerjaan = async (id) => {
  try {
    const response = await fetch(`/api/pekerjaan/${id}`);
    return await response.json();
  } catch (error) {
    console.error("Error saat ambil data:", error);
    throw error;
  }
};

export const updatePekerjaan = async (request, id) => {
  try {
    const response = await fetch(`/api/pekerjaan/${id}`, {
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

export const deletePekerjaan = async (id) => {
  try {
    const response = await fetch(`/api/pekerjaan/${id}`, {
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
