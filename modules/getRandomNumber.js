export function getRandomNumber(currentNumber) {

    const randomNum = currentNumber * 100 + Math.floor(Math.random() * (1000 - currentNumber * 100 + 1));

    const integerPart = Math.floor(randomNum / 100);

    const decimalPart = (randomNum % 100).toFixed(2);

    const finalDecimal = currentNumber === 10 ? "00" : decimalPart;

    const result = `${integerPart}.${finalDecimal}`;

    return result.slice(0, 4);
}
