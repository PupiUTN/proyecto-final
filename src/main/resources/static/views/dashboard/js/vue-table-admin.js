Vue.component('my-table', {
    template: `
<div>
 <table class="basic-table">
    <thead>
      <tr>
        <th v-for="key in columns"
          @click="sortBy(key)"
          :class="{ active: sortKey == key }">
          {{ key | capitalize }}
          <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in filteredData">
        <td v-for="key in columns">
          {{entry[key]}}
        </td>
      </tr>
    </tbody>
  </table>
  
   <!-- Pagination -->
<div class="clearfix"></div>
<div class="row">
    <div class="col-md-12">
        <!-- Pagination -->
        <div class="pagination-container margin-top-20 margin-bottom-40">
            <nav class="pagination">
                <ul>
               
                    <li><a :style="offset > 0 ? 'background-color: crimson' : 'background-color: darkgrey'" @click="previous()"><i class="sl sl-icon-arrow-left" style=" font-weight: bold;color: white;"></i></a></li>

                    <li><a  :style="(offset + perPage) < gridData.length ? 'background-color: crimson' : 'background-color: darkgrey'" @click="next()"><i class="sl sl-icon-arrow-right" style=" font-weight: bold;color: white;"></i></a></li>
                
                   <!-- <li><a href="#" class="current-page">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#"><i class="sl sl-icon-arrow-right"></i></a></li>-->
                </ul>
            </nav>
        </div>
    </div>
</div>
</div>
`,
    props: {
        data: Array,
        columns: Array,
        filterKey: String
    },
    watch: {
        offset: function () {
            this.paginate();
        }

    },
    data: function () {
        var sortOrders = {};
        this.columns.forEach(function (key) {
            sortOrders[key] = 1
        })
        return {
            sortKey: '',
            sortOrders: sortOrders,
            offset: 0,
            gridData:[],
            gridReservas: [],
            perPage: 5,
            countPages:1,
        }
    },
    computed: {
        filteredData: function () {
            var sortKey = this.sortKey;
            var filterKey = this.filterKey && this.filterKey.toLowerCase();
            var order = this.sortOrders[sortKey] || 1;
            var data = this.data;
            if (filterKey) {
                data = data.filter(function (row) {
                    return Object.keys(row).some(function (key) {
                        return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                    })
                })
            }
            if (sortKey) {
                data = data.slice().sort(function (a, b) {
                    a = a[sortKey];
                    b = b[sortKey];
                    return (a === b ? 0 : a > b ? 1 : -1) * order
                })
            }
            this.gridData = data;

            this.gridReservas = this.gridData.slice(this.offset, this.offset + this.perPage);

            return this.gridReservas;

        }
    },
    filters: {
        capitalize: function (str) {
            return str.charAt(0).toUpperCase() + str.slice(1)
        }
    },
    methods: {
        sortBy: function (key) {
            this.sortKey = key;
            this.sortOrders[key] = this.sortOrders[key] * -1
        },
        paginate() {
             this.countPages = this.gridData / this.perPage;
              if (this.countPages - Math.trunc(this.countPages)> 0.0)
              {
                  this.countPages = Math.trunc(this.countPages) +1;
              }

            this.gridReservas = this.gridData.slice(this.offset, this.offset + this.perPage);

        },
        previous() {
            if(this.offset >0)
            this.offset = this.offset - this.perPage;
        },
        next() {
            if (this.offset + this.perPage < this.gridData.length)
            this.offset = this.offset + this.perPage;
        },

    }



});
