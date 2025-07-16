export const getRt = async (search) => {
    try {
      const response = await fetch(`/api/rt?search=${search}`);
      return await response.json();
    } catch (error) {
      console.error("Error saat ambil data:", error);
      throw error;
    }
  };
  
  export const storeRt = async (request) => {
    try {
      const response = await fetch("/api/rt", {
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
  
  export const showRt = async (id) => {
    try {
      const response = await fetch(`/api/rt/${id}`);
      return await response.json();
    } catch (error) {
      console.error("Error saat ambil data:", error);
      throw error;
    }
  };
  
  export const updateRt = async (request, id) => {
    try {
      const response = await fetch(`/api/rt/${id}`, {
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
  
  export const deleteRt = async (id) => {
    try {
      const response = await fetch(`/api/rt/${id}`, {
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
  