export function getAgeGroup(age: number): '3-5' | '6-8' | '9-10' {
    if (age >= 3 && age <= 5) return '3-5';
    if (age >= 6 && age <= 8) return '6-8';
    return '9-10';
}
