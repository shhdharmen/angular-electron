export interface INode {
    type: ENodeType;
    path: string;
    className: string;
    fileName: string;
    declarations?: INode[];
    imports?: INode[];
    providers?: INode[];
    bootstrap?: INode[];
}

export enum ENodeType {
    node_module = 'NODE-MODULE',
    NgModule = 'MODULE',
    component = 'COMPONENT',
    pipe = 'PIPE',
    directive = 'DIRECTIVE',
    provider = 'PROVIDER',
    unknown = 'UNKNOWN'
}
