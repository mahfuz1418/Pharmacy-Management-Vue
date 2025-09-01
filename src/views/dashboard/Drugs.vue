<template>
  <div class="d-flex justify-content-between">
    <h2>All Drags</h2>

    <TheButton @click="addModal = true">Add New</TheButton>
  </div>

  <div class="card mt-4">
    <div class="card-body">
      <div class="text-center" v-if="gettingDrags">Loading...</div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Weight</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Vendor</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="drag in drags" :key="drag.name">
            <td>{{ drag.name }}</td>
            <td>{{ drag.type }}</td>
            <td>{{ drag.weight }}</td>
            <td>{{ drag.price }}</td>
            <td>{{ drag.quantity }}</td>
            <td>{{ drag.vendor.name }}</td>
            <td>
              <button
                class="btn btn-info btn-sm me-2"
                @click="
                  editModal = true;
                  selectedValues = drag;
                "
              >
                <i class="fa-solid fa-edit"></i>
              </button>
              <button
                class="btn btn-danger btn-sm"
                @click="
                  deleteModal = true;
                  selectedValues = drag;
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
  <TheModal v-model:modalValue="addModal" heading="Add Drug">
    <form @submit.prevent="addNewDrag">
      <label for="" class="mt-2 me-2">Drug Type:</label>
      <br />
      <div class="form-check form-check-inline mt-2">
        <input
          class="form-check-input"
          type="radio"
          id="type-tab"
          value="Tablet"
          v-model="newDrug.type"
        />
        <label class="form-check-label" for="type-tab">Tablet</label>
      </div>
      <div class="form-check form-check-inline mt-2">
        <input
          class="form-check-input"
          type="radio"
          id="type-capsule"
          value="Capsule"
          v-model="newDrug.type"
        />
        <label class="form-check-label" for="type-capsule">Capsule</label>
      </div>
      <div class="form-check form-check-inline mt-2">
        <input
          class="form-check-input"
          type="radio"
          id="type-syrup"
          value="Syrup"
          v-model="newDrug.type"
        />
        <label class="form-check-label" for="type-syrup">Syrup</label>
      </div>
      <div class="form-check form-check-inline mt-2">
        <input
          class="form-check-input"
          type="radio"
          id="type-injection"
          value="Injection"
          v-model="newDrug.type"
        />
        <label class="form-check-label" for="type-injection">Injection</label>
      </div>

      <br />
      <label for="" class="">Drug Name:</label>
      <input
        class="form-control"
        type="text"
        placeholder="Enter Drug Name"
        v-model="newDrug.name"
      />

      <label for="">Weight:</label>
      <input
        class="form-control"
        type="number"
        placeholder="Weight"
        v-model="newDrug.weight"
      />

      <label for="">Vendor:</label>
      <select name="" id="" class="form-control" v-model="newDrug.vendor_id">
        <option value="" selected>Select a vendor</option>
        <option v-for="vendor in vendors" :key="vendor.id" :value="vendor.id">
          {{ vendor.name }}
        </option>
      </select>

      <label for="">Price:</label>
      <input
        class="form-control"
        type="number"
        placeholder="Price"
        v-model="newDrug.price"
      />

      <label for="">Quantity:</label>
      <input
        class="form-control"
        type="number"
        placeholder="Quantity"
        v-model="newDrug.quantity"
      />

      <TheButton class="w-100 mt-4" :loading="adding">Add</TheButton>
    </form>
  </TheModal>

  <TheModal v-model:modalValue="editModal" heading="Edit Drug">
    <form @submit.prevent="editDrugs">
      <label for="" class="mt-2 me-2">Drug Type:</label>
      <br />
      <div class="form-check form-check-inline mt-2">
        <input
          class="form-check-input"
          type="radio"
          id="type-tab"
          value="Tablet"
          v-model="selectedValues.type"
        />
        <label class="form-check-label" for="type-tab">Tablet</label>
      </div>
      <div class="form-check form-check-inline mt-2">
        <input
          class="form-check-input"
          type="radio"
          id="type-capsule"
          value="Capsule"
          v-model="selectedValues.type"
        />
        <label class="form-check-label" for="type-capsule">Capsule</label>
      </div>
      <div class="form-check form-check-inline mt-2">
        <input
          class="form-check-input"
          type="radio"
          id="type-syrup"
          value="Syrup"
          v-model="selectedValues.type"
        />
        <label class="form-check-label" for="type-syrup">Syrup</label>
      </div>
      <div class="form-check form-check-inline mt-2">
        <input
          class="form-check-input"
          type="radio"
          id="type-injection"
          value="Injection"
          v-model="selectedValues.type"
        />
        <label class="form-check-label" for="type-injection">Injection</label>
      </div>

      <br />
      <label for="" class="">Drug Name:</label>
      <input
        class="form-control"
        type="text"
        placeholder="Enter Drug Name"
        v-model="selectedValues.name"
      />

      <label for="">Weight:</label>
      <input
        class="form-control"
        type="number"
        placeholder="Weight"
        v-model="selectedValues.weight"
      />

      <label for="">Vendor:</label>
      <select
        name=""
        id=""
        class="form-control"
        v-model="selectedValues.vendor_id"
      >
        <option value="" selected>Select a vendor</option>
        <option v-for="vendor in vendors" :key="vendor.id" :value="vendor.id">
          {{ vendor.name }}
        </option>
      </select>

      <label for="">Price:</label>
      <input
        class="form-control"
        type="number"
        placeholder="Price"
        v-model="selectedValues.price"
      />

      <label for="">Quantity:</label>
      <input
        class="form-control"
        type="number"
        placeholder="Quantity"
        v-model="selectedValues.quantity"
      />

      <TheButton class="w-100 mt-4" :loading="updating">Update</TheButton>
    </form>
  </TheModal>

  <TheModal v-model:modalValue="deleteModal" heading="Delete Drug">
    <p>
      Do you really want to delete
      <strong>{{ selectedValues.name }}</strong>
    </p>

    <TheButton :loading="delating" @click="deleteDrug">Yes</TheButton>
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
      newDrug: {
        name: "",
        type: "",
        weight: "",
        price: "",
        quantity: "",
        vendor_id: "",
      },
      adding: false,
      updating: false,
      delating: false,
      gettingDrags: false,
      drags: [],
      vendors: [],
      selectedValues: {},
    };
  },
  components: {
    TheButton,
    TheModal,
  },
  mounted() {
    setTimeout(this.getAllDrags, 100);
    setTimeout(this.getAllVendors, 100);
  },
  methods: {
    resetForm() {
      this.newVendor = { name: "", description: "" };
    },
    getAllDrags() {
      this.gettingDrags = true;
      privateServices
        .getAllDrags()
        .then((response) => {
          this.drags = response.data.data;
        })
        .catch((error) => {
          showErrorMessage(error);
        })
        .finally(() => {
          this.gettingDrags = false;
        });
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
    addNewDrag() {
      console.log(this.newDrug);

      this.adding = true;
      privateServices
        .addNewDrag(this.newDrug)
        .then((response) => {
          showSuccessMessage(response);
          this.resetForm();
          this.addModal = false;
          this.getAllDrags();
        })
        .catch((error) => {
          showErrorMessage(error);
        })
        .finally(() => {
          this.adding = false;
        });
    },
    editDrugs() {
      this.updating = true;
      console.log(this.selectedValues);

      const payload = {
        id: this.selectedValues.id,
        name: this.selectedValues.name,
        weight: this.selectedValues.weight,
        type: this.selectedValues.type,
        price: this.selectedValues.price,
        quantity: this.selectedValues.quantity,
        vendor_id: this.selectedValues.vendor_id,
      };

      privateServices
        .editDrugs(payload)
        .then((response) => {
          showSuccessMessage(response);
          this.editModal = false;
          this.getAllDrags();
        })
        .catch((error) => {
          showErrorMessage(error);
        })
        .finally(() => {
          this.updating = false;
        });
    },

    deleteDrug() {
      this.delating = true;
      privateServices
        .deleteDrugs(this.selectedValues.id)
        .then((response) => {
          showSuccessMessage(response);
          this.deleteModal = false;
          this.getAllDrags();
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
