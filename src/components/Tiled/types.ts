export type PathItem = {
    id: string;
    structure: string;
};

export type Paths = PathItem[];

// Example of a predefined paths array
export const pathsSample: Paths = [
    { id: 'structured_data', structure: "container" },
    { id: 'big_image', structure: "array" },
];

export interface TiledSearchResult {
    data: TiledSearchItem[]; // An array of search items
    error: string | null; // Error message, if any
    links: {
        self: string;
        first: string;
        last: string;
        next: string | null;
        prev: string | null;
    };
    meta: {
        count: number;
    };
}

// Definition for a single search item
export interface TiledSearchItem {
    id: string; // Identifier for the item
    attributes: {
        ancestors: string[]; // Array of ancestor IDs
        structure_family: "array" | "table" | "container" | "awkward" | "sparse"; // Enum for structure families
        specs: Spec[]; // Optional specs
        metadata: Record<string, unknown>; // Metadata as a dictionary
        structure: ArrayStructure | TableStructure | ContainerStructure | AwkwardStructure | SparseStructure;
        sorting: Sorting[] | null; // Sorting details, if applicable
        data_sources: string | null; // Data source, if any
    };
    links: {
        self: string;
        full?: string;
        block?: string;
        buffers?: string;
        partition?: string;
        search?: string;
    };
    meta: unknown | null; // Optional metadata
}

// Specs type
export interface Spec {
    name: string;
    version: string | null;
}

// Sorting details
export interface Sorting {
    key: string;
    direction: number;
}

// Structure definitions for the `structure` key
export interface ArrayStructure {
    data_type?: {
        endianness: string;
        kind: string;
        itemsize: number;
        dt_units: string | null;
    };
    chunks: number[][];
    shape: number[];
    dims: string[] | null;
    resizable: boolean;
}

export interface TableStructure {
    arrow_schema: string;
    npartitions: number;
    columns: string[];
    resizable: boolean;
}

export interface ContainerStructure {
    contents: unknown | null;
    count: number;
}

export interface AwkwardStructure {
    length: number;
    form: AwkwardForm;
}

export interface AwkwardForm {
    class: string;
    offsets?: string;
    primitive?: string;
    inner_shape?: number[];
    parameters: Record<string, unknown>;
    form_key: string;
    content?: AwkwardForm;
    fields?: string[];
    contents?: AwkwardForm[];
}

export interface SparseStructure {
    layout: string;
    shape: number[];
    chunks: number[][];
    dims: string[] | null;
    resizable: boolean;
}
