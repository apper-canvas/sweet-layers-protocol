import cakesData from "@/services/mockData/cakes.json";

const cakesService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...cakesData];
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const cake = cakesData.find(cake => cake.Id === parseInt(id));
    return cake ? { ...cake } : null;
  },

  getFeatured: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return cakesData.filter(cake => cake.featured).map(cake => ({ ...cake }));
  },

  getByCategory: async (category) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return cakesData.filter(cake => cake.category === category).map(cake => ({ ...cake }));
  },

  create: async (cakeData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newCake = {
      ...cakeData,
      Id: Math.max(...cakesData.map(c => c.Id)) + 1
    };
    cakesData.push(newCake);
    return { ...newCake };
  },

  update: async (id, cakeData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = cakesData.findIndex(cake => cake.Id === parseInt(id));
    if (index !== -1) {
      cakesData[index] = { ...cakesData[index], ...cakeData };
      return { ...cakesData[index] };
    }
    return null;
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = cakesData.findIndex(cake => cake.Id === parseInt(id));
    if (index !== -1) {
      const deletedCake = { ...cakesData[index] };
      cakesData.splice(index, 1);
      return deletedCake;
    }
    return null;
  }
};

export default cakesService;