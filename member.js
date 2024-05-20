function skillsMember() {
    let member = {
        name: 'John Doe',
        age: 26,
        skills: ['HTML', 'CSS', 'JS'],
        showSkills: function () {
            this.skills.forEach(skill => {
                console.log(`${this.name} knows ${skill}`)
            });
        }
    };
    return member;
}