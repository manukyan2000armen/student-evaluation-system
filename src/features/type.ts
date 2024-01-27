export type User = {
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    role: number;
    groupId: number;
    pic_url: string;
    groups: Groups[];
    grades: [];
};

export type Courses = {
    id: number;
    name: string;
    modules: Module[];
};

export type Module = {
    id: number;
    name: string;
    courseId: number;
    course: Courses;
};
export type Student = {
    userId: number;
    user: User;
    groupId: number;
    group: Groups;
    grades: Grades[];
};
export type Groups = {
    id: number;
    name: string;
    teacherId: number;
    activeModuleId: number;
    teacher: User;
    moduleGroups: Module[];
    students: Student[];
};

export type Homework = {
    id: number;
    title: string;
    description: string;
    taskNumber: number;
    moduleGroupsId: number;
};

export type Grades = {
    id: number;
    rating: number;
    studentUserId: number;
    homeworkId: number;
    homeworks: Homework[];
    studentId: number;
    grade: [];
    students: [];
};

export type ArrayGrades = {
    group: Groups;
    id: number;
};

export type ChangePassword = {
    currentPassword: string;
    password: string;
    confirmationPassword: string;
};

export type ForgotPassword = {
    email: string;
};

export type ResetPass = {
    code: number;
    password: string;
    confirm_password: string;
};
