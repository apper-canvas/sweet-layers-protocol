import mockOffers from '@/services/mockData/offers.json';

let offersData = [...mockOffers];
let nextId = Math.max(...offersData.map(offer => offer.Id)) + 1;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const offersService = {
  async getAll() {
    await delay(500);
    return [...offersData];
  },

  async getById(id) {
    await delay(500);
    const parsedId = parseInt(id);
    const offer = offersData.find(offer => offer.Id === parsedId);
    return offer ? { ...offer } : null;
  },

  async create(offerData) {
    await delay(500);
    const newOffer = {
      ...offerData,
      Id: nextId++,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    offersData.push(newOffer);
    return { ...newOffer };
  },

  async update(id, offerData) {
    await delay(500);
    const parsedId = parseInt(id);
    const index = offersData.findIndex(offer => offer.Id === parsedId);
    
    if (index === -1) {
      throw new Error('Offer not found');
    }

    const updatedOffer = {
      ...offersData[index],
      ...offerData,
      Id: parsedId,
      updatedAt: new Date().toISOString()
    };
    
    offersData[index] = updatedOffer;
    return { ...updatedOffer };
  },

  async delete(id) {
    await delay(500);
    const parsedId = parseInt(id);
    const index = offersData.findIndex(offer => offer.Id === parsedId);
    
    if (index === -1) {
      throw new Error('Offer not found');
    }

    const deletedOffer = offersData[index];
    offersData.splice(index, 1);
    return { ...deletedOffer };
  }
};

export default offersService;