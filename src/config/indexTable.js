const cfg = {
    //   report1: {
    //     cfg: {
    //       reportId: '6066',
    //       fileName: 'dbreport_201911051959454979487.xml',
    //       datasetName: 'data',
    //       start: 0,
    //       limit: 30
    //     },
    //     search: {
    //       stime: '',
    //       city_name: '',
    //       type: ''
    //     }
    //   },
    //   report2: {
    //     cfg: {
    //       reportId: '6066',
    //       fileName: 'dbreport_201911051959454979487.xml',
    //       datasetName: 'data',
    //       start: 0,
    //       limit: 30
    //     },
    //     search: {}
    //   },
    homeTop: {
        cfg: {
            reportId: 7883,
            fileName: 'dbreport_202201201708348295055.xml',
            datasetName: 'data',
            parameterConfig: {},
            start: 0,
            limit: 30
        },
        search: {}
    },
    homeData: {
        cfg: {
            reportId: 7884,
            fileName: 'dbreport_202201201710434818733.xml',
            datasetName: 'data',
            parameterConfig: {},
            start: 0,
            limit: 30
        }
    },
    homeStage: {
        cfg: {
            reportId: 7886,
            fileName: 'dbreport_202201201712193413579.xml',
            datasetName: 'data',
            parameterConfig: {},
            start: 0,
            limit: 30
        }
    },
    homeWarm: {
        cfg: {
            reportId: 7888,
            fileName: 'dbreport_202201201714293119337.xml',
            datasetName: 'data',
            parameterConfig: {},
            start: 0,
            limit: 30
        }
    },
    homeTarget: {
        cfg: {
            reportId: 7885,
            fileName: 'dbreport_202201201711022382506.xml',
            datasetName: 'data',
            parameterConfig: {},
            start: 0,
            limit: 30
        }
    },
    page2Data: {
        cfg: {
            reportId: 7889,
            fileName: 'dbreport_202201201716202903220.xml',
            datasetName: 'data',
            parameterConfig: {},
            start: 0,
            limit: 30
        }
    },
    page215: {
        cfg: {
            reportId: 7890,
            fileName: 'dbreport_202201201721433264478.xml',
            datasetName: 'data',
            parameterConfig: { startTime: '' },
            start: 0,
            limit: 30
        }
    },
    page2Nongli: {
        cfg: {
            reportId: 7891,
            fileName: 'dbreport_202201201723578767871.xml',
            datasetName: 'data',
            parameterConfig: { thisYear: '' },
            start: 0,
            limit: 30
        }
    }

}

// let search = Object.assign({}, cfg.reprot1.search, { stime: '1111' })
// let params = Object.assign({}, cfg.reprot1.cfg, { parameterConfig: JSON.stringify(search) })
// let url = 'http://10.242.101.210:7300/fir/dbReportAction!getReportDataOfTCT.ilf'
// let = homeTop = Object.assign({}, cfg.homeTop.cfg)

const param = {
    url: 'http://10.242.101.210:7300/fir/dbReportAction!getReportDataOfTCT.ilf',
    homeTop: {
        callbackQuery: 'jsonpCallback',
        reportId: 7883,
        fileName: 'dbreport_202201201708348295055.xml',
        datasetName: 'data',
        parameterConfig: {},
        start: 0,
        limit: 30
    },
    homeData: {
        callbackQuery: 'jsonpCallback',
        reportId: 7884,
        fileName: 'dbreport_202201201710434818733.xml',
        datasetName: 'data',
        parameterConfig: {},
        start: 0,
        limit: 30
    },
    //   页面二顶栏
    page2Top: {
        callbackQuery: 'jsonpCallback',
        reportId: 7883,
        fileName: 'dbreport_202201201708348295055.xml',
        datasetName: 'data',
        parameterConfig: {},
        start: 0,
        limit: 30
    },
    page2Data: {
        callbackQuery: 'jsonpCallback',
        reportId: 7884,
        fileName: 'dbreport_202201201710434818733.xml',
        datasetName: 'data',
        parameterConfig: {},
        start: 0,
        limit: 30
    },
    page2Warm: {
        callbackQuery: 'jsonpCallback',
        reportId: 7888,
        fileName: 'dbreport_202201201714293119337.xml',
        datasetName: 'data',
        parameterConfig: {},
        start: 0,
        limit: 30
    },
    page2Targert: {
        callbackQuery: 'jsonpCallback',
        reportId: 7885,
        fileName: 'dbreport_202201201711022382506.xml',
        datasetName: 'data',
        parameterConfig: {},
        start: 0,
        limit: 30
    },
    page2Stage: {
        callbackQuery: 'jsonpCallback',
        reportId: 7886,
        fileName: 'dbreport_202201201712193413579.xml',
        datasetName: 'data',
        parameterConfig: {},
        start: 0,
        limit: 30
    },
    homeTotal: {
        callbackQuery: 'jsonpCallback',
        reportId: 7889,
        fileName: 'dbreport_202201201716202903220.xml',
        datasetName: 'data',
        parameterConfig: {},
        start: 0,
        limit: 30
    },
    // home界面图表最小值设置（数据最小值的基础上减去多少）
    ll4GListTableMin: 100,
    ll5GLisTabletMin: 20,
    hw4GListTableMin: 20,
    hw2GListTableMin: 20

}

export default param