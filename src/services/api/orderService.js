const orderService = {
  getAll: async () => {
    try {
      const tableName = 'order_c';
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "customer_name_c" } },
          { field: { Name: "customer_email_c" } },
          { field: { Name: "customer_phone_c" } },
          { field: { Name: "customer_address_c" } },
          { field: { Name: "cake_name_c" } },
          { field: { Name: "cake_size_c" } },
          { field: { Name: "cake_flavor_c" } },
          { field: { Name: "quantity_c" } },
          { field: { Name: "total_amount_c" } },
          { field: { Name: "order_date_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "special_instructions_c" } },
          { 
            field: { name: "cake_id_c" },
            referenceField: { field: { Name: "Name" } }
          }
        ],
        orderBy: [
          {
            fieldName: "order_date_c",
            sorttype: "DESC"
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
        console.error("Error fetching orders:", response.message);
        return [];
      }
      
      // Transform response data to match UI expectations
      const transformedData = (response.data || []).map(order => ({
        ...order,
        customerName: order.customer_name_c,
        customerEmail: order.customer_email_c,
        customerPhone: order.customer_phone_c,
        customerAddress: order.customer_address_c,
        cakeName: order.cake_name_c,
        cakeSize: order.cake_size_c,
        cakeFlavor: order.cake_flavor_c,
        quantity: order.quantity_c,
        totalAmount: order.total_amount_c,
        orderDate: order.order_date_c,
        status: order.status_c,
        specialInstructions: order.special_instructions_c,
        cakeId: order.cake_id_c?.Id || null
      }));
      
      return transformedData;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching orders:", error?.response?.data?.message);
      } else {
        console.error("Error fetching orders:", error.message);
      }
      return [];
    }
  },

  getById: async (id) => {
    try {
      const tableName = 'order_c';
      const recordId = parseInt(id);
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "customer_name_c" } },
          { field: { Name: "customer_email_c" } },
          { field: { Name: "customer_phone_c" } },
          { field: { Name: "customer_address_c" } },
          { field: { Name: "cake_name_c" } },
          { field: { Name: "cake_size_c" } },
          { field: { Name: "cake_flavor_c" } },
          { field: { Name: "quantity_c" } },
          { field: { Name: "total_amount_c" } },
          { field: { Name: "order_date_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "special_instructions_c" } },
          { 
            field: { name: "cake_id_c" },
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
        console.error("Error fetching order:", response.message);
        return null;
      }
      
      if (!response.data) {
        return null;
      }
      
      // Transform response data to match UI expectations
      const order = response.data;
      return {
        ...order,
        customerName: order.customer_name_c,
        customerEmail: order.customer_email_c,
        customerPhone: order.customer_phone_c,
        customerAddress: order.customer_address_c,
        cakeName: order.cake_name_c,
        cakeSize: order.cake_size_c,
        cakeFlavor: order.cake_flavor_c,
        quantity: order.quantity_c,
        totalAmount: order.total_amount_c,
        orderDate: order.order_date_c,
        status: order.status_c,
        specialInstructions: order.special_instructions_c,
        cakeId: order.cake_id_c?.Id || null
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching order with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error("Error fetching order:", error.message);
      }
      return null;
    }
  },

  create: async (orderData) => {
    try {
      const tableName = 'order_c';
      
      const params = {
        records: [
          {
            Name: orderData.customerName || `Order ${Date.now()}`,
            customer_name_c: orderData.customerName,
            customer_email_c: orderData.customerEmail,
            customer_phone_c: orderData.customerPhone,
            customer_address_c: orderData.customerAddress,
            cake_name_c: orderData.cakeName,
            cake_size_c: orderData.cakeSize,
            cake_flavor_c: orderData.cakeFlavor,
            quantity_c: orderData.quantity,
            total_amount_c: orderData.totalAmount,
            order_date_c: orderData.orderDate || new Date().toISOString(),
            status_c: orderData.status || 'pending',
            special_instructions_c: orderData.specialInstructions,
            cake_id_c: orderData.cakeId
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
        console.error("Error creating order:", response.message);
        throw new Error('Failed to create order');
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} order records:${JSON.stringify(failedRecords)}`);
          throw new Error('Failed to create order');
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating order:", error?.response?.data?.message);
      } else {
        console.error("Error creating order:", error.message);
      }
      throw new Error('Failed to create order');
    }
  },

  update: async (id, orderData) => {
    try {
      const tableName = 'order_c';
      const recordId = parseInt(id);
      
      const params = {
        records: [
          {
            Id: recordId,
            Name: orderData.customerName || `Order ${recordId}`,
            customer_name_c: orderData.customerName,
            customer_email_c: orderData.customerEmail,
            customer_phone_c: orderData.customerPhone,
            customer_address_c: orderData.customerAddress,
            cake_name_c: orderData.cakeName,
            cake_size_c: orderData.cakeSize,
            cake_flavor_c: orderData.cakeFlavor,
            quantity_c: orderData.quantity,
            total_amount_c: orderData.totalAmount,
            order_date_c: orderData.orderDate,
            status_c: orderData.status,
            special_instructions_c: orderData.specialInstructions,
            cake_id_c: orderData.cakeId
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
        console.error("Error updating order:", response.message);
        throw new Error('Failed to update order');
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} order records:${JSON.stringify(failedUpdates)}`);
          throw new Error('Failed to update order');
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating order:", error?.response?.data?.message);
      } else {
        console.error("Error updating order:", error.message);
      }
      throw new Error('Failed to update order');
    }
  },

  delete: async (id) => {
    try {
      const tableName = 'order_c';
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
        console.error("Error deleting order:", response.message);
        throw new Error('Failed to delete order');
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} order records:${JSON.stringify(failedDeletions)}`);
          throw new Error('Failed to delete order');
        }
        
        return { success: true };
      }
      
      return { success: false };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting order:", error?.response?.data?.message);
      } else {
        console.error("Error deleting order:", error.message);
      }
      throw new Error('Failed to delete order');
    }
  }
};

export default orderService;