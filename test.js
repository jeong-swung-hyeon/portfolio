// 숫자 배열에서 가장 작은 수를 찾는 함수
function findMinNumber(arr) {
    if (arr.length === 0) {
        return undefined; // 빈 배열인 경우
    }
    
    // Math.min()과 spread operator를 사용한 방법
    return Math.min(...arr);
}

// 다른 방법: 반복문을 사용한 방법
function findMinNumberLoop(arr) {
    if (arr.length === 0) {
        return undefined;
    }
    
    let min = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
        }
    }
    return min;
}

// reduce()를 사용한 방법
function findMinNumberReduce(arr) {
    if (arr.length === 0) {
        return undefined;
    }
    
    return arr.reduce((min, current) => {
        return current < min ? current : min;
    });
}

// 사용 예시
const numbers = [5, 2, 8, 1, 9, 3];
console.log(findMinNumber(numbers)); // 1
console.log(findMinNumberLoop(numbers)); // 1
console.log(findMinNumberReduce(numbers)); // 1
