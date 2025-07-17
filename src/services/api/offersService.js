const offersService = {
  async getAll() {
    try {
      const tableName = 'offer_c';
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "discount_c" } },
          { field: { Name: "cta_text_c" } },
          { field: { Name: "original_price_c" } },
          { field: { Name: "sale_price_c" } },
          { field: { Name: "valid_until_c" } },
          { field: { Name: "features_c" } },
          { field: { Name: "is_active_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "updated_at_c" } }
        ],
        where: [
          {
            FieldName: "is_active_c",
            Operator: "EqualTo",
            Values: ["true"]
          }
        ],
        orderBy: [
          {
            fieldName: "priority_c",
            sorttype: "ASC"
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
        console.error("Error fetching offers:", response.message);
        return [];
      }
      
      // Transform response data to match UI expectations
      const transformedData = (response.data || []).map(offer => ({
        ...offer,
        title: offer.title_c,
        description: offer.description_c,
        discount: offer.discount_c,
        ctaText: offer.cta_text_c,
        originalPrice: offer.original_price_c,
        salePrice: offer.sale_price_c,
        validUntil: offer.valid_until_c,
        features: offer.features_c ? offer.features_c.split(',').map(f => f.trim()) : [],
        isActive: offer.is_active_c === 'true' || offer.is_active_c === true,
        priority: offer.priority_c,
        createdAt: offer.created_at_c,
        updatedAt: offer.updated_at_c
      }));
      
      return transformedData;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching offers:", error?.response?.data?.message);
      } else {
        console.error("Error fetching offers:", error.message);
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const tableName = 'offer_c';
      const recordId = parseInt(id);
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "discount_c" } },
          { field: { Name: "cta_text_c" } },
          { field: { Name: "original_price_c" } },
          { field: { Name: "sale_price_c" } },
          { field: { Name: "valid_until_c" } },
          { field: { Name: "features_c" } },
          { field: { Name: "is_active_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "updated_at_c" } }
        ]
      };
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.getRecordById(tableName, recordId, params);
      
      if (!response.success) {
        console.error("Error fetching offer:", response.message);
        return null;
      }
      
      if (!response.data) {
        return null;
      }
      
      // Transform response data to match UI expectations
      const offer = response.data;
      return {
        ...offer,
        title: offer.title_c,
        description: offer.description_c,
        discount: offer.discount_c,
        ctaText: offer.cta_text_c,
        originalPrice: offer.original_price_c,
        salePrice: offer.sale_price_c,
        validUntil: offer.valid_until_c,
        features: offer.features_c ? offer.features_c.split(',').map(f => f.trim()) : [],
        isActive: offer.is_active_c === 'true' || offer.is_active_c === true,
        priority: offer.priority_c,
        createdAt: offer.created_at_c,
        updatedAt: offer.updated_at_c
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching offer with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error("Error fetching offer:", error.message);
      }
      return null;
    }
  },

  async create(offerData) {
    try {
      const tableName = 'offer_c';
      
      const params = {
        records: [
          {
            Name: offerData.title,
            title_c: offerData.title,
            description_c: offerData.description,
            discount_c: offerData.discount,
            cta_text_c: offerData.ctaText,
            original_price_c: offerData.originalPrice,
            sale_price_c: offerData.salePrice,
            valid_until_c: offerData.validUntil,
            features_c: Array.isArray(offerData.features) ? offerData.features.join(',') : offerData.features,
            is_active_c: offerData.isActive ? "true" : "false",
            priority_c: offerData.priority || 1,
            created_at_c: new Date().toISOString(),
            updated_at_c: new Date().toISOString()
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
        console.error("Error creating offer:", response.message);
        return null;
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} offer records:${JSON.stringify(failedRecords)}`);
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating offer:", error?.response?.data?.message);
      } else {
        console.error("Error creating offer:", error.message);
      }
      return null;
    }
  },

  async update(id, offerData) {
    try {
      const tableName = 'offer_c';
      const recordId = parseInt(id);
      
      const params = {
        records: [
          {
            Id: recordId,
            Name: offerData.title,
            title_c: offerData.title,
            description_c: offerData.description,
            discount_c: offerData.discount,
            cta_text_c: offerData.ctaText,
            original_price_c: offerData.originalPrice,
            sale_price_c: offerData.salePrice,
            valid_until_c: offerData.validUntil,
            features_c: Array.isArray(offerData.features) ? offerData.features.join(',') : offerData.features,
            is_active_c: offerData.isActive ? "true" : "false",
            priority_c: offerData.priority || 1,
            updated_at_c: new Date().toISOString()
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
        console.error("Error updating offer:", response.message);
        throw new Error('Offer not found');
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} offer records:${JSON.stringify(failedUpdates)}`);
          throw new Error('Offer not found');
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating offer:", error?.response?.data?.message);
      } else {
        console.error("Error updating offer:", error.message);
      }
      throw new Error('Offer not found');
    }
  },

  async delete(id) {
    try {
      const tableName = 'offer_c';
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
        console.error("Error deleting offer:", response.message);
        throw new Error('Offer not found');
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} offer records:${JSON.stringify(failedDeletions)}`);
          throw new Error('Offer not found');
        }
        
        return successfulDeletions.length > 0 ? successfulDeletions[0].data : null;
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting offer:", error?.response?.data?.message);
      } else {
        console.error("Error deleting offer:", error.message);
      }
      throw new Error('Offer not found');
    }
  },

  async applyOffer(id) {
    try {
      const offer = await this.getById(id);
      
      if (!offer) {
        throw new Error('Offer not found');
      }

      if (!offer.isActive) {
        throw new Error('This offer is no longer active');
      }

      if (offer.validUntil && new Date(offer.validUntil) < new Date()) {
        throw new Error('This offer has expired');
      }

      // Simulate offer application success
      return {
        success: true,
        message: 'Offer applied successfully',
        offerId: parseInt(id),
        appliedAt: new Date().toISOString(),
        savings: offer.discount
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error applying offer:", error?.response?.data?.message);
      } else {
        console.error("Error applying offer:", error.message);
      }
      throw error;
    }
  }
};

export default offersService;