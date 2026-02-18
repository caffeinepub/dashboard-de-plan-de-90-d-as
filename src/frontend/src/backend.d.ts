import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Task {
    id: bigint;
    content: TaskContent;
    completed: boolean;
    description: string;
    dueTime: Time;
    notes: string;
    milestone: bigint;
    phase: bigint;
}
export interface TaskContent {
    details: {
        __kind__: "automationWorkflows";
        automationWorkflows: {
            status: Array<string>;
            workflows: Array<string>;
        };
    } | {
        __kind__: "seoTasks";
        seoTasks: {
            status: Array<string>;
            tasks: Array<string>;
        };
    } | {
        __kind__: "chatbotFlows";
        chatbotFlows: {
            flows: Array<string>;
            messages: Array<string>;
        };
    } | {
        __kind__: "adCampaignDetails";
        adCampaignDetails: {
            ads: Array<string>;
            channels: Array<string>;
        };
    } | {
        __kind__: "siteArchitecture";
        siteArchitecture: {
            navigation: Array<string>;
            pages: Array<string>;
        };
    } | {
        __kind__: "domainStrategy";
        domainStrategy: {
            domains: Array<string>;
            criteria: Array<string>;
        };
    } | {
        __kind__: "branding";
        branding: {
            assets: Array<string>;
            requirements: Array<string>;
        };
    } | {
        __kind__: "socialMediaPlans";
        socialMediaPlans: {
            platforms: Array<string>;
            posts: Array<string>;
        };
    } | {
        __kind__: "legalStructure";
        legalStructure: {
            progress: Array<string>;
            items: Array<string>;
        };
    } | {
        __kind__: "crmStages";
        crmStages: {
            stages: Array<string>;
            contacts: Array<string>;
        };
    } | {
        __kind__: "optimizationMetrics";
        optimizationMetrics: {
            metrics: Array<string>;
            values: Array<string>;
        };
    } | {
        __kind__: "businessModel";
        businessModel: {
            answers: Array<string>;
            questions: Array<string>;
        };
    };
    milestone: bigint;
    phase: bigint;
}
export type Time = bigint;
export interface AdsMetrics {
    month: string;
    leads: bigint;
    spent: number;
    appointments: bigint;
    converted: bigint;
}
export interface backendInterface {
    addAdsMetrics(month: string, spent: number, leads: bigint, appointments: bigint, converted: bigint): Promise<void>;
    addTask(description: string, dueTime: Time, phase: bigint, milestone: bigint, notes: string, content: TaskContent): Promise<bigint>;
    addTaskNotes(taskId: bigint, notes: string): Promise<void>;
    clearCompletedTasks(): Promise<void>;
    clearIncompleteTasks(): Promise<void>;
    completeTask(taskId: bigint, completedVal: boolean): Promise<void>;
    editTask(taskId: bigint, newDescription: string, newDueTime: Time, newPhase: bigint, newMilestone: bigint, newContent: TaskContent): Promise<void>;
    getActiveTasks(): Promise<Array<Task>>;
    getAdsMetricsByMonth(month: string): Promise<AdsMetrics | null>;
    getAllAdsMetrics(): Promise<Array<AdsMetrics>>;
    getAllTasks(): Promise<Array<Task>>;
    getCompletedTasks(): Promise<Array<Task>>;
    getTasksByMilestone(milestone: bigint): Promise<Array<Task>>;
    getTasksByPhase(phase: bigint): Promise<Array<Task>>;
}
