import api from "./api";

// ==================== COMPLAINTS ==================== //

// Get all complaints
export const getAllComplaints = () => {
  return api.get("/admin/complaints");
};

// Get complaint by ID
export const getComplaintById = (id) => {
  return api.get(`/admin/complaints/${id}`);
};

// ==================== CONTACTS ==================== //

// Get all contacts
export const getAllContacts = () => {
  return api.get("/admin/contacts");
};

// Get contact by ID
export const getContactById = (id) => {
  return api.get(`/admin/contacts/${id}`);
};
