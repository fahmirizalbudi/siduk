export const getPendidikan = async (search) => {
    try {
      const response = await fetch(`/api/pendidikan?search=${search}`);
      return await response.json();
    } catch (error) {
      console.error("Error saat ambil data:", error);
      throw error;
    }
  };
  
  export const storePendidikan = async (request) => {
    try {
      const response = await fetch("/api/pendidikan", {
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
  
  export const showPendidikan = async (id) => {
    try {
      const response = await fetch(`/api/pendidikan/${id}`);
      return await response.json();
    } catch (error) {
      console.error("Error saat ambil data:", error);
      throw error;
    }
  };
  
  export const updatePendidikan = async (request, id) => {
    try {
      const response = await fetch(`/api/pendidikan/${id}`, {
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
  
  export const deletePendidikan = async (id) => {
    try {
      const response = await fetch(`/api/pendidikan/${id}`, {
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
  