const cakesService = {
  getAll: async () => {
    try {
      const tableName = 'cake_c';
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "price_c" } },
          { field: { Name: "image_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "featured_c" } },
          { field: { Name: "ingredients_c" } },
          { field: { Name: "sizes_c" } },
          { field: { Name: "flavors_c" } },
          { field: { Name: "dietary_options_c" } },
          { field: { Name: "nutritional_info_c" } },
          { 
            field: { name: "category_c" },
            referenceField: { field: { Name: "Name" } }
          }
        ]
      };
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error("Error fetching cakes:", response.message);
        return [];
      }
      
      // Transform response data to match UI expectations
      const transformedData = (response.data || []).map(cake => ({
        ...cake,
        name: cake.Name,
        price: cake.price_c,
        image: cake.image_c,
        description: cake.description_c,
        featured: cake.featured_c === 'true' || cake.featured_c === true,
        ingredients: cake.ingredients_c ? cake.ingredients_c.split(',').map(i => i.trim()) : [],
        sizes: cake.sizes_c ? cake.sizes_c.split(',').map(s => s.trim()) : [],
        flavors: cake.flavors_c ? cake.flavors_c.split(',').map(f => f.trim()) : [],
        dietaryOptions: cake.dietary_options_c ? cake.dietary_options_c.split(',').map(d => d.trim()) : [],
        nutritionalInfo: cake.nutritional_info_c ? JSON.parse(cake.nutritional_info_c) : null,
        category: cake.category_c?.Name || ""
      }));
      
      return transformedData;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching cakes:", error?.response?.data?.message);
      } else {
        console.error("Error fetching cakes:", error.message);
      }
      return [];
    }
  },

  getById: async (id) => {
    try {
      const tableName = 'cake_c';
      const recordId = parseInt(id);
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "price_c" } },
          { field: { Name: "image_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "featured_c" } },
          { field: { Name: "ingredients_c" } },
          { field: { Name: "sizes_c" } },
          { field: { Name: "flavors_c" } },
          { field: { Name: "dietary_options_c" } },
          { field: { Name: "nutritional_info_c" } },
          { 
            field: { name: "category_c" },
            referenceField: { field: { Name: "Name" } }
          }
        ]
      };
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.getRecordById(tableName, recordId, params);
      
      if (!response.success) {
        console.error("Error fetching cake:", response.message);
        return null;
      }
      
      if (!response.data) {
        return null;
      }
      
      // Transform response data to match UI expectations
      const cake = response.data;
      return {
        ...cake,
        name: cake.Name,
        price: cake.price_c,
        image: cake.image_c,
        description: cake.description_c,
        featured: cake.featured_c === 'true' || cake.featured_c === true,
        ingredients: cake.ingredients_c ? cake.ingredients_c.split(',').map(i => i.trim()) : [],
        sizes: cake.sizes_c ? cake.sizes_c.split(',').map(s => s.trim()) : [],
        flavors: cake.flavors_c ? cake.flavors_c.split(',').map(f => f.trim()) : [],
        dietaryOptions: cake.dietary_options_c ? cake.dietary_options_c.split(',').map(d => d.trim()) : [],
        nutritionalInfo: cake.nutritional_info_c ? JSON.parse(cake.nutritional_info_c) : null,
        category: cake.category_c?.Name || ""
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching cake with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error("Error fetching cake:", error.message);
      }
      return null;
    }
  },

  getFeatured: async () => {
    try {
      const tableName = 'cake_c';
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "price_c" } },
          { field: { Name: "image_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "featured_c" } },
          { field: { Name: "ingredients_c" } },
          { field: { Name: "sizes_c" } },
          { field: { Name: "flavors_c" } },
          { field: { Name: "dietary_options_c" } },
          { field: { Name: "nutritional_info_c" } },
          { 
            field: { name: "category_c" },
            referenceField: { field: { Name: "Name" } }
          }
        ],
        where: [
          {
            FieldName: "featured_c",
            Operator: "EqualTo",
            Values: ["true"]
          }
        ]
      };
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error("Error fetching featured cakes:", response.message);
        return [];
      }
      
      // Transform response data to match UI expectations
      const transformedData = (response.data || []).map(cake => ({
        ...cake,
        name: cake.Name,
        price: cake.price_c,
        image: cake.image_c,
        description: cake.description_c,
        featured: cake.featured_c === 'true' || cake.featured_c === true,
        ingredients: cake.ingredients_c ? cake.ingredients_c.split(',').map(i => i.trim()) : [],
        sizes: cake.sizes_c ? cake.sizes_c.split(',').map(s => s.trim()) : [],
        flavors: cake.flavors_c ? cake.flavors_c.split(',').map(f => f.trim()) : [],
        dietaryOptions: cake.dietary_options_c ? cake.dietary_options_c.split(',').map(d => d.trim()) : [],
        nutritionalInfo: cake.nutritional_info_c ? JSON.parse(cake.nutritional_info_c) : null,
        category: cake.category_c?.Name || ""
      }));
      
      return transformedData;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching featured cakes:", error?.response?.data?.message);
      } else {
        console.error("Error fetching featured cakes:", error.message);
      }
      return [];
    }
  },

  getByCategory: async (category) => {
    try {
      const tableName = 'cake_c';
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "price_c" } },
          { field: { Name: "image_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "featured_c" } },
          { field: { Name: "ingredients_c" } },
          { field: { Name: "sizes_c" } },
          { field: { Name: "flavors_c" } },
          { field: { Name: "dietary_options_c" } },
          { field: { Name: "nutritional_info_c" } },
          { 
            field: { name: "category_c" },
            referenceField: { field: { Name: "Name" } }
          }
        ],
        where: [
          {
            FieldName: "category_c",
            Operator: "EqualTo",
            Values: [category]
          }
        ]
      };
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error("Error fetching cakes by category:", response.message);
        return [];
      }
      
      // Transform response data to match UI expectations
      const transformedData = (response.data || []).map(cake => ({
        ...cake,
        name: cake.Name,
        price: cake.price_c,
        image: cake.image_c,
        description: cake.description_c,
        featured: cake.featured_c === 'true' || cake.featured_c === true,
        ingredients: cake.ingredients_c ? cake.ingredients_c.split(',').map(i => i.trim()) : [],
        sizes: cake.sizes_c ? cake.sizes_c.split(',').map(s => s.trim()) : [],
        flavors: cake.flavors_c ? cake.flavors_c.split(',').map(f => f.trim()) : [],
        dietaryOptions: cake.dietary_options_c ? cake.dietary_options_c.split(',').map(d => d.trim()) : [],
        nutritionalInfo: cake.nutritional_info_c ? JSON.parse(cake.nutritional_info_c) : null,
        category: cake.category_c?.Name || ""
      }));
      
      return transformedData;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching cakes by category:", error?.response?.data?.message);
      } else {
        console.error("Error fetching cakes by category:", error.message);
      }
      return [];
    }
  },

  create: async (cakeData) => {
    try {
      const tableName = 'cake_c';
      
      const params = {
        records: [
          {
            Name: cakeData.name,
            price_c: cakeData.price,
            image_c: cakeData.image,
            description_c: cakeData.description,
            featured_c: cakeData.featured ? "true" : "false",
            ingredients_c: Array.isArray(cakeData.ingredients) ? cakeData.ingredients.join(',') : cakeData.ingredients,
            sizes_c: Array.isArray(cakeData.sizes) ? cakeData.sizes.join(',') : cakeData.sizes,
            flavors_c: Array.isArray(cakeData.flavors) ? cakeData.flavors.join(',') : cakeData.flavors,
            dietary_options_c: Array.isArray(cakeData.dietaryOptions) ? cakeData.dietaryOptions.join(',') : cakeData.dietaryOptions,
            nutritional_info_c: cakeData.nutritionalInfo ? JSON.stringify(cakeData.nutritionalInfo) : null,
            category_c: cakeData.categoryId
          }
        ]
      };
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.createRecord(tableName, params);
      
      if (!response.success) {
        console.error("Error creating cake:", response.message);
        return null;
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} cake records:${JSON.stringify(failedRecords)}`);
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating cake:", error?.response?.data?.message);
      } else {
        console.error("Error creating cake:", error.message);
      }
      return null;
    }
  },

  update: async (id, cakeData) => {
    try {
      const tableName = 'cake_c';
      const recordId = parseInt(id);
      
      const params = {
        records: [
          {
            Id: recordId,
            Name: cakeData.name,
            price_c: cakeData.price,
            image_c: cakeData.image,
            description_c: cakeData.description,
            featured_c: cakeData.featured ? "true" : "false",
            ingredients_c: Array.isArray(cakeData.ingredients) ? cakeData.ingredients.join(',') : cakeData.ingredients,
            sizes_c: Array.isArray(cakeData.sizes) ? cakeData.sizes.join(',') : cakeData.sizes,
            flavors_c: Array.isArray(cakeData.flavors) ? cakeData.flavors.join(',') : cakeData.flavors,
            dietary_options_c: Array.isArray(cakeData.dietaryOptions) ? cakeData.dietaryOptions.join(',') : cakeData.dietaryOptions,
            nutritional_info_c: cakeData.nutritionalInfo ? JSON.stringify(cakeData.nutritionalInfo) : null,
            category_c: cakeData.categoryId
          }
        ]
      };
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.updateRecord(tableName, params);
      
      if (!response.success) {
        console.error("Error updating cake:", response.message);
        return null;
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} cake records:${JSON.stringify(failedUpdates)}`);
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating cake:", error?.response?.data?.message);
      } else {
        console.error("Error updating cake:", error.message);
      }
      return null;
    }
  },

  delete: async (id) => {
    try {
      const tableName = 'cake_c';
      const recordId = parseInt(id);
      
      const params = {
        RecordIds: [recordId]
      };
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.deleteRecord(tableName, params);
      
      if (!response.success) {
        console.error("Error deleting cake:", response.message);
        return false;
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} cake records:${JSON.stringify(failedDeletions)}`);
        }
        
        return successfulDeletions.length > 0;
      }
      
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting cake:", error?.response?.data?.message);
      } else {
        console.error("Error deleting cake:", error.message);
      }
      return false;
    }
  }
};

export default cakesService;