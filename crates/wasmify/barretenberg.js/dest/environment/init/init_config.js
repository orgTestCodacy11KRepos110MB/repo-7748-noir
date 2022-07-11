"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitData = void 0;
const initConfig = {
    "1": {
        initRoots: {
            initDataRoot: "06e00f331c68d8109607a35e1bc247b149864ecee6568697f4a77e3c8ff35472",
            initNullRoot: "20d5cc81a50d8e54f691566148510eaa8ba66d3ffe3ffbd770188990e45c6cce",
            initRootsRoot: "2157ebc03adae85518c931f7efe94ef29de35b9a1f1a7a6b6bc9f1a119641628",
        },
        initDataSize: 147624,
        accountsData: "./data/mainnet/accounts",
        firstRollup: 0,
        lastRollup: 3120,
    },
    default: {
        initRoots: {
            initDataRoot: "1417c092da90cfd39679299b8e381dd295dba6074b410e830ef6d3b7040b6eac",
            initNullRoot: "0225131cf7530ba9f617dba641b32020a746a6e0124310c09aac7c7c8a2e0ce5",
            initRootsRoot: "08ddeab28afc61bd560f0153f7399c9bb437c7cd280d0f4c19322227fcd80e05",
        },
        initDataSize: 8,
        accountsData: "./data/default/accounts",
        initAccounts: {
            mnemonic: "once cost physical tongue reason coconut trick whip permit novel victory ritual",
            aliases: ["account1", "account2", "account3", "account4"],
        },
    },
    /* Empty defaults.
    default: {
      initRoots: {
        initDataRoot: '18ceb5cd201e1cee669a5c3ad96d3c4e933a365b37046fc3178264bede32c68d',
        initNullRoot: '298329c7d0936453f354e4a5eef4897296cc0bf5a66f2a528318508d2088dafa',
        initRootsRoot: '2fd2364bfe47ccb410eba3a958be9f39a8c6aca07db1abd15f5a211f51505071',
      },
      initDataSize: 0,
      accountsData: '',
    }, */
};
function getInitData(chainId) {
    var _a;
    return (_a = initConfig[chainId]) !== null && _a !== void 0 ? _a : initConfig["default"];
}
exports.getInitData = getInitData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdF9jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZW52aXJvbm1lbnQvaW5pdC9pbml0X2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFNLFVBQVUsR0FBRztJQUNqQixHQUFHLEVBQUU7UUFDSCxTQUFTLEVBQUU7WUFDVCxZQUFZLEVBQ1Ysa0VBQWtFO1lBQ3BFLFlBQVksRUFDVixrRUFBa0U7WUFDcEUsYUFBYSxFQUNYLGtFQUFrRTtTQUNyRTtRQUNELFlBQVksRUFBRSxNQUFNO1FBQ3BCLFlBQVksRUFBRSx5QkFBeUI7UUFDdkMsV0FBVyxFQUFFLENBQUM7UUFDZCxVQUFVLEVBQUUsSUFBSTtLQUNqQjtJQUNELE9BQU8sRUFBRTtRQUNQLFNBQVMsRUFBRTtZQUNULFlBQVksRUFDVixrRUFBa0U7WUFDcEUsWUFBWSxFQUNWLGtFQUFrRTtZQUNwRSxhQUFhLEVBQ1gsa0VBQWtFO1NBQ3JFO1FBQ0QsWUFBWSxFQUFFLENBQUM7UUFDZixZQUFZLEVBQUUseUJBQXlCO1FBQ3ZDLFlBQVksRUFBRTtZQUNaLFFBQVEsRUFDTixpRkFBaUY7WUFDbkYsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDO1NBQzFEO0tBQ0Y7SUFDRDs7Ozs7Ozs7O1NBU0s7Q0FDTixDQUFDO0FBRUYsU0FBZ0IsV0FBVyxDQUFDLE9BQWU7O0lBQ3pDLE9BQU8sTUFBQSxVQUFVLENBQUMsT0FBTyxDQUFDLG1DQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN0RCxDQUFDO0FBRkQsa0NBRUMifQ==