export interface NetworkConfig {
    // CHAIN_NAME: string;
    // TOKEN_NAME: string;
    // LOGO: string;
    // RPC_URL: string;
    // PREFIX: number;
    EXISTENTIAL_DEPOSIT?: number;
    queryEndpoint: string;
    name: string;
    logo: string;
    moreOptions?: boolean;
    relayChain?: boolean;
    rpcUrl: string;
    prefix: number;
    disabled?: boolean;
    icon?: string;
    tokenName: string;
    parachain?: boolean;
    mainNetwork?: boolean;
    testNet?: null | string;
}
