export interface Jokes {
    categories: string[];
    created_at: Date;
    icon_url:   string;
    id:         string;
    updated_at: Date;
    url:        string;
    value:      string;
}

export interface JokesVault {
  jokes: string[]
}