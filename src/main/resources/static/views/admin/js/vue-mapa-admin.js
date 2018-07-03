
//import json from "../../../ammap/plugins/dataloader/examples/data/map.json"

Vue.component('mapa-admin', {
    extends: AmCharts,
    template:
        `
<div class="row">
  <div class="col-md-12">
 <div id="chartdiv" style="width: 800px; background-color:#EEEEEE; height: 500px;"></div>
   </div>
   
   
</div>
    `,
    data: {

    }
    ,
    mounted() {
        this.renderChart();
    },
    methods: {

        renderChart(){



            var map = AmCharts.makeChart( "chartdiv", {
               type: "map",
                dataProvider: {
                        map: "argentinaLow",
                        areas: [{
                            "id": "AR-B",
                            "value": 4447100
                        }, {
                            "id": "AR-K",
                            "value": 626932,
                            "description": " cuidadores: 3 - reservas: 8"
                        }, {
                            "id": "AR-H",
                            "value": 5130632
                        }, {
                            "id": "AR-U",
                            "value": 2673400
                        }, {
                            "id": "AR-C",
                            "value": 33871648
                        }, {
                            "id": "AR-X",
                            "value": 4301261
                        }, {
                            "id": "AR-W",
                            "value": 3405565
                        }, {
                            "id": "AR-E",
                            "value": 783600
                        }, {
                            "id": "AR-P",
                            "value": 15982378
                        }, {
                            "id": "AR-Y",
                            "value": 8186453
                        }, {
                            "id": "AR-L",
                            "value": 1211537
                        }, {
                            "id": "AR-F",
                            "value": 1293953
                        }, {
                            "id": "AR-M",
                            "value": 12419293
                        }, {
                            "id": "AR-N",
                            "value": 6080485
                        }, {
                            "id": "AR-Q",
                            "value": 2926324
                        }, {
                            "id": "AR-R",
                            "value": 2688418
                        }, {
                            "id": "AR-A",
                            "value": 4041769
                        }, {
                            "id": "AR-Z",
                            "value": 4468976
                        }, {
                            "id": "AR-G",
                            "value": 1274923
                        }, {
                            "id": "AR-S",
                            "value": 5296486
                        }, {
                            "id": "AR-J",
                            "value": 6349097
                        }, {
                            "id": "AR-D",
                            "value": 9938444
                        }, {
                            "id": "AR-V",
                            "value": 4919479
                        }, {
                            "id": "AR-T",
                            "value": 2844658
                        } ]
                    ,
                    showErrors: false
                },
                colorSteps: 10,
                areasSettings: {
                    autoZoom: true
                },
                smallMap: {},
                valueLegend: {
                    right: 10,
                    minValue: "little",
                    maxValue: "a lot!"
                }
            } );

        }

    }


});
