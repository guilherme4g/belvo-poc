<template>
  <v-app>
    <div style="padding: 2rem">
      <div class="row pb-xl">
        <div class="col">
          <div class="text-regular-20 pb-m">
            Success! You just created a link in Belvo.
          </div>
          <div class="divider" />
        </div>
      </div>
      <div class="row mb-xl">
        <div class="col-6">
          <p class="title">LINK ID</p>
          <p class="data">{{ this.linkId }}</p>
        </div>
      </div>

      <div slot="content">
        <div class="widget-list__header px-l py-l">
          <div class="row flex-middle">
            <div class="col">
              <div class="text-medium-16">ENDPOINTS</div>
            </div>
          </div>
        </div>
        <div class="widget-list__content px-l">
          <div class="list-item">
            <div class="row py-m flex-between">
              <div class="two-list-item-action__left-item col request-title">
                <div class="text-regular-14 request-type post mr-l">POST</div>
                <div class="request-content">
                  <div class="row">
                    <div class="text-medium-16 mr-m">Accounts</div>
                    <div class="text-regular-14">/api/accounts/</div>
                  </div>
                  <div class="row">
                    <div class="text-regular-14">
                      Retrieve the information from all the Accounts inside the
                      Link.
                    </div>
                  </div>
                </div>
              </div>
              <div class="list-item-action col">
                <b-button
                  type="primary"
                  :fluid="false"
                  text="GET"
                  @clicked="retrieveAccounts()"
                />
              </div>
            </div>
            <div class="request-response" v-if="this.accounts">
              <v-data-table
                :headers="headersAccount"
                :items="accounts"
                :items-per-page="5"
                class="elevation-1"
              >
                <template v-slot:item.id="{ item }">
                  <button v-on:click="openDialog(item.id)">Ver detalhes</button>
                </template>
              </v-data-table>
            </div>
          </div>
          <div class="list-item">
            <div class="row py-m flex-between">
              <div class="two-list-item-action__left-item col request-title">
                <div class="text-regular-14 request-type post mr-l">POST</div>
                <div class="request-content">
                  <div class="row">
                    <div class="text-medium-16 mr-m">Transactions</div>
                    <div class="text-regular-14">/api/transactions/</div>
                  </div>
                  <div class="row">
                    <div class="text-regular-14">
                      Retrieve the transactions from the last 30 days from each
                      one of the Accounts inside the Link already created.
                    </div>
                  </div>
                </div>
              </div>
              <div class="list-item-action col">
                <b-button
                  type="primary"
                  :fluid="false"
                  text="GET"
                  @clicked="retrieveTransactions()"
                />
              </div>
            </div>
            <div class="request-response" v-if="this.transactions">
              <v-data-table
                :headers="headersTransaction"
                :items="transactions"
                :items-per-page="5"
                class="elevation-1"
              >
                <template v-slot:item.value_date="{ item }">
                  {{ formatDate(item.value_date) }}
                </template>
                <template v-slot:item.id="{ item }">
                  <button v-on:click="openDialogTransaction(item.id)">
                    Ver detalhes
                  </button>
                </template>
              </v-data-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-dialog v-model="dialogOpen" width="1500" style="overflow: auto">
      <v-card
        style="padding: 2rem; height: 400; display: grid; place-content: center"
      >
        <v-progress-circular
          indeterminate
          color="primary"
          v-if="accountLoading"
        ></v-progress-circular>
        <div v-if="selectedAccount">
          <v-card-title class="text-h5 grey lighten-2"> Account </v-card-title>
          <div
            style="
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 1rem;
              padding: 2rem;
            "
          >
            <div>
              <p style="font-weight: bolder">Agência</p>
              <p>{{ selectedAccount.agency }}</p>
            </div>
            <div>
              <p style="font-weight: bolder">Identificação interna</p>
              <p>{{ selectedAccount.internal_identification }}</p>
            </div>
            <div>
              <p style="font-weight: bolder">Identificação pública nome</p>
              <p>{{ selectedAccount.public_identification_name }}</p>
            </div>
            <div>
              <p style="font-weight: bolder">Identificação pública valor</p>
              <p>{{ selectedAccount.public_identification_value }}</p>
            </div>
            <div>
              <p style="font-weight: bolder">Número</p>
              <p>{{ selectedAccount.number }}</p>
            </div>
            <div>
              <p style="font-weight: bolder">Balanço</p>
              <p>{{ selectedAccount.balance_type }}</p>
            </div>
            <div>
              <p style="font-weight: bolder">Categoria</p>
              <p>{{ selectedAccount.category }}</p>
            </div>
            <div>
              <p style="font-weight: bolder">Tipo</p>
              <p>{{ selectedAccount.type }}</p>
            </div>
            <div>
              <p style="font-weight: bolder">Data criação</p>
              <p>{{ formatDate(selectedAccount.created_at) }}</p>
            </div>
          </div>
          <div
            v-if="
              selectedAccount &&
              selectedAccount.funds_data &&
              selectedAccount.funds_data.length
            "
          >
            <p style="font-weight: bolder">Fundos</p>
            <div
              style="
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 1rem;
                width: 100%;
                margin-top: 2rem;
              "
            >
              <div
                v-for="(fund, index) of selectedAccount.funds_data"
                v-bind:key="index"
                style="border: 1px dashed gray; padding: 1rem"
              >
                <p style="font-weight: bolder">{{ fund.name }}</p>
                <p>Balanço: {{ fund.balance }}</p>
                <p>Percentual: {{ fund.percentage }}</p>
                <p>Percentual: {{ fund.percentage }}</p>
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogTransactionOpen"
      width="1500"
      style="overflow: auto"
    >
      <v-card
        style="padding: 2rem; height: 400; display: grid; place-content: center"
      >
        <v-progress-circular
          indeterminate
          color="primary"
          v-if="transactionLoading"
        ></v-progress-circular>
        <div v-if="selectedTransaction">
          <v-card-title class="text-h5 grey lighten-2">
            Transaction
          </v-card-title>
          <div
            style="
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 1rem;
              padding: 2rem;
            "
          >
            <div>
              <p style="font-weight: bolder">Montante</p>
              <p>{{ selectedTransaction.amount }}</p>
            </div>
            <div>
              <p style="font-weight: bolder">Balanço</p>
              <p>{{ selectedTransaction.balance }}</p>
            </div>
            <div>
              <p style="font-weight: bolder">Categoria</p>
              <p>{{ selectedTransaction.category }}</p>
            </div>
            <div>
              <p style="font-weight: bolder">Data de criação</p>
              <p>{{ selectedTransaction.created_at }}</p>
            </div>
            <div>
              <p style="font-weight: bolder">Status</p>
              <p>{{ selectedTransaction.status }}</p>
            </div>
            <div>
              <p style="font-weight: bolder">Tipo</p>
              <p>{{ selectedTransaction.type }}</p>
            </div>
            <div>
              <p style="font-weight: bolder">Subcategoria</p>
              <p>{{ selectedTransaction.subcategory }}</p>
            </div>
            <div>
              <p style="font-weight: bolder">Descrição</p>
              <p>{{ selectedTransaction.description }}</p>
            </div>
            <div>
              <p style="font-weight: bolder">Identificação internacional</p>
              <p>{{ selectedTransaction.internal_identification }}</p>
            </div>
            <div>
              <p style="font-weight: bolder">Comerciante</p>
              <p>
                {{
                  selectedTransaction.merchant &&
                  selectedTransaction.merchant.name
                }}
              </p>
            </div>
            <div>
              <p style="font-weight: bolder">Site Comerciante</p>
              <p>
                {{
                  selectedTransaction.merchant &&
                  selectedTransaction.merchant.site
                }}
              </p>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "Requests",
  props: {
    linkId: String,
  },
  data() {
    return {
      headersAccount: [
        {
          text: "Nome",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Número da conta", value: "number" },
        { text: "Balanço", value: "balance.current" },
        { text: "Ver detalhes", value: "id" },
      ],
      headersTransaction: [
        { text: "Descrição", value: "description" },
        { text: "Valor", value: "amount" },
        { text: "Data", value: "value_date" },
        { text: "Ver detalhes", value: "id" },
      ],
      accounts: null,
      selectedAccount: null,
      accountLoading: false,
      selectedTransaction: null,
      transactionLoading: false,
      dialogOpen: false,
      dialogTransactionOpen: false,
      transactions: null,
      balances: null,
      owners: null,
    };
  },
  methods: {
    async openDialog(id) {
      this.selectedAccount = null;
      this.dialogOpen = true;
      this.accountLoading = true;
      try {
        const response = await this.retrieveAccount(id);
        this.selectedAccount = response.data;

        this.accountLoading = false;
      } catch (_) {
        this.accountLoading = false;
      }
    },
    async openDialogTransaction(id) {
      this.selectedTransaction = null;
      this.transactionLoading = true;
      this.dialogTransactionOpen = true;

      try {
        const response = await this.retrieveTransaction(id);
        this.selectedTransaction = response.data;

        this.transactionLoading = false;
      } catch (_) {
        this.transactionLoading = false;
      }
    },
    closeDialog() {
      this.dialogOpen = false;
    },
    retrieveAccounts() {
      axios
        .get("https://372d-150-161-2-200.sa.ngrok.io/bank-accounts", {
          params: {
            linkId: this.linkId,
          },
        })
        .then((response) => {
          this.accounts = response.data;
        });
    },
    retrieveAccount(id) {
      return axios.get(
        `https://372d-150-161-2-200.sa.ngrok.io/bank-accounts/${id}`,
        {
          params: {
            linkId: this.linkId,
          },
        }
      );
    },
    retrieveTransactions() {
      axios
        .get("https://372d-150-161-2-200.sa.ngrok.io/bank-transactions", {
          params: {
            linkId: this.linkId,
          },
        })
        .then((response) => {
          this.transactions = response.data;
        });
    },
    retrieveTransaction(id) {
      return axios.get(
        `https://372d-150-161-2-200.sa.ngrok.io/bank-transactions/${id}`,
        {
          params: {
            linkId: this.linkId,
          },
        }
      );
    },
    formatDate(date) {
      return moment(date).format("DD-MM-YYYY");
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  position: relative;
  z-index: 2;
  width: 90px;
  text-transform: uppercase;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 24px;
  font-family: Noto Sans TC;
  margin: 0;
}
.data {
  margin: 0;
  font-family: Noto Sans TC;
}
.widget-list {
  &__header {
    border-bottom: 1px solid #f0f2f4;

    &-table {
      color: grey;
      &-event {
        padding-right: 95px;
      }

      &-callback {
        padding-right: 361px;
      }

      &-status {
      }
    }
  }
}
.list-item {
  border-bottom: 0.0625rem solid #f0f2f4;
  .list-item-action {
    display: flex;
    justify-content: flex-end;
  }
}
.request-type {
  padding: 5px 15px;
  background: #ebebeb;
  color: #ffffff;

  &.post {
    background: rgb(36, 143, 178);
  }
}
.request-content {
  min-width: 550px;
}
.request-title {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 200px;
}
.response-header {
  color: #c4cdd4;
}
</style>
