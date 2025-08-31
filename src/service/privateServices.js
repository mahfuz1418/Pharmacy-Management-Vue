import { axiosPrivate } from "./axiosInstance";

export default {
  getVendors() {
    return axiosPrivate.get("/vendors");
  },
  addVendors(payload) {
    return axiosPrivate.post("/vendors", payload);
  },
  editVendors(payload) {
    return axiosPrivate.put("/vendors/" + payload.id, payload);
  },
  deleteVendors(id) {
    return axiosPrivate.delete("/vendors/" + id);
  },
};
