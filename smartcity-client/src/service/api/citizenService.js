import api from "./api";

// Create a complaint
export const createComplaint = (data) => api.post("/citizen/complaints", data);

// Update a complaint
export const updateComplaint = (id, data) =>
  api.put(`/citizen/complaints/${id}`, data);

// Get all complaints
export const getComplaints = () => api.get("/citizen/complaints");

// Get complaint by id
export const getComplaintById = (id) =>
  api.get(`/citizen/complaints/${id}`);


// ===== Contacts =====

// Submit contact form
export const submitContact = (data) => api.post("/citizen/contacts", data);

// Get all contacts
export const getContacts = () => api.get("/citizen/contacts");

// Get contact by id
export const getContactById = (id) =>
  api.get(`/citizen/contacts/${id}`);

export const getMyProfile = (userId) => {
  return api.get(`/citizen/profile`, {
    params: { userId },
  });
};

// Trigger email verification flow
export const verifyEmailAddress = (userId) => {
  return api.post(`/citizen/profile/verify-email`, { userId });
};


// Get bill by ID
export const getBillById = (id) => {
  return api.get(`/citizen/bills/${id}`);
};

// Fetch all bills for citizen
export const fetchMyAllBills = () => {
  return api.get("/citizen/bills");
};

// Pay a bill (mark as paid)
export const payBillById = (id) => {
  return api.put(`/citizen/bills/${id}`);
};