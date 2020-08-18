export default {
  methods: {
    makeCols(firstCols = null) {
      let cols = [];
      let simpleCellWidth = 120;
      const defaultColWidth = 120;

      if (firstCols) {
        cols = cols.concat(firstCols);
      }

      this.profile.columns.forEach(col => {
        if (col.search('action') === 0) {
          let quantityCol = {
            text: `${this.$t(`adsmanager.cols.${col}`)}`,
            value: `${col}-quantity`,
            width: defaultColWidth
          };
          let crCol = {
            text: `${this.$t(`adsmanager.cols.${col}`)}, ${this.$t('common.conversionRate')}`,
            value: `${col}-cr`,
            width: defaultColWidth
          };
          let cpaCol = {
            text: `${this.$t(`adsmanager.cols.${col}`)}, ${this.$t('common.cpa')}`,
            value: `${col}-cpa`,
            width: defaultColWidth
          };

          if (col === 'action_link_click') {
            quantityCol.text = this.$t(`adsmanager.cols.${col}`);
            crCol.text = 'CTR';
            cpaCol.text = 'CPC';
          }

          cols.push(quantityCol);
          cols.push(crCol);
          cols.push(cpaCol);
        } else {
          simpleCellWidth = defaultColWidth;
          
          if (col === 'billing') {
            if (
              this.$store.state.adsmanager.activeTab.component === 'users' ||
              this.$store.state.adsmanager.activeTab.component === 'accounts' ||
              this.$store.state.adsmanager.activeTab.component === 'cabs' ||
              this.$store.state.adsmanager.activeTab.component === 'dates'
            ) return;

            simpleCellWidth = 240;
          }

          if (col === 'ad_id') {
            if (this.$store.state.adsmanager.activeTab.component === 'ads') {
              simpleCellWidth = 135;
            } else {
              return;
            }
          } 

          if (col === 'adset_id') {
            if (
              this.$store.state.adsmanager.activeTab.component === 'ads' ||
              this.$store.state.adsmanager.activeTab.component === 'adsets'
            ) {
              simpleCellWidth = 135;
            } else {
              return;
            }
          }

          if ( col === 'campaign_id') {
            if(
              this.$store.state.adsmanager.activeTab.component === 'ads' ||
                this.$store.state.adsmanager.activeTab.component === 'adsets' ||
                this.$store.state.adsmanager.activeTab.component === 'campaigns'
            ) {
              simpleCellWidth = 135;
            } else {
              return;
            }
          }

          if (col === 'cab_id') {
            if (
              this.$store.state.adsmanager.activeTab.component === 'ads' ||
                this.$store.state.adsmanager.activeTab.component === 'adsets' ||
                this.$store.state.adsmanager.activeTab.component === 'campaigns' ||
                this.$store.state.adsmanager.activeTab.component === 'cabs'
            ) {
              simpleCellWidth = 135;
            } else {
              return;
            }
          }

          if (col === 'cab_limit') {
            if (
              this.$store.state.adsmanager.activeTab.component === 'ads' ||
              this.$store.state.adsmanager.activeTab.component === 'adsets' ||
              this.$store.state.adsmanager.activeTab.component === 'campaigns' ||
              this.$store.state.adsmanager.activeTab.component === 'cabs'
            ) {
              // simpleCellWidth = defaultColWidth;
            } else {
              return;
            }
          }

          if (col === 'campaign_budget') {
            if (this.$store.state.adsmanager.activeTab.component === 'campaigns') {
              simpleCellWidth = 130;
            }else {
              return;
            }
          }

          if (col === 'account_fan_pages') {
            if (this.$store.state.adsmanager.activeTab.component === 'accounts') {
              simpleCellWidth = 200;
            } else {
              return;
            }
          }

          if (col === 'account_bms') {
            if (this.$store.state.adsmanager.activeTab.component === 'accounts') {
              simpleCellWidth = 200;
            } else {
              return;
            }
          }

          if (col === 'adset_budget') {
            if (this.$store.state.adsmanager.activeTab.component === 'adsets') {
              simpleCellWidth = 120;
            }else {
              return;
            }
          }
          
          cols.push({
            text: `${this.$t(`adsmanager.cols.${col}`)}`,
            value: col,
            width: simpleCellWidth,
          });
        }
      });
      return cols;
    }
  }
};