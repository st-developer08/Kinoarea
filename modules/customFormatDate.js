export function formatDateToCustomFormat(dateString) {
    const birthDate = new Date(dateString);

    const day = birthDate.getDate();
    const monthIndex = birthDate.getMonth();
    const year = birthDate.getFullYear();

    const months = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];
    const monthName = months[monthIndex];

    const currentDate = new Date();
    const age = currentDate.getFullYear() - year;

    const zodiacSigns = [
        "Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini",
        "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"
    ];
    const zodiacIndex = (monthIndex + (day > 21 ? 1 : 0)) % 12;
    const zodiacSign = zodiacSigns[zodiacIndex];

    const formattedDate = `${monthName} ${day}, ${year}, ${zodiacSign} (${age} years)`;
    return formattedDate;
}

const inputDate = "1974-11-11";
const formattedDate = formatDateToCustomFormat(inputDate);
console.log(formattedDate); 
