import { z } from "zod";

export const TestSchema = z.object({
    testName: z.string().min(1, "Test name is required"),
    testDate: z.string().min(1, "Date is required"),
    ageGroup: z.string().min(1, "Age group is required"),
    selectedCategories: z.array(z.string()).min(1, "Select at least one category"),
    selectedChildId: z.string().min(1, "Select a child")
});