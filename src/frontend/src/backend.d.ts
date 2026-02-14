import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Message {
    messageId: string;
    name: string;
    isRead: boolean;
    email: string;
    message: string;
    timestamp: Time;
    category: Category;
}
export interface FeaturedItem {
    id: bigint;
    title: string;
    description: string;
    imageUrl: string;
    projectId: bigint;
}
export interface Project {
    id: bigint;
    title: string;
    description: string;
    imageUrl: string;
    isFeatured: boolean;
    category: Category;
}
export interface UserProfile {
    name: string;
}
export enum Category {
    Logos = "Logos",
    Print = "Print",
    Thumbnails = "Thumbnails",
    Packaging = "Packaging",
    SocialMedia = "SocialMedia",
    Posters = "Posters"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createProject(title: string, description: string, imageUrl: string, category: Category, isFeatured: boolean): Promise<void>;
    deleteProject(id: bigint): Promise<void>;
    getAllMessages(): Promise<Array<Message>>;
    getAllProjects(): Promise<Array<Project>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCategories(): Promise<Array<string>>;
    getFeaturedProjects(): Promise<Array<Project>>;
    getFeaturedSliderItems(): Promise<Array<FeaturedItem>>;
    getMessagesByCategory(category: Category): Promise<Array<Message>>;
    getProjectsByCategory(category: Category): Promise<Array<Project>>;
    getProjectsByCategoryName(categoryName: string): Promise<Array<Project>>;
    getUnreadMessages(): Promise<Array<Message>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    markMessageAsRead(messageId: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitContactMessage(name: string, email: string, messageContent: string, category: Category): Promise<boolean>;
    updateProject(id: bigint, title: string, description: string, imageUrl: string, category: Category, isFeatured: boolean): Promise<void>;
}
