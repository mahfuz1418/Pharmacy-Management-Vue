<template>
  <div class="d-flex justify-content-between">
    <h2>All Vendors</h2>

    <TheButton @click="addModal = true">Add New</TheButton>
  </div>

  <div class="card mt-4">
    <div class="card-body">
      <div class="text-center" v-if="gettingVendors">Loading...</div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="vendor in vendors" :key="vendor.name">
            <td>{{ vendor.name }}</td>
            <td>{{ vendor.description }}</td>
            <td>
              <button
                class="btn btn-info btn-sm me-2"
                @click="
                  editModal = true;
                  selectedValues = vendor;
                "
              >
                <i class="fa-solid fa-edit"></i>
              </button>
              <button
                class="btn btn-danger btn-sm"
                @click="
                  deleteModal = true;
                  selectedValues = vendor;
                "
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <TheModal v-model:modalValue="addModal" heading="Add Vendor">
    <form @submit.prevent="addNewVendor">
      <label for="">Vendor Name:</label>
      <input
        class="form-control"
        type="text"
        placeholder="Enter Vendor Name"
        v-model="newVendor.name"
      />

      <label for="" class="mt-2">Description:</label>
      <textarea
        name=""
        id=""
        class="form-control"
        v-model="newVendor.description"
      ></textarea>

      <TheButton class="w-100 mt-4" :loading="adding">Add</TheButton>
    </form>
  </TheModal>

  <TheModal v-model:modalValue="editModal" heading="Edit Vendor">
    <form @submit.prevent="editVendor">
      <label for="">Vendor Name:</label>
      <input
        class="form-control"
        type="text"
        placeholder="Enter Vendor Name"
        v-model="selectedValues.name"
      />

      <label for="" class="mt-2">Description:</label>
      <textarea
        name=""
        id=""
        class="form-control"
        v-model="selectedValues.description"
      ></textarea>

      <TheButton class="w-100 mt-4" :loading="updating">Update</TheButton>
    </form>
  </TheModal>

  <TheModal v-model:modalValue="deleteModal" heading="Delete Vendor">
    <p>
      Do you really want to delete
      <strong>{{ selectedValues.name }}</strong>
    </p>

    <TheButton :loading="delating" @click="deleteVendor">Yes</TheButton>
    <TheButton class="mx-3" color="gray" @click="deleteModal = false"
      >No</TheButton
    >
  </TheModal>
</template>
<script>
import axios from "axios";
import TheButton from "../../components/TheButton.vue";
import TheModal from "../../components/TheModal.vue";
import { showErrorMessage, showSuccessMessage } from "../../utils/functions";
import privateServices from "../../service/privateServices";

export default {
  data() {
    return {
      addModal: false,
      editModal: false,
      deleteModal: false,
      newVendor: {
        name: "",
        description: "",
      },
      adding: false,
      updating: false,
      delating: false,
      gettingVendors: false,
      vendors: [],
      selectedValues: {},
    };
  },
  components: {
    TheButton,
    TheModal,
  },
  mounted() {
    setTimeout(this.getAllVendors, 100);
  },
  methods: {
    resetForm() {
      this.newVendor = { name: "", description: "" };
    },
    getAllVendors() {
      this.gettingVendors = true;
      privateServices
        .getVendors()
        .then((response) => {
          this.vendors = response.data.data;
        })
        .catch((error) => {
          showErrorMessage(error);
        })
        .finally(() => {
          this.gettingVendors = false;
        });
    },
    addNewVendor() {
      this.adding = true;
      privateServices
        .addVendors(this.newVendor)
        .then((response) => {
          showSuccessMessage(response);
          this.resetForm();
          this.addModal = false;
          this.getAllVendors();
        })
        .catch((error) => {
          showErrorMessage(error);
        })
        .finally(() => {
          this.adding = false;
        });
    },
    editVendor() {
      this.updating = true;
      privateServices
        .editVendors(this.selectedValues)
        .then((response) => {
          showSuccessMessage(response);
          this.editModal = false;
          this.getAllVendors();
        })
        .catch((error) => {
          showErrorMessage(error);
        })
        .finally(() => {
          this.updating = false;
        });
    },

    deleteVendor() {
      this.delating = true;
      privateServices
        .deleteVendors(this.selectedValues.id)
        .then((response) => {
          showSuccessMessage(response);
          this.deleteModal = false;
          this.getAllVendors();
        })
        .catch((error) => {
          showErrorMessage(error);
        })
        .finally(() => {
          this.delating = false;
        });
    },
  },
};
</script>
<style></style>
