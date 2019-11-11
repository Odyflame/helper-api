const teacherknex = require('../bin/config').teacherknex;

module.exports = {
    getTeachers : async () =>{
        const teacher = await teacherknex('teacher').orderBy('id');
        return teacher;
    },

    getTeacher: async (id) =>{
        const teacherid = await teacherknex('teacher').where({'id' : id});
        return teacherid;
    },

    getempsalary : async (salary) =>{
        const mysalary = await teacherknex('empsalary').where({'salary' : salary});
        return mysalary;
    },

    addTeacher : async (teacher) =>{
        const result = await teacherknex('teacher').insert(teacher);
        return result;
    }
};