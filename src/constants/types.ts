export interface NetworkConfig {
    name: string;
    // EXISTENTIAL_DEPOSIT?: number;
    queryEndpoint: string;
    logo: string;
    moreOptions?: boolean;
    relayChain?: boolean;
    rpcUrl: string;
    // prefix: number;
    disabled?: boolean;
    icon?: string;
    tokenName: string;
    parachain?: boolean;
    mainNetwork?: boolean;
    testNet?: null | string;
    explorer: string;
}
