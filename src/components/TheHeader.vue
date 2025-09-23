<template>
  <div class="the-header">
    <div class="p-relative">
      <input
        type="text"
        class="the-header__search"
        placeholder="Search..."
        @focus="searchFocused = true"
        @blur="handleBlur"
        v-model="searchString"
      />
    </div>

    <div class="search-results" v-show="searchFocused">
      <table class="w-100">
        <tr
          class="result-item"
          v-for="drug in drugs"
          :key="drug.name"
          @click="handleClick(drug)"
        >
          <!-- @click="handleClick(drug)" -->
          <td>{{ drug.name }}</td>
          <td>{{ drug.weight }}mg</td>
          <td>{{ drug.vendor.name }}</td>
          <td>{{ drug.quantity }}</td>
        </tr>
      </table>
    </div>

    <div class="avatar-wrapper">
      <div class="avatar" @click="showAvatar = !showAvatar">T</div>
      <div class="avatar__overflow" v-show="showAvatar">
        <div class="avatar__overflow-title">test@gmail.com</div>
        <router-link to="/dashboard/vendors">
          <div
            class="avatar__overflow-link mt-2"
            @click="
              showAvatar = false;
              $router.push('/dashboard/vendors');
            "
          >
            Settings
          </div>
        </router-link>
        <router-link to="#" @click="logout">
          <div class="avatar__overflow-link mb-2">Logout</div>
        </router-link>
      </div>
    </div>

    <TheModal v-model:modalValue="detailsModal" heading="Drug Details">
      <div>
        <table class="drug-details">
          <tr>
            <th>Name:</th>
            <td>{{ selectedDrug.name }}</td>
          </tr>
          <tr>
            <th>Type:</th>
            <td>{{ selectedDrug.type }}</td>
          </tr>

          <tr>
            <th>Weight:</th>
            <td>{{ selectedDrug.weight }}</td>
          </tr>

          <tr>
            <th>Vendor:</th>
            <td>{{ selectedDrug?.vendor?.name || "No vendor" }}</td>
          </tr>

          <tr>
            <th>Price:</th>
            <td>{{ selectedDrug.price }}</td>
          </tr>

          <tr>
            <th>Available:</th>
            <td>{{ selectedDrug.quantity }}</td>
          </tr>

          <tr>
            <th>Quantity:</th>
            <td><input type="number" v-model="quantity" ref="qtyInput" /></td>
          </tr>
        </table>

        <TheButton @click="addToCart" class="w-100 mt-4">Add to cart</TheButton>
      </div>
    </TheModal>
  </div>
</template>
<script>
import { mapActions } from "pinia";
import { useCartStore } from "../store/cartStore";
import privateServices from "../service/privateServices";
import TheModal from "./TheModal.vue";
import TheButton from "./TheButton.vue"

export default {
  data() {
    return {
      showAvatar: false,
      searchFocused: false,
      searchString: "",
      drugs: [],
      lastSearchTime: 0,
      selectedDrug: {},
      detailsModal: false,
      quantity: 0,
    };
  },
  components: {
    TheModal,
    TheButton,
  },
  methods: {
    ...mapActions(useCartStore,{
      addToCartStore : "add"
    }),
    logout() {
      localStorage.removeItem("accesstoken");
      location.href = "/";
    },
    searchDrug(value, lastSearchTime) {
      privateServices
        .searchDrugs(value)
        .then((response) => {
          if (lastSearchTime === this.lastSearchTime) {
            this.drugs = response.data.data;
          }
        })
        .catch((error) => {
          showErrorMessage(error);
        })
        .finally(() => {
          this.adding = false;
        });
    },
    handleClick(drug) {
      this.selectedDrug = drug;
      this.detailsModal = true;
    },
    handleBlur() {
      setTimeout(() => {
        this.searchFocused = false;
      }, 100);
    },
    addToCart() {
      console.log(this.selectedDrug);
    },
  },

  watch: {
    searchString(value) {
      if (value) {
        this.lastSearchTime = Date.now();
        this.searchDrug(value, this.lastSearchTime);
      } else {
        this.drugs = [];
      }
    },
  },
};
</script>
<style>
.the-header {
  /* background-color: rgb(117, 20, 129); */
  padding: 9px 22px;
  /* color: rgb(221, 221, 221); */
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}

.the-header__search {
  width: 555px;
}

.the-header a {
  color: rgb(233, 168, 27);
}

.avatar-wrapper {
  position: relative;
}

.avatar {
  width: 33px;
  height: 33px;
  background-color: rgb(48, 15, 15);
  border-radius: 33px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: pointer;
}

.avatar__overflow {
  position: absolute;
  right: -8px;
  top: 50px;
  width: 186px;
  background: #fff;
  box-shadow: 0px 8px 6px 4px rgb(0 0 0 / 20%);
  min-height: 111px;
  z-index: 9999;
  border-radius: 0 0 3px 3px;
}

.avatar__overflow a {
  text-decoration: none;
}

.avatar__overflow-title {
  padding: 3px 9px;
  background-color: #ffecec;
  text-align: center;
}

.avatar__overflow-link {
  width: 100%;
  cursor: pointer;
  padding: 5px 15px;
  font-size: 16px;
  color: #000;
}

.avatar__overflow-link:hover {
  background-color: rgb(241, 241, 241);
}

.search-results {
  background-color: #fff;
  position: absolute;

  top: 46px;
  min-height: 111px;
  max-height: 366px;
  box-shadow: 0 16px 11px 5px rgb(0 0 0 / 20%);
  width: 555px;
  border-radius: 0 0 5px 5px;
  overflow-y: auto;
}

.search-results table tr:nth-child(odd) {
  background-color: rgb(250, 250, 250);
}

.search-results table tr:nth-child(odd):hover {
  background-color: rgb(215, 248, 208);
}

.search-results table tr {
  cursor: pointer;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(196, 196, 196);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(143, 143, 143);
}

table.drug-details th {
  background: none;
}

table.drug-details tr {
  background: none;
}

.p-relative {
  position: relative;
}
</style>
