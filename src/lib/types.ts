export type Role = "HR" | "ADMIN" | "EMPLOYEE";

export type EmployeeStatus = "ACTIVE" | "ON_LEAVE" | "INACTIVE";
export type AttendanceStatus = "PRESENT" | "LATE" | "ABSENT";
export type LeaveType = "ANNUAL" | "SICK" | "CASUAL" | "EMERGENCY";
export type LeaveStatus = "PENDING" | "APPROVED" | "REJECTED";
export type GoalStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";
export type SkillLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export interface Employee {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  departmentId: string;
  departmentName: string;
  position: string;
  joiningDate: string;
  status: EmployeeStatus;
  avatarUrl?: string;
}

export interface Department {
  id: string;
  name: string;
  employeeCount: number;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: AttendanceStatus;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
}

export interface PerformanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  productivity: number;
  teamwork: number;
  punctuality: number;
  overallScore: number;
  reviewDate: string;
}

export interface Goal {
  id: string;
  employeeId: string;
  employeeName: string;
  title: string;
  description: string;
  status: GoalStatus;
  targetDate: string;
  progress: number;
}

export interface Skill {
  id: string;
  employeeId: string;
  name: string;
  level: SkillLevel;
}

export interface EmploymentHistoryItem {
  id: string;
  employeeId: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
}

export interface ActivityItem {
  id: string;
  actorName: string;
  verb: string;
  target: string;
  timestamp: string;
}