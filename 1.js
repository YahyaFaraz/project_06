import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    name;
    studentId;
    courses_enrolled;
    balance;
    constructor(name, studentId) {
        this.name = name;
        this.studentId = studentId;
        this.courses_enrolled = [];
        this.balance = 22;
    }
    enroll(course) {
        this.courses_enrolled.push(course);
        chalk.blueBright(console.log(`Student ${this.name} has enrolled in ${course} course.`));
    }
    viewBalance(myBalance) {
        myBalance = this.balance;
        if (myBalance < 10) {
            if (this.courses_enrolled)
                chalk.redBright(console.log("You cannot enroll in the course due to insufficient funds."));
        }
        else {
            chalk.blueBright(console.log("Processing.."));
        }
    }
    pay_fee() {
        const fee = 10;
        if (this.balance >= fee) {
            this.balance -= fee;
            chalk.blueBright(console.log('Payment successful.'));
        }
        else {
            chalk.redBright(console.log("Payment denied due to insufficient funds."));
        }
    }
    show_status() {
        chalk.blueBright((console.log(`Student Name: ${this.name}`),
            (console.log(`Student ID: ${this.studentId}`)),
            (console.log(`Course_Enrolled: ${this.courses_enrolled.join(', ')}`)),
            (console.log(`Remaining Balance: ${this.balance}`))));
    }
}
const student_ids = [];
function id_generation() {
    const ID = Math.floor(Math.random() * 10000) + 90000;
    student_ids.push(ID);
    while (student_ids.includes(ID)) {
        return ID;
    }
}
const students = [];
async function main() {
    let resume = true;
    while (resume) {
        console.log(chalk.gray('\n Select from Options: ')),
            console.log(chalk.blueBright('1. Add Student: ')),
            console.log(chalk.blueBright('2. Course Enrollment: ')),
            console.log(chalk.blueBright('3. Pay Fee')),
            console.log(chalk.blueBright('4. Show Status')),
            console.log(chalk.blueBright('5. Exit'));
        let choices = await inquirer.prompt({
            type: 'input',
            name: "choice",
            message: chalk.greenBright('Select from the options (1-5): ')
        });
        if (choices.choice !== undefined) {
            switch (choices.choice) {
                case "1":
                    let add_student = await inquirer.prompt({
                        type: 'input',
                        name: 'addName',
                        message: chalk.greenBright("Please enter the name of Student: ")
                    });
                    if (add_student.addName !== undefined) {
                        const student = students.find((s) => s.studentId === courseEnrollmentInput.courseEnrollment);
                        students.push(add_student.addName);
                        const newStudentName = add_student.addName;
                        const newStudentID = id_generation();
                        if (newStudentID !== undefined) {
                            const newStudent = new Student(newStudentName, newStudentID);
                            students.push(newStudent);
                            chalk.blueBright(console.log(`Student ${newStudentName} is added with ID ${newStudentID}. `));
                            break;
                        }
                        else {
                            console.log('Error. No input given.');
                            break;
                        }
                    }
                case "2":
                    let courseEnrollmentInput = await inquirer.prompt({
                        type: "input",
                        name: "courseEnrollment",
                        message: chalk.greenBright("Please enter the student ID to enroll in courses: "),
                    });
                    const enrollStudentInTheCourse = students.find(student => student.studentId === parseInt(courseEnrollmentInput.courseEnrollment));
                    if (enrollStudentInTheCourse !== undefined) {
                        let courseChoices = await inquirer.prompt({
                            type: "list",
                            name: "EnrollCourse",
                            message: chalk.greenBright("Select  the course name you want to enroll in: "),
                            choices: ['AI', 'Blockchain', 'Cloud Computing']
                        });
                        enrollStudentInTheCourse.enroll(courseChoices.EnrollCourse);
                        console.log(chalk.blueBright(`The student with ID ${courseEnrollmentInput.courseEnrollment} has enrolled in ${courseChoices.EnrollCourse} course.`));
                        break;
                    }
                    else {
                        console.log(chalk.redBright('ID not found. Please enter a valid ID.'));
                        break;
                    }
                case "3":
                    let payFee = await inquirer.prompt({
                        type: 'input',
                        name: 'myFee',
                        message: chalk.greenBright('Please enter student ID to pay: ')
                    });
                    const payment = students.find(student => student.studentId === parseInt(payFee.myFee));
                    if (payment !== undefined) {
                        payment.pay_fee();
                        break;
                    }
                    else {
                        console.log(chalk.redBright("ID not found."));
                        break;
                    }
                case "4":
                    let IdStatus = await inquirer.prompt({
                        type: 'input',
                        name: "myIDStatus",
                        message: chalk.greenBright('Please enter student ID: ')
                    });
                    const studentIDToShowStatus = students.find(student => student.studentId === parseInt(IdStatus.myIDStatus));
                    if (studentIDToShowStatus !== undefined) {
                        studentIDToShowStatus.show_status();
                        break;
                    }
                    else {
                        console.log(chalk.redBright('ID not found.'));
                        break;
                    }
                case "5":
                    console.log(chalk.redBright('Exiting the program.'));
                    resume = false;
                    break;
                default:
                    console.log(chalk.redBright('Invalid choice. Please try again.'));
            }
        }
    }
}
main();
