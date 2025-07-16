export const getKelahiran = async (search) => {
    try {
      const response = await fetch(`/api/kelahiran?search=${search}`);
      return await response.json();
    } catch (error) {
      console.error("Error saat ambil data:", error);
      throw error;
    }
  };

export const getAyah = async () => {
    try {
      const response = await fetch(`/api/ayah`);
      return await response.json();
    } catch (error) {
      console.error("Error saat ambil data:", error);
      throw error;
    }
  };

export const getIbu = async () => {
    try {
      const response = await fetch(`/api/ibu`);
      return await response.json();
    } catch (error) {
      console.error("Error saat ambil data:", error);
      throw error;
    }
  };
  
  export const storeKelahiran = async (request) => {
    try {
      const response = await fetch("/api/kelahiran", {
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
  
  export const showKelahiran = async (id) => {
    try {
      const response = await fetch(`/api/kelahiran/${id}`);
      return await response.json();
    } catch (error) {
      console.error("Error saat ambil data:", error);
      throw error;
    }
  };
  
  export const updateKelahiran = async (request, id) => {
    try {
      const response = await fetch(`/api/kelahiran/${id}`, {
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
  
  export const deleteKelahiran = async (id) => {
    try {
      const response = await fetch(`/api/kelahiran/${id}`, {
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
  