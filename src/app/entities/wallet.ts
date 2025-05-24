// src/app/entities/wallet.ts

export interface WalletStatus {
  wstCode: number;    // maps to WST_CODE
  statusName: string; // you can adjust property names as per your backend JSON
}

export interface WalletType {
  wtyCode: number;   // maps to WTY_CODE
  typeName: string;  // property example
}

export interface WalletCategory {
  wcaCode: number;
  categoryName: string;
}

export interface Customer {
  cusCode: number;
  // other customer properties as needed
}

export interface WalletBalanceHistory {
  wbhCode: number;
  // other properties...
}

export interface WalletOperation {
  // define based on WALLET_OPERATIONS entity
}

export interface CardList {
  cliCode: number;
  // other properties
}

export interface AccountList {
  // define as per ACCOUNT_LIST entity
}

export interface WalletOperationTypeMap {
  // define as per WALLET_OPERATION_TYPE_MAP entity
}

export class Wallet {
  constructor(
    public walCode?: number,
    public walIden?: number,
    public walLabe?: string,
    public walKey?: number,
    public walEffBal?: number,
    public walLogicBalance?: number,
    public walSpecificBalance?: number,
    public lastUpdatedDate?: string,  // or Date if you parse it
    public walFinId?: number,
    public customer?: Customer,
    public walletStatus?: WalletStatus,
    public walletType?: WalletType,
    public walletCategory?: WalletCategory,
    public walletOperations?: WalletOperation[],
    public lastBalanceHistory?: WalletBalanceHistory,
    public operationTypes?: any[],  // define properly if needed
    public cardList?: CardList,
    public accountList?: AccountList[],
    public walletOperationTypeMappings?: WalletOperationTypeMap[]
  ) {}
}


