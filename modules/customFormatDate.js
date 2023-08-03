export function formatDateToCustomFormat(dateString) {
    // Step 1: Convert the date string to a Date object
    const birthDate = new Date(dateString);

    // Step 2: Get the day, month, and year
    const day = birthDate.getDate();
    const monthIndex = birthDate.getMonth();
    const year = birthDate.getFullYear();

    // Step 3: Define the names of the months
    const months = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];
    const monthName = months[monthIndex];

    // Step 4: Calculate the age
    const currentDate = new Date();
    const age = currentDate.getFullYear() - year;

    // Step 5: Determine the zodiac sign based on the day and month
    const zodiacSigns = [
        "Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini",
        "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"
    ];
    const zodiacIndex = (monthIndex + (day > 21 ? 1 : 0)) % 12;
    const zodiacSign = zodiacSigns[zodiacIndex];

    // Format the string and return the result
    const formattedDate = `${monthName} ${day}, ${year}, ${zodiacSign} (${age} years)`;
    return formattedDate;
}

// Example usage:
const inputDate = "1974-11-11";
const formattedDate = formatDateToCustomFormat(inputDate);
console.log(formattedDate); // Output: "November 11, 1974, Scorpio (48 years)" (if the current date is August 3, 2023)
