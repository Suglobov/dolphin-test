<template>
  <div>
    <v-card>
      <v-card-text style="padding: 0px 8px 0px 8px">
        <!-- ТАБЛИЦА -->
        <v-data-table
          :value="selected"
          :headers="cols"
          :items="campaigns.filtered"
          :loading="loading.mainTable"
          :loading-text="$t('common.loading')"
          fixed-header
          :items-per-page="50"
          :footer-props="{'items-per-page-options': [10, 30, 50, 100, -1]}"
          :height="innerHeight - 50 - 48 - 48"
          show-select
          class="stat-table stat-table-campaigns"
          :custom-sort="customSort"
          :sort-by="sortBy"
          :sort-desc="sortDesc"
          @toggle-select-all="selectAll"
          @item-selected="selectItem"
        >
          <template #header.data-table-select="{ on , props }">
            <v-simple-checkbox
              color="primary"
              v-bind="props"
              style="width: 48px; text-align: center;"
              v-on="on"
            />
          </template>
          <template #body="{items}">
            <tbody>
              <tr
                v-for="item in items"
                :key="`row-${item.id}`"
              >
                <!-- ГАЛОЧКА -->
                <td>
                  <div>
                    <v-simple-checkbox
                      v-ripple
                      color="primary"
                      :value="typeof selected.find(i => i.id === item.id) !== 'undefined'"
                      style="width: 48px; text-align: center;"
                      @input="selectItem(item, $event)"
                    />
                  </div>
                </td>

                <!-- ОСНОВНАЯ ИНФОРМАЦИЯ -->
                <campaigns-main-table-info :item="item" />

                <!-- СТАТУС -->
                <campaigns-main-table-status :item="item" />
                
                <template v-for="col in profile.columns">
                  <simple-stat-cell
                    v-if="commonCols.indexOf(col) > -1 && specialCols.indexOf(col) === -1"
                    :key="`stat-col-${col}`"
                    :col="col"
                    :item="item"
                  />
                  <complex-stat-cell-quantity
                    v-if="actionCols.indexOf(col) > -1"
                    :key="`stat-col-${col}-quantity`"
                    :col="col"
                    :item="item"
                  />
                  <complex-stat-cell-cr
                    v-if="actionCols.indexOf(col) > -1"
                    :key="`stat-col-${col}-cr`"
                    :col="col"
                    :item="item"
                  />
                  <complex-stat-cell-cpa
                    v-if="actionCols.indexOf(col) > -1"
                    :key="`stat-col-${col}-cpa`"
                    :col="col"
                    :item="item"
                  />
                  <billing-cell
                    v-if="col === 'billing'"
                    :key="`stat-col-${col}`"
                    :cab="item.cab"
                  />
                  <campaign-id-cell
                    v-if="col === 'campaign_id'"
                    :key="`stat-col-${col}`"
                    :item="item"
                  />
                  <cab-id-cell
                    v-if="col === 'cab_id'"
                    :key="`stat-col-${col}`"
                    :item="item"
                  />
                  <cab-limit-cell
                    v-if="col === 'cab_limit'"
                    :key="`stat-col-${col}`"
                    :item="item.cab"
                  />
                  <campaign-budget-cell
                    v-if="col === 'campaign_budget'"
                    :key="`stat-col-${col}`"
                    :item="item"
                  />
                </template>
              </tr>

              <!-- TOTAL -->
              <tr v-if="campaigns.filtered.length > 0">
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <template v-for="col in profile.columns">
                  <simple-stat-cell
                    v-if="commonCols.indexOf(col) > -1 && specialCols.indexOf(col) === -1"
                    :key="`stat-col-${col}-total`"
                    :col="col"
                    it-is-total-row
                  />
                  <complex-stat-cell-quantity
                    v-if="actionCols.indexOf(col) > -1"
                    :key="`stat-col-${col}-quantity-total`"
                    :col="col"
                    it-is-total-row
                  />
                  <complex-stat-cell-cr
                    v-if="actionCols.indexOf(col) > -1"
                    :key="`stat-col-${col}-cr-total`"
                    :col="col"
                    it-is-total-row
                  />
                  <complex-stat-cell-cpa
                    v-if="actionCols.indexOf(col) > -1"
                    :key="`stat-col-${col}-cpa-total`"
                    :col="col"
                    it-is-total-row
                  />
                  <td
                    v-if="col === 'billing'"
                    :key="`stat-col-${col}-total`"
                  >
                    &nbsp;
                  </td>
                  <td
                    v-if="col === 'campaign_id'"
                    :key="`stat-col-${col}-total`"
                  >
                    &nbsp;
                  </td>
                  <td
                    v-if="col === 'cab_id'"
                    :key="`stat-col-${col}-total`"
                  >
                    &nbsp;
                  </td>
                  <td
                    v-if="col === 'cab_limit'"
                    :key="`stat-col-${col}-total`"
                  >
                    &nbsp;
                  </td>
                  <td
                    v-if="col === 'campaign_budget'"
                    :key="`stat-col-${col}-total`"
                  >
                    &nbsp;
                  </td>
                </template>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import CampaignsMainTableInfo                                                        from '@/components/adsmanager/campaigns/CampaignsMainTableInfo';
