import categoriesData from "@/services/mockData/categories.json";

const categoriesService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...categoriesData].sort((a, b) => a.displayOrder - b.displayOrder);
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const category = categoriesData.find(cat => cat.Id === parseInt(id));
    return category ? { ...category } : null;
  },

  create: async (categoryData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newCategory = {
      ...categoryData,
      Id: Math.max(...categoriesData.map(c => c.Id)) + 1
    };
    categoriesData.push(newCategory);
    return { ...newCategory };
  },

  update: async (id, categoryData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = categoriesData.findIndex(cat => cat.Id === parseInt(id));
    if (index !== -1) {
      categoriesData[index] = { ...categoriesData[index], ...categoryData };
      return { ...categoriesData[index] };
    }
    return null;
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = categoriesData.findIndex(cat => cat.Id === parseInt(id));
    if (index !== -1) {
      const deletedCategory = { ...categoriesData[index] };
      categoriesData.splice(index, 1);
      return deletedCategory;
    }
    return null;
  }
};

export default categoriesService;