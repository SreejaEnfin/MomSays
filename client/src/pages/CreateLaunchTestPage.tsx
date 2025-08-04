import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { TextField, MenuItem, Button, FormControl, InputLabel, Select, Checkbox, ListItemText } from "@mui/material";
import { useParent } from "../contexts/ParentContext";
import { GetCategoriesByAgeGroupAPI } from "../apis/categories/GetCategoriesByAgeGroupAPI";
import { GetQuestionsBasedonCategoryId } from "../apis/questions/GetQuestionsBasedOnCategoryIDAPI";
import { QuestionCarousel } from "../components/Question/QuestionCarousel";
import { GetChildDetailsByParentId } from "../apis/user/GetChildDetailsByParentId";
import { CreateTestSetAPI } from "../apis/testSet/CreateTestSetAPI";
import StatusModal from "../components/common/StatusModal";
import type { Category } from "../types/category";
import type { AgeGroup } from "../types/ageGroup";
import { TestSchema } from "../schemas/TestSet";

type FormValues = z.infer<typeof TestSchema>;

export default function CreateLaunchTestPage() {
    const [ageGroupCategories, setAgeGroupCategories] = useState<Record<string, Category[]> | null>(null);
    const [ageGroups, setAgeGroups] = useState<AgeGroup[] | null>(null);
    const [children, setChildren] = useState<{ id: string; name: string }[]>([]);
    const [step, setStep] = useState<'form' | 'question-selection'>('form');
    const [selectedCategoryObjects, setSelectedCategoryObjects] = useState<{ id: string; name: string }[]>([]);
    const [questions, setQuestions] = useState();
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categoryWiseQuestions, setCategoryWiseQuestions] = useState<[] | null>(null);
    const { parent } = useParent();
    const [showTestSetModal, setShowTestSetModal] = useState(false);
    const [testModalMessage, setTestModalMessage] = useState('');
    const [isTestSetSuccess, setIsTestSetSuccess] = useState(false);

    const { control, handleSubmit, watch, setValue, reset } = useForm<FormValues>({
        resolver: zodResolver(TestSchema),
        defaultValues: {
            selectedCategories: [],
            testName: '',
            testDate: '',
            ageGroup: '',
            selectedChildId: ''
        }
    });

    useEffect(() => {
        getAgeGroupCatgories();
        fetchChildren();
    }, [])

    const fetchChildren = async () => {
        if (parent) {
            const response = await GetChildDetailsByParentId(parent.id);
            if (response.status === 'success') {
                setTimeout(() => {
                    setValue("selectedChildId", response.data[0].id);
                }, 0);
                setChildren(response.data);
            }
        }
    };

    const getAgeGroupCatgories = async () => {
        try {
            const response = await GetCategoriesByAgeGroupAPI();
            if (response.success) {
                setAgeGroupCategories(response.data);
            }
        } catch (e) {
            throw e;
        }
    }

    useEffect(() => {
        if (ageGroupCategories) {
            getAgeGroups();
        }
    }, [ageGroupCategories])

    const getAgeGroups = async () => {
        if (ageGroupCategories) {
            const ageGroups = Object.keys(ageGroupCategories).map((ageGroup, index) => {
                return {
                    id: index,
                    value: ageGroup
                }
            });
            setAgeGroups(ageGroups);
        }
    }
    const selectedAgeGroup = watch("ageGroup");
    const categoriesForSelectedAge = ageGroupCategories?.[selectedAgeGroup] || [];

    const onSubmit = async (data: FormValues) => {
        const selectedCategoryIds = data.selectedCategories;

        const fullCategoryObjects = categoriesForSelectedAge.filter(cat =>
            selectedCategoryIds.includes(cat.id)
        );

        setSelectedCategoryObjects(fullCategoryObjects); // ✅ This gives you name + id for buttons

        const response = await GetQuestionsBasedonCategoryId(selectedCategoryIds);

        if (response.success) {
            setQuestions(response.data);
            setStep('question-selection');
        }
    };

    const handleSubmitTest = async () => {
        if (selectedQuestionIds.length === 0) {
            alert("Please select at least one question");
            return;
        }

        const testSetData = {
            category: selectedCategoryObjects.map(cat => cat.id),
            ageGroup: watch("ageGroup"),
            name: watch("testName"),
            assignedDate: watch("testDate"),
            parentId: parent?.id,
            questionIds: selectedQuestionIds,
            childId: watch("selectedChildId")
        };

        const response = await CreateTestSetAPI(testSetData);
        if (response.success) {
            setIsTestSetSuccess(true);
            setTestModalMessage("Test created successfully");
            setShowTestSetModal(true);
            setStep('form');
            setSelectedCategory('');
            setActiveCategoryIndex(0);
            setSelectedCategoryObjects([]);
            setCategoryWiseQuestions([]);
            setSelectedQuestionIds([]);
            reset();
            setValue("selectedChildId", children[0].id);
        }
        else {
            setIsTestSetSuccess(false);
            setTestModalMessage("Failed to create test");
            setShowTestSetModal(true);
            alert("Failed to create test");
        }
    }

    useEffect(() => {
        if (selectedCategory && questions) {
            setCategoryWiseQuestions(questions[selectedCategory]);
        }
    }, [selectedCategory]);

    const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);

    const toggleQuestionSelection = (id: string) => {
        setSelectedQuestionIds((prev) =>
            prev.includes(id) ? prev.filter(qid => qid !== id) : [...prev, id]
        );
    };

    useEffect(() => {
        if (
            step === 'question-selection' &&
            selectedCategoryObjects.length > 0 &&
            !selectedCategory
        ) {
            setSelectedCategory(selectedCategoryObjects[0].id);
            setActiveCategoryIndex(0);
        }
    }, [step, selectedCategoryObjects, selectedCategory]);

    return (
        <>
            {step === 'form' && <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-5">

                {children.length > 0 ? (
                    <Controller
                        name="selectedChildId"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                select
                                label="Select Child"
                                fullWidth
                                margin="normal"
                                disabled={children.length === 1}
                                value={field.value}
                                onChange={field.onChange}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            >
                                <MenuItem value="">Select...</MenuItem>
                                {children.map(child => (
                                    <MenuItem key={child.id} value={child.id}>
                                        {child.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                ) : (
                    <TextField
                        select
                        label="Select Child"
                        fullWidth
                        margin="normal"
                        value=""
                        disabled
                        helperText="Loading children..."
                    >
                        <MenuItem value="">Loading...</MenuItem>
                    </TextField>
                )}

                <Controller
                    name="testName"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            label="Test Name"
                            fullWidth
                            margin="normal"
                            {...field}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />

                <Controller
                    name="testDate"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            label="Test Date"
                            type="date"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            {...field}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />

                <Controller
                    name="ageGroup"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            select
                            label="Age Group"
                            fullWidth
                            margin="normal"
                            {...field}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        >
                            {(ageGroups && ageGroups.length > 0) && ageGroups.map((group) => (
                                <MenuItem key={group.id} value={group.value}>
                                    {group.value}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                />

                {<Controller
                    name="selectedCategories"
                    control={control}
                    render={({ field, fieldState }) => (
                        <FormControl fullWidth margin="normal" error={!!fieldState.error}>
                            <InputLabel>Select Categories</InputLabel>
                            <Select
                                multiple
                                label="Select Categories"
                                value={field.value}
                                disabled={!selectedAgeGroup}
                                onChange={field.onChange}
                                renderValue={(selected) =>
                                    categoriesForSelectedAge
                                        .filter((cat) => selected.includes(cat.id))
                                        .map((cat) => cat.name)
                                        .join(', ')
                                }
                            >
                                {categoriesForSelectedAge.map((category: { id: string; name: string }) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        <Checkbox checked={field.value.includes(category.id)} />
                                        <ListItemText primary={category.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                            {!selectedAgeGroup && (
                                <p style={{ color: 'red', fontSize: '0.8rem' }}>Please select an age group to select categories</p>
                            )}

                            {fieldState.error && (
                                <p style={{ color: 'red', fontSize: '0.8rem' }}>{fieldState.error.message}</p>
                            )}
                        </FormControl>
                    )}
                />}

                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    Next
                </Button>
            </form>}

            {step === 'question-selection' && <form onSubmit={handleSubmit(handleSubmitTest)}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    {selectedCategoryObjects.map((category, index) => (
                        <Button
                            key={category.id}
                            variant={activeCategoryIndex === index ? 'contained' : 'outlined'}
                            onClick={() => { setActiveCategoryIndex(index); setSelectedCategory(category.id) }}
                        >
                            {category.name}
                        </Button>
                    ))}
                </div>
            </form>}
            {(categoryWiseQuestions && categoryWiseQuestions?.length > 0) &&
                <>
                    <QuestionCarousel
                        step={step}
                        questions={categoryWiseQuestions}
                        selectedQuestionIds={selectedQuestionIds}
                        toggleQuestionSelection={toggleQuestionSelection}
                        handleSubmitTest={handleSubmitTest}
                    />

                    <div className="text-center mt-6">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmitTest}
                            disabled={selectedQuestionIds.length === 0}
                        >
                            Submit Test
                        </Button>
                    </div>
                </>
            }

            <StatusModal show={showTestSetModal} success={isTestSetSuccess} message={testModalMessage} onAction={() => { setShowTestSetModal(false) }} />
        </>
    );
}
