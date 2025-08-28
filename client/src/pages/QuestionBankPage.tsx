import { useEffect, useState } from "react"
import { GetCategoriesByAgeGroupAPI } from "../apis/categories/GetCategoriesByAgeGroupAPI";
import { Controller, useForm } from "react-hook-form";
import { MenuItem, Tab, Tabs, TextField, Typography } from "@mui/material";
import { GetQuestionsBasedonCategoryId } from "../apis/questions/GetQuestionsBasedOnCategoryIDAPI";
import { QuestionCarousel } from "../components/Question/QuestionCarousel";

type Question = {
    id: string;
    text: string;
    options: string[];
    correctAnswer: number;
};

function QuestionBankPage() {
    const [ageGroupCategories, setAgeGroupCategories] = useState<Record<string, any[]>>({});
    const [ageGroups, setAgeGroups] = useState<any[]>([]);
    const { control, watch, setValue } = useForm<FormValues>({
        defaultValues: {
            ageGroup: '',
            selectedCategories: []
        }
    });
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [questionsByCategory, setQuestionsByCategory] = useState<Record<string, Question[]> | null>(null);

    type FormValues = {
        ageGroup: string;
        selectedCategories: string[];
    };

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        if (Object.keys(ageGroupCategories).length > 0) {
            getAgeGroups();
        }
    }, [ageGroupCategories]);

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
    console.log(selectedAgeGroup, "selectedAgeGroup");
    const ageGroupCategoriesData = ageGroupCategories[selectedAgeGroup] || [];
    console.log(ageGroupCategoriesData, "ageGroupCategoriesData");
    const categoriesForSelectedAge = ageGroupCategoriesData.map((category: { id: string; name: string }) => ({
        id: category.id,
        name: category.name
    }));

    const selectedCategoryds = watch("selectedCategories");
    console.log(selectedCategoryds, "selectedCategoryds");

    const getCategories = async () => {
        try {
            const ageGroupCategories = localStorage.getItem('ageGroupCategories');
            if (!ageGroupCategories) {
                const response = await GetCategoriesByAgeGroupAPI();
                if (response.success) {
                    localStorage.setItem('ageGroupCategories', JSON.stringify(response.data));
                    setAgeGroupCategories(response.data);
                }
            } else {
                setAgeGroupCategories(JSON.parse(ageGroupCategories));
            }
        } catch (e) {
            throw e;
        }
    }

    useEffect(() => {
        setValue('selectedCategories', []);
    }, [selectedAgeGroup]);

    const handleCategoryChange = async (event: React.SyntheticEvent, newValue: string) => {
        setSelectedCategoryId(newValue);

        const questions = await GetQuestionsBasedonCategoryId([newValue]);

        setQuestionsByCategory(prev => ({
            ...prev,
            [newValue]: questions.data[newValue] || []
        }));
    };


    return (
        <div>
            <form className="bg-white p-5">
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

                <Tabs value={selectedCategoryId} onChange={handleCategoryChange} variant="scrollable"
                    scrollButtons="auto">
                    {categoriesForSelectedAge.map((cat) => (
                        <Tab key={cat.id} label={cat.name} value={cat.id} />
                    ))}
                </Tabs>

                {selectedCategoryId && questionsByCategory && questionsByCategory[selectedCategoryId]?.length > 0 &&
                    <QuestionCarousel questions={questionsByCategory[selectedCategoryId]} showSelection={false} />}

                {selectedCategoryId && questionsByCategory && questionsByCategory[selectedCategoryId]?.length === 0 && <Typography className="text-center" mt={2}>No questions available.</Typography>}

            </form>
        </div >
    )
}

export default QuestionBankPage