import CampaignsMainTableStatus                                                      from '@/components/adsmanager/campaigns/CampaignsMainTableStatus';
import {mapGetters}                                                                  from 'vuex';

import actionCols                                                                    from '../../../constants/adsmanager/action_cols';
import commonCols                                                                    from '../../../constants/adsmanager/common_cols';
import specialCols                                                                   from '../../../constants/adsmanager/special_cols';  
import customSort                                                                    from '../../../mixins/adsmanager/custom_sort';  
import makeCols                                                                      from '../../../mixins/adsmanager/make_cols';
import selectItems                                                                   from '../../../mixins/adsmanager/select_items';  
import BillingCell                                                                   from '../stat-cells/AdsManagerBillingCell';  
import CabIdCell                                                                     from '../stat-cells/AdsManagerCabIdCell';  
import CabLimitCell                                                                  from '../stat-cells/AdsManagerCabLimitCell';
import CampaignBudgetCell                                                            from '../stat-cells/AdsManagerCampaignBudgetCell';
import CampaignIdCell                                                                from '../stat-cells/AdsManagerCampaignIdCell';
import ComplexStatCellCpa                                                            from '../stat-cells/AdsManagerComplexStatCellCpa';
import ComplexStatCellCr                                                             from '../stat-cells/AdsManagerComplexStatCellCr';
import ComplexStatCellQuantity                                                       from '../stat-cells/AdsManagerComplexStatCellQuantity';
import SimpleStatCell                                                                from '../stat-cells/AdsManagerSimpleStatCell';

export default {
  name: 'CampaignsMainTable',

  components: {
    CampaignBudgetCell,
    CampaignIdCell,
    CampaignsMainTableInfo,
    CampaignsMainTableStatus,
    CabIdCell,
    CabLimitCell,
    BillingCell,
    ComplexStatCellQuantity,
    ComplexStatCellCr,
    ComplexStatCellCpa,
    SimpleStatCell,
  },

  mixins: [
    makeCols,
    customSort,
    selectItems
  ],

  data() {
    return {
      actionCols,
      commonCols,
      specialCols,
      cols: [],
    };
  },

  computed: {
    ...mapGetters({
      campaigns: 'campaigns/campaigns',
      selected: 'campaigns/selected',
      loading: 'campaigns/loading',
      innerHeight: 'main/innerHeight',
      profile: 'main/profile',
      stat: 'campaigns/stat'
    }),

    firstCols() {
      let cols = [];

      cols.push({
        text: this.$t('common.campaign'),
        value: 'campaign',
        width: 200
      });

      cols.push({
        text: this.$t('common.status'),
        value: 'status',
        width: 100
      });

      return cols;
    },

    sortBy() {
      return localStorage.getItem('adsmanager-sorting-index') 
        ? localStorage.getItem('adsmanager-sorting-index') 
        : 'account';
    },

    sortDesc() {
      return localStorage.getItem('adsmanager-sorting-is-desc') 
        ? localStorage.getItem('adsmanager-sorting-is-desc') === 'true' 
          ? true 
          : false 
        : false;
    }
  },

  watch: {
    profile: {
      deep: true,
      handler() {
        this.cols = this.makeCols(this.firstCols);
      }
    },

    stat: {
      deep: true,
      handler() {
        if (this.stat) {
          if (this.stat) {
            this.customSort(this.campaigns.filtered, [this.sortBy], [this.sortDesc]);
          }
        }
      }
    }
  },

  created() {
    this.cols = this.makeCols(this.firstCols);
  },
};
</script>
<style>
  .stat-table-campaigns div.v-data-table__wrapper > table > tbody > tr > td:nth-child(1), 
  .stat-table-campaigns div.v-data-table__wrapper > table > thead > tr > th:nth-child(1) {
    position: sticky !important; 
    position: -webkit-sticky !important; 
    left: 0; 
    z-index: 3;
  }

  .stat-table-campaigns div.v-data-table__wrapper > table > tbody > tr > td:nth-child(2), 
  .stat-table-campaigns div.v-data-table__wrapper > table > thead > tr > th:nth-child(2) {
    position: sticky !important; 
    position: -webkit-sticky !important; 
    left: 48px; 
    z-index: 3;
  }

  .stat-table-campaigns div.v-data-table__wrapper > table > tbody > tr > td:nth-child(3), 
  .stat-table-campaigns div.v-data-table__wrapper > table > thead > tr > th:nth-child(3) {
    position: sticky !important; 
    position: -webkit-sticky !important; 
    left: 248px; 
    z-index: 3;
  }

  .stat-table-campaigns div.v-data-table__wrapper > table > thead > tr > th:nth-child(1),
  .stat-table-campaigns div.v-data-table__wrapper > table > thead > tr > th:nth-child(2),
  .stat-table-campaigns div.v-data-table__wrapper > table > thead > tr > th:nth-child(3) {
    z-index: 4 !important;
  }
</style>