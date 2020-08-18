export default {
  methods: {
    customSort(items, index, isDesc) {
      console.log('SORTING:');
      console.log(items);
      console.log(this.stat);
      if (items.length === 0 || this.stat.length === 0) return items;
      localStorage.setItem('adsmanager-sorting-index' , index[0]);
      localStorage.setItem('adsmanager-sorting-is-desc', isDesc[0]);

      if (index.length > 0) {
        if (index[0].search('quantity') > -1) {
          items.sort((a, b) => {
            let aValue = typeof this.stat[a.id] === 'undefined'
              ? 0
              : typeof this.stat[a.id]['actions'] === 'undefined'
                ? 0
                : typeof this.stat[a.id]['actions'][index[0].replace('-quantity', '')] !== 'undefined'
                  ? this.stat[a.id]['actions'][index[0].replace('-quantity', '')]['quantity'] : 0;
            let bValue = typeof this.stat[b.id] === 'undefined'
              ? 0
              : typeof this.stat[b.id]['actions'] === 'undefined'
                ? 0
                : typeof this.stat[b.id]['actions'][index[0].replace('-quantity', '')] !== 'undefined'
                  ? this.stat[b.id]['actions'][index[0].replace('-quantity', '')]['quantity'] : 0;

            if (index[0] === 'action_results-quantity') {
              aValue = typeof this.stat[a.id] === 'undefined'
                ? 0
                : typeof this.stat[a.id]['results'] === 'undefined'
                  ? 0
                  : this.stat[a.id]['results'];

              bValue = typeof this.stat[b.id] === 'undefined' ?
                0 :
                typeof this.stat[b.id]['results'] === 'undefined' ?
                  0 :
                  this.stat[b.id]['results'];
            }

            if (aValue > bValue) {
              return isDesc[0] ? -1 : 1;
            }
            if (aValue < bValue) {
              return isDesc[0] ? 1 : -1;
            }
            return 0;
          });
        }

        if (index[0].search('cpa') > -1) {
          items.sort((a, b) => {
            let aValue = typeof this.stat[a.id] === 'undefined'
              ? 0
              : typeof this.stat[a.id]['actions'] === 'undefined' ?
                0 :
                typeof this.stat[a.id]['actions'][index[0].replace('-cpa', '')] !== 'undefined' ?
                  this.stat[a.id]['actions'][index[0].replace('-cpa', '')]['cpa'] : 0;
            let bValue = typeof this.stat[b.id] === 'undefined'
              ? 0
              : typeof this.stat[b.id]['actions'] === 'undefined' ?
                0 :
                typeof this.stat[b.id]['actions'][index[0].replace('-cpa', '')] !== 'undefined' ?
                  this.stat[b.id]['actions'][index[0].replace('-cpa', '')]['cpa'] : 0;

            if (index[0] === 'action_results-cpa') {
              aValue = typeof this.stat[a.id] === 'undefined' ?
                0 :
                typeof this.stat[a.id]['cpa'] === 'undefined' ?
                  0 :
                  this.stat[a.id]['cpa'];

              bValue = typeof this.stat[b.id] === 'undefined' ?
                0 :
                typeof this.stat[b.id]['cpa'] === 'undefined' ?
                  0 :
                  this.stat[b.id]['cpa'];
            }

            if (aValue > bValue) {
              return isDesc[0] ? -1 : 1;
            }
            if (aValue < bValue) {
              return isDesc[0] ? 1 : -1;
            }
            return 0;
          });
        }

        if (index[0].search('cr') > -1) {
          items.sort((a, b) => {
            let aValue = typeof this.stat[a.id] === 'undefined'
              ? 0
              : typeof this.stat[a.id]['actions'] === 'undefined' ?
                0 :
                typeof this.stat[a.id]['actions'][index[0].replace('-cr', '')] !== 'undefined' ?
                  this.stat[a.id]['actions'][index[0].replace('-cr', '')]['cr'] : 0;
            let bValue = typeof this.stat[b.id] === 'undefined'
              ? 0
              : typeof this.stat[b.id]['actions'] === 'undefined' ?
                0 :
                typeof this.stat[b.id]['actions'][index[0].replace('-cr', '')] !== 'undefined' ?
                  this.stat[b.id]['actions'][index[0].replace('-cr', '')]['cr'] : 0;

            if (index[0] === 'action_results-cr') {
              aValue = typeof this.stat[a.id] === 'undefined' ?
                0 :
                typeof this.stat[a.id]['cr'] === 'undefined' ?
                  0 :
                  this.stat[a.id]['cr'];

              bValue = typeof this.stat[b.id] === 'undefined' ?
                0 :
                typeof this.stat[b.id]['cr'] === 'undefined' ?
                  0 :
                  this.stat[b.id]['cr'];
            }
            
            if (aValue > bValue) {
              return isDesc[0] ? -1 : 1;
            }
            if (aValue < bValue) {
              return isDesc[0] ? 1 : -1;
            }
            return 0;
          });
        }

        if (
          this.stat && 
          typeof this.stat !== 'undefined' &&
          typeof this.stat[Object.keys(this.stat)[0]][index[0]] !== 'undefined'
        ) {
          items.sort((a, b) => {
            let aValue = typeof this.stat[a.id] === 'undefined' 
              ? 0 
              : typeof this.stat[a.id][index[0]] === 'undefined'
                ? 0
                : this.stat[a.id][index[0]];
            let bValue = typeof this.stat[b.id] === 'undefined' 
              ? 0 
              : typeof this.stat[b.id][index[0]] === 'undefined'
                ? 0
                : this.stat[b.id][index[0]];

            if (aValue > bValue) {
              return isDesc[0] ? -1 : 1;
            }
            if (aValue < bValue) {
              return isDesc[0] ? 1 : -1;
            }
            return 0;
          });
        }

        if (index[0] == 'account') {
          items.sort((a, b) => {
            if (typeof a.name !== 'undefined') {
              const result = a.name.toString().localeCompare(b.name.toString());
              return isDesc[0] ? result * -1 : result;
            }
            return 0;
          });
        }

        if (index[0] == 'status') {
          items.sort((a, b) => {
            if (typeof a.status !== 'undefined') {
              const result = a.status.toString().localeCompare(b.status.toString());
              return isDesc[0] ? result * -1 : result;
            } 
            return 0;
          });
        }
      }

      return items;
    }
  }
};