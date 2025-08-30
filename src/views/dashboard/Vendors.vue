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

    <TheButton :loading="delating">Yes</TheButton>
    <TheButton class="mx-3" color="gray">No</TheButton>
  </TheModal>
</template>
<script>
import axios from "axios";
import TheButton from "../../components/TheButton.vue";
import TheModal from "../../components/TheModal.vue";

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
    this.getAllVendors();
  },
  methods: {
    resetForm() {
      this.newVendor = { name: "", description: "" };
    },
    getAllVendors() {
      this.gettingVendors = true;
      axios
        .get("http://127.0.0.1:8000/api/vendors", {
          headers: {
            Authorization: localStorage.getItem("accesstoken"),
          },
        })
        .then((response) => {
          this.vendors = response.data.data;
        })
        .catch((error) => {})
        .finally(() => {
          this.gettingVendors = false;
        });
    },
    addNewVendor() {
      this.adding = true;
      axios
        .post("http://127.0.0.1:8000/api/vendors", this.newVendor, {
          headers: {
            Authorization: localStorage.getItem("accesstoken"),
          },
        })
        .then((response) => {
          this.$eventBus.emit("toast", {
            type: "Success",
            message: response.data.message,
          });
          this.resetForm();
          this.addModal = false;
          this.getAllVendors();
        })
        .catch((error) => {
          let errorMessage = "Something went wrong!";
          if (error.response) {
            errorMessage = error.response.data.error;
          }

          this.$eventBus.emit("toast", {
            type: "Error",
            message: errorMessage,
          });
        })
        .finally(() => {
          this.adding = false;
        });
    },
    editVendor() {
      this.updating = true;
      axios
        .put(
          "http://127.0.0.1:8000/api/vendors/" + this.selectedValues.id,
          this.selectedValues,
          {
            headers: {
              Authorization: localStorage.getItem("accesstoken"),
            },
          }
        )
        .then((response) => {
          this.$eventBus.emit("toast", {
            type: "Success",
            message: response.data.message,
          });
          this.editModal = false;
          this.getAllVendors();
        })
        .catch((error) => {
          let errorMessage = "Something went wrong!";
          if (error.response) {
            errorMessage = error.response.data.error;
          }

          this.$eventBus.emit("toast", {
            type: "Error",
            message: errorMessage,
          });
        })
        .finally(() => {
          this.updating = false;
        });
    },
  },
};
</script>
<style></style>
