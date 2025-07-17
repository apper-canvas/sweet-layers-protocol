import ordersData from '@/services/mockData/orders.json';

const orderService = {
  getAll: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...ordersData]);
      }, 300);
    });
  },

  getById: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const order = ordersData.find(order => order.Id === parseInt(id));
        resolve(order ? { ...order } : null);
      }, 300);
    });
  },

  create: (orderData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Generate new ID
          const newId = ordersData.length > 0 
            ? Math.max(...ordersData.map(o => o.Id)) + 1 
            : 1;

          const newOrder = {
            Id: newId,
            ...orderData,
            orderDate: new Date().toISOString(),
            status: 'pending',
            totalAmount: orderData.totalAmount || 0
          };

          ordersData.push(newOrder);
          resolve({ ...newOrder });
        } catch (error) {
          reject(new Error('Failed to create order'));
        }
      }, 400);
    });
  },

  update: (id, orderData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const index = ordersData.findIndex(order => order.Id === parseInt(id));
          if (index === -1) {
            reject(new Error('Order not found'));
            return;
          }

          ordersData[index] = { ...ordersData[index], ...orderData };
          resolve({ ...ordersData[index] });
        } catch (error) {
          reject(new Error('Failed to update order'));
        }
      }, 300);
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const index = ordersData.findIndex(order => order.Id === parseInt(id));
          if (index === -1) {
            reject(new Error('Order not found'));
            return;
          }

          ordersData.splice(index, 1);
          resolve({ success: true });
        } catch (error) {
          reject(new Error('Failed to delete order'));
        }
      }, 300);
    });
  }
};

export default orderService;