/* exported Student */

function Student(first_Name, last_Name, subject) {
    this.firstName = first_Name,
    this.lastName = last_Name,
    this.subject = subject
}

Student.prototype.getFullName = function () {
        return this.firstName + ' ' + this.lastName;
}

Student.prototype.getIntroduction = function () {
        return 'Hello, my name is ' + this.firstName + ' ' + this.lastName + ' and I am studying ' + this.subject + '.';
}


