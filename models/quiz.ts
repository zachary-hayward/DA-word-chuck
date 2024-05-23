export interface Quiz {
    area:        string;
    level:       number;
    quizlist:    Quizlist[];
    version:     string;
    author:      string;
    email:       string;
    result_code: string;
    result_msg:  string;
}

export interface Quizlist {
    quiz:    string[];
    option:  string[];
    correct: number;
}
