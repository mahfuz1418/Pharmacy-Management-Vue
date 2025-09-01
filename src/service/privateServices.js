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
  getAllDrags() {
    return axiosPrivate.get("/drags");
  },
  addNewDrag(payload) {
    return axiosPrivate.post("/drags", payload);
  },
  editDrugs(payload) {
    return axiosPrivate.put("/drags/" + payload.id, payload);
  },
  deleteDrugs(id) {
    return axiosPrivate.delete("/drags/" + id);
  },
};
