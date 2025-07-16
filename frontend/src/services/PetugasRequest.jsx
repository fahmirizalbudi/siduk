export const getPetugas = async (search) => {
    try {
      const response = await fetch(`/api/petugas?search=${search}`);
      return await response.json();
    } catch (error) {
      console.error("Error saat ambil data:", error);
      throw error;
    }
  };
  
  export const storePetugas = async (request) => {
    try {
      const response = await fetch("/api/petugas", {
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
  
  export const showPetugas = async (id) => {
    try {
      const response = await fetch(`/api/petugas/${id}`);
      return await response.json();
    } catch (error) {
      console.error("Error saat ambil data:", error);
      throw error;
    }
  };
  
  export const updatePetugas = async (request, id) => {
    try {
      const response = await fetch(`/api/petugas/${id}`, {
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
  
  export const deletePetugas = async (id) => {
    try {
      const response = await fetch(`/api/petugas/${id}`, {
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
  