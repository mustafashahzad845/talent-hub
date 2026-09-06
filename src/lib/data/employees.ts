import type { Employee, EmployeeStatus } from "@/lib/types";
import { departments } from "@/lib/data/departments";

const seedEmployees: Record<string, Employee> = {
  "EMP-001": {
    id: "emp-001",
    employeeId: "EMP-001",
    name: "Ali Khan",
    email: "ali.khan@talenthub.com",
    phone: "+92 300 111 2233",
    departmentId: "dept-it",
    departmentName: "IT",
    position: "Senior Developer",
    joiningDate: "2021-03-15",
    status: "ACTIVE",
  },
  "EMP-002": {
    id: "emp-002",
    employeeId: "EMP-002",
    name: "Sara Ahmed",
    email: "sara.ahmed@talenthub.com",
    phone: "+92 301 222 3344",
    departmentId: "dept-hr",
    departmentName: "HR",
    position: "HR Executive",
    joiningDate: "2021-06-01",
    status: "ACTIVE",
  },
  "EMP-003": {
    id: "emp-003",
    employeeId: "EMP-003",
    name: "Ahmed Raza",
    email: "ahmed.raza@talenthub.com",
    phone: "+92 302 333 4455",
    departmentId: "dept-marketing",
    departmentName: "Marketing",
    position: "UI/UX Designer",
    joiningDate: "2022-01-10",
    status: "ON_LEAVE",
  },
  "EMP-004": {
    id: "emp-004",
    employeeId: "EMP-004",
    name: "Usman Malik",
    email: "usman.malik@talenthub.com",
    phone: "+92 303 444 5566",
    departmentId: "dept-finance",
    departmentName: "Finance",
    position: "Accountant",
    joiningDate: "2020-09-22",
    status: "ACTIVE",
  },
};

const seedsByDepartment: Record<string, Employee[]> = {
  "dept-it": [seedEmployees["EMP-001"]],
  "dept-hr": [seedEmployees["EMP-002"]],
  "dept-marketing": [seedEmployees["EMP-003"]],
  "dept-finance": [seedEmployees["EMP-004"]],
};

const firstNames = [
  "Ayesha", "Bilal", "Fatima", "Hamza", "Iqra", "Junaid", "Khadija", "Luqman",
  "Mariam", "Noman", "Rabia", "Saad", "Tahira", "Umar", "Zainab", "Zubair",
  "Asma", "Danish", "Eman", "Faizan", "Ghazala", "Hina", "Imran", "Javeria",
  "Kamran", "Lubna", "Mahnoor", "Naveed", "Omar", "Pakeeza", "Qasim", "Rida",
  "Samina", "Tanveer", "Umaiza", "Varisha", "Waqar", "Yasir", "Zeeshan", "Abida",
  "Basit", "Chanda", "Dur-e-Shahwar", "Ejaz", "Farhan", "Gul", "Hassan", "Ibtisam",
  "Jamil", "Kashif", "Laraib", "Mujtaba", "Nimra", "Owais", "Palwasha", "Quratulain",
  "Rashid", "Sadia", "Tariq", "Uzma", "Wahab", "Yumna", "Zoya", "Arslan",
];

const lastNames = [
  "Ahmed", "Ali", "Chaudhry", "Dar", "Farooqi", "Gill", "Hashmi", "Iqbal",
  "Javed", "Khan", "Malik", "Nawaz", "Qureshi", "Rana", "Siddiqui", "Tariq",
  "Usmani", "Virk", "Waheed", "Yousaf", "Zaidi", "Butt", "Faisal", "Hameed",
  "Jatoi", "Kashmiri", "Leghari", "Mahmood", "Nizami", "Orakzai", "Pervaiz",
  "Qazi", "Rizvi", "Shah", "Tareen", "Uddin", "Virani", "Wazir", "Zaheer", "Anwar",
  "Baig", "Chandio", "Durrani", "Ehsan", "Faraz", "Gondal", "Habib", "Ismail",
  "Jogi", "Kiani", "Langah", "Mangi", "Narejo", "Oad", "Punjabi", "Rahman",
  "Sahil", "Tufail", "Urooj", "Waleed", "Younis", "Zaman", "Abro", "Baloch",
];

const positions = [
  "Software Engineer", "Frontend Developer", "Backend Developer", "DevOps Engineer",
  "Data Analyst", "QA Engineer", "Product Manager", "Project Manager",
  "HR Executive", "Recruiter", "Marketing Specialist", "Content Writer",
  "Graphic Designer", "SEO Analyst", "Accountant", "Financial Analyst",
  "Sales Executive", "Business Development Manager", "Account Manager",
  "Operations Coordinator", "Customer Support Lead", "System Administrator",
];

const statuses: EmployeeStatus[] = ["ACTIVE", "ACTIVE", "ACTIVE", "ACTIVE", "ON_LEAVE", "INACTIVE"];

function buildGeneratedEmployees(): Employee[] {
  const all: Employee[] = [];
  let serial = 1;

  departments.forEach((dept) => {
    const seeds = seedsByDepartment[dept.id] ?? [];
    let counter = serial * 3;

    for (let i = 0; i < dept.employeeCount; i++) {
      if (i < seeds.length) {
        all.push(seeds[i]);
      } else {
        const name = `${firstNames[counter % firstNames.length]} ${lastNames[(counter * 3 + i) % lastNames.length]}`;
        all.push({
          id: `emp-${String(serial).padStart(3, "0")}`,
          employeeId: `EMP-${String(serial).padStart(3, "0")}`,
          name,
          email: `${name.toLowerCase().replace(/\s+/g, ".")}@talenthub.com`,
          phone: `+92 30${(counter % 7) + 1} ${String(3000000 + counter * 137).slice(0, 7)}`,
          departmentId: dept.id,
          departmentName: dept.name,
          position: positions[((counter + i) * 7) % positions.length],
          joiningDate: `20${20 + (counter % 4)}-${String((counter % 12) + 1).padStart(2, "0")}-${String((counter % 27) + 1).padStart(2, "0")}`,
          status: statuses[counter % statuses.length],
        });
      }
      serial++;
      counter++;
    }
  });

  return all;
}

export const employees: Employee[] = buildGeneratedEmployees();

export function getEmployeeById(id: string): Employee | undefined {
  return employees.find((e) => e.id === id);
}

export const totalEmployees = employees.length